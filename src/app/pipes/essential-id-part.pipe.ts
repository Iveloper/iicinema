import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'essentialIdPart'
})
export class EssentialIdPartPipe implements PipeTransform {

    transform(id: string, splitBy: string = 'name') {
        return id.split(splitBy).pop()?.split('/')[1];
  }
}
