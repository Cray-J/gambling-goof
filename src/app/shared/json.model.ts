import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export const isNullOrUndefined = (a: string | number | object): boolean => a === null || a === undefined;

export class Json {
  static map<T>(json: {}, from: (json) => T): T {
    return json === null ? null : from(json);
  }

  static mapArray<T>(json: {}, from: (json) => T): T[] {
    const result: T[] = [];
    if (!isNullOrUndefined(json)) {
      for (const element of Object.keys(json)) {
        if (!isNullOrUndefined(json[element])) {
          result.push(from(json[element]));
        }
      }
    }
    return result;
  }

  static mapToJson<T>(mapValues: Map<string, string>): {} {
    if (!mapValues || mapValues.size < 1) {
      return {};
    }
    const obj = Object.create(null);
    Array.from(mapValues.entries()).forEach(([k, v]) => (obj[k] = v));
    return obj;
  }

  static asOperatorFunction<T>(ctor: new (json) => T): OperatorFunction<object, T> {
    return map(json => Json.map(json, j => new ctor(j)));
  }

  static asOperatorFunctionArray<T>(ctor: new (json) => T): OperatorFunction<object, T[]> {
    return map(json => Json.mapArray(json, j => new ctor(j)));
  }
}
