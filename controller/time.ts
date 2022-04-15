import { controller, httpGet } from 'inversify-express-utils';

import { inject } from 'inversify';
import { TimeService } from '../service/time';
import { request, Request, Response } from 'express';

import TYPES from '../constant/types';

@controller('/time')
export class TimeController {
  constructor(@inject(TYPES.TimeService) private timeService: TimeService) {}

  @httpGet('/total-days-in-month/:pattern')
  public getTotalDaysInMonth(request: Request, response: Response): Object {
    const totalDays = this.timeService.getTotalDaysInMonth(
      request.params.pattern
    );

    return response.json({
      data: totalDays.toString(),
    });
  }

  @httpGet('/days-in-week/:pattern')
  public getDayInTheWeek(request: Request, response: Response): Object {
    const data = this.timeService.getDayInTheWeek(request.params.pattern);

    return response.json({
      data,
    });
  }
}
