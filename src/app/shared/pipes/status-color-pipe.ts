import { Pipe, PipeTransform } from '@angular/core';
import { TravelStatus } from '../models/travel';
@Pipe({
  name: 'statusColor',
  standalone: true,
})
export class StatusColorPipe implements PipeTransform {
  transform(value: TravelStatus): string {
    switch (value) {
      case TravelStatus.Available:
        return '#4caf50';
      case TravelStatus.ComingSoon:
        return '#ff9800';
      case TravelStatus.SoldOut:
        return '#f44336';
      default:
        return '#9e9e9e';
    }
  }
}
