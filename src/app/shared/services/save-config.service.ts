import { Injectable } from '@angular/core';
import { IColorPicker, ITextConvert } from '../../core/models/config';

@Injectable({
  providedIn: 'root'
})
export class SaveConfigService {

  // ? ------------
  // ? TEXT CONVERT
  // ? ------------

  get textConvert(){
    const storage = localStorage.getItem('TEXT_CONVERT')
    if(!storage) return {} as ITextConvert;

    const TEXT_CONVERT: ITextConvert = JSON.parse(storage)
    return TEXT_CONVERT || {} as ITextConvert;
  }

  set textConvert(obj: ITextConvert){
    localStorage.setItem('TEXT_CONVERT', JSON.stringify({action: obj.action, encode: obj.encode, decode: obj.decode}))
  }



  // ? ------------
  // ? COLOR PICKER
  // ? ------------

  objColorPicker: IColorPicker = {} as IColorPicker;

  get colorPicker(){
    const storage = localStorage.getItem('COLOR_PICKER')
    if(!storage) return {} as IColorPicker;

    const COLOR_PICKER: IColorPicker = JSON.parse(storage)
    if(!COLOR_PICKER) return {} as IColorPicker;
    this.objColorPicker = COLOR_PICKER;
    return this.objColorPicker
  }

  set colorPicker(obj: IColorPicker){
    localStorage.setItem('COLOR_PICKER', JSON.stringify({color: obj.color, save: obj.save, mode: obj.mode}))
  }
}
