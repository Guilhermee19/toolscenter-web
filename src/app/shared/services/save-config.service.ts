import { Injectable } from '@angular/core';
import { IColorPicker, ITextConvert } from '../../core/models/config';

@Injectable({
  providedIn: 'root'
})
export class SaveConfigService {

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  // ? ------------
  // ? TEXT CONVERT
  // ? ------------

  get textConvert(): ITextConvert {
    if (!this.isLocalStorageAvailable()) return {} as ITextConvert;

    const storage = localStorage.getItem('TEXT_CONVERT');
    return storage ? JSON.parse(storage) : {} as ITextConvert;
  }

  set textConvert(obj: ITextConvert) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('TEXT_CONVERT', JSON.stringify({
        action: obj.action, encode: obj.encode, decode: obj.decode
      }));
    }
  }

  // ? ------------
  // ? COLOR PICKER
  // ? ------------

  objColorPicker: IColorPicker = {} as IColorPicker;

  get colorPicker(): IColorPicker {
    if (!this.isLocalStorageAvailable()) return {} as IColorPicker;

    const storage = localStorage.getItem('COLOR_PICKER');
    if (!storage) return {} as IColorPicker;

    this.objColorPicker = JSON.parse(storage);
    return this.objColorPicker;
  }

  set colorPicker(obj: IColorPicker) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('COLOR_PICKER', JSON.stringify({
        color: obj.color, save: obj.save, mode: obj.mode
      }));
    }
  }
}
