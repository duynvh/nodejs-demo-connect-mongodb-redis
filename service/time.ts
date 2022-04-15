import { injectable } from 'inversify';
import moment from 'moment';

const DATE_IN_WEEK_FORMAT = 'dddd';

@injectable()
export class TimeService {
  public getTotalDaysInMonth(pattern: string): number {
    // 2020-10
    const [year, month] = pattern.split('-');
    const total = new Date(+year, +month, 0).getDate();
    return total;
  }

  public getDayInTheWeek(pattern: string): string {
    // 2022-04-13 -> Wednesday
    const date = moment(pattern);
    return moment(date).format(DATE_IN_WEEK_FORMAT);
  }
}
