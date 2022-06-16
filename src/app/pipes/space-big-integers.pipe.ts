import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spaceBigIntegers'
})
export class SpaceBigIntegersPipe implements PipeTransform {

  transform(value: number): unknown {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

}
