import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'symbolSeparating'
})
export class SymbolSeparatingPipe implements PipeTransform {

  transform(value: Array<any>, separator = ','): string {
    return value.join(separator);
  }
}
