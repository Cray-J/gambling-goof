import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appKeys' })
export class KeysPipe implements PipeTransform {
  public transform(value,
                   args: string[]): any {
    const keys = [];
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        keys.push({ key, value: value[key] });
      }
      else {
        keys.push({ key, value: value});
      }
    }

    return keys;
  }
}
