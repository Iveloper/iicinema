import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesToHours'
})
export class MinutesToHoursPipe implements PipeTransform {

  transform(minutes: number) {
    let hours = Math.floor(minutes / 60);
    let min = minutes % 60;

    if(typeof(hours) == 'number' && typeof(minutes) == 'number') {
      if(hours > 0) {
        return hours + 'h ' + min + 'm'
      } else {
        return min + 'm'
      }
    } else {
      return 'Unknown'
    }
  }
}
