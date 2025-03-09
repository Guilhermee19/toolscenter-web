import { Injectable } from '@angular/core';
import chroma from 'chroma-js'; // Use a importação default
import { IGNORE } from '../../core/configs/utils';

@Injectable({
  providedIn: 'root'
})
export class ConvertInterfaceService {

  jsonToTypeScriptInterface(json: any, mono_type: boolean, interfaceName: string = 'Root', order: boolean = false, invert: boolean = false): string {
    if (Array.isArray(json)) {
      return this.convertArrayToType(json, interfaceName, order);
    }

    if (mono_type) {
      const interfaceBody = this.convertToInterfaceMonoType(json, '', order);
      return `export interface ${interfaceName} ${interfaceBody}`;
    } else {
      let interfaces = this.convertToInterface(json, interfaceName, '', order);
      if (invert) {
        interfaces.reverse(); // Reverse the order of the interfaces
      }
      return interfaces.join('\n\n');
    }
  }

  private convertArrayToType(array: any[], typeName: string, order: boolean): string {
    if (array.length === 0) {
      return `export type ${typeName} = any[];`;
    }
    const commonInterface = this.convertToInterfaceMonoType(array[0], '', order);
    return `export type ${typeName} = ${typeName}Item[];\n\nexport interface ${typeName}Item ${commonInterface}`;
  }

  private convertToInterfaceMonoType(obj: any, indent: string = '', order: boolean = false): string {
    let result = '';
    let entries = Object.entries(obj);
    if (order) {
        entries.sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
    }
    entries.forEach(([key, value]) => {
        let type = '';
        if (value === null) {
            result += `  ${indent}${key}?: any;\n`;
            return;
        }
        if (Array.isArray(value)) {
            type = value.length > 0 ? `${this.convertToInterfaceMonoType(value[0], indent, order)}[]` : 'any[]';
        } else if (typeof value === 'object') {
            type = this.convertToInterfaceMonoType(value, `${indent}  `, order);
        } else {
            type = typeof value;
        }
        result += `  ${indent}${key}: ${type};\n`;
    });
    return `{\n${result}${indent}}`;
  }

  private convertToInterface(obj: any, interfaceName: string, indent: string = '', order: boolean = false): string[] {
    let result = '';
    let entries = Object.entries(obj);
    const interfaces: string[] = [];
    if (order) {
      entries = entries.sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
    }
    entries.forEach(([key, value]) => {
      let type = '';
      if (Array.isArray(value)) {
        if (value.length > 0) {
          const nestedInterfaceName = this.capitalizeFirstLetter(key);
          const nestedInterfaces = this.convertToInterface(value[0], nestedInterfaceName, indent, order);
          interfaces.push(...nestedInterfaces);
          type = `${nestedInterfaceName}[]`;
        } else {
          type = 'any[]';
        }
      } else if (value !== null && typeof value === 'object') {
        const nestedInterfaceName = this.capitalizeFirstLetter(key);
        const nestedInterfaces = this.convertToInterface(value, nestedInterfaceName, indent, order);
        interfaces.push(...nestedInterfaces);
        type = nestedInterfaceName;
      } else {
        type = this.getType(value);
      }
      result += `  ${indent}${key}: ${type};\n`;
    });
    interfaces.unshift(`export interface ${interfaceName} {\n${result}${indent}}`);
    return interfaces;
  }

  private getType(value: any): string {
    if (value === null) {
      return 'any';
    }
    return typeof value;
  }

  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
