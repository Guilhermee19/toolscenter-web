export type TextFormat = "TYPESCRIPT";

export function convertTypeGenerator(
  json: string,
  mono_type = true,
  interfaceName = "Root",
  order = false,
  invert = false
): string {
  if (!json) return "";

  if (Array.isArray(json)) {
    return convertArrayToType(json, interfaceName, order);
  }

  if (mono_type) {
    const interfaceBody = convertToInterfaceMonoType(json, "", order);
    return `export interface ${interfaceName} ${interfaceBody}`;
  } else {
    const interfaces = convertToInterface(json, interfaceName, "", order);
    if (invert) {
      interfaces.reverse(); // Reverse the order of the interfaces
    }
    return interfaces.join("\n\n");
  }
}

function convertArrayToType(
  array: string[],
  typeName: string,
  order: boolean
): string {
  if (array.length === 0) {
    return `export type ${typeName} = any[];`;
  }
  const commonInterface = convertToInterfaceMonoType(array[0], "", order);
  return `export type ${typeName} = ${typeName}Item[];\n\nexport interface ${typeName}Item ${commonInterface}`;
}

function convertToInterfaceMonoType(
  obj: string,
  indent: string = "",
  order: boolean = false
): string {
  let result = "";
  const entries = Object.entries(obj);
  if (order) {
    entries.sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
  }
  entries.forEach(([key, value]) => {
    let type = "";
    if (value === null) {
      result += `  ${indent}${key}?: any;\n`;
      return;
    }
    if (Array.isArray(value)) {
      type =
        value.length > 0
          ? `${convertToInterfaceMonoType(value[0], indent, order)}[]`
          : "any[]";
    } else if (typeof value === "object") {
      type = convertToInterfaceMonoType(value, `${indent}  `, order);
    } else {
      type = typeof value;
    }
    result += `  ${indent}${key}: ${type};\n`;
  });
  return `{\n${result}${indent}}`;
}

function convertToInterface(
  obj: string,
  interfaceName: string,
  indent: string = "",
  order: boolean = false
): string[] {
  let result = "";
  let entries = Object.entries(obj);
  const interfaces: string[] = [];
  if (order) {
    entries = entries.sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
  }
  entries.forEach(([key, value]) => {
    let type = "";
    if (Array.isArray(value)) {
      if (value.length > 0) {
        const nestedInterfaceName = capitalizeFirstLetter(key);
        const nestedInterfaces = convertToInterface(
          value[0],
          nestedInterfaceName,
          indent,
          order
        );
        interfaces.push(...nestedInterfaces);
        type = `${nestedInterfaceName}[]`;
      } else {
        type = "any[]";
      }
    } else if (value !== null && typeof value === "object") {
      const nestedInterfaceName = capitalizeFirstLetter(key);
      const nestedInterfaces = convertToInterface(
        value,
        nestedInterfaceName,
        indent,
        order
      );
      interfaces.push(...nestedInterfaces);
      type = nestedInterfaceName;
    } else {
      type = getType(value);
    }
    result += `  ${indent}${key}: ${type};\n`;
  });
  interfaces.unshift(
    `export interface ${interfaceName} {\n${result}${indent}}`
  );
  return interfaces;
}

function getType(value: string): string {
  if (value === null) {
    return "any";
  }
  return typeof value;
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
