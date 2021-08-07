import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'replyTime' })
export class ReplyTimePipe implements PipeTransform {
  transform(seconds: number): string {
    if (seconds > 3600) {
      return `${(seconds / 3600).toFixed(2)} hours`;
    }
    if (seconds > 60) {
      return `${(seconds / 60).toFixed(2)} minutes`;
    }
    return `${seconds} seconds`;
  }
}