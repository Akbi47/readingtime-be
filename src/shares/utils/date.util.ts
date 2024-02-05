import * as moment from 'moment';
import { CreateTimelineEventDto } from 'src/modules/user/reading-room/dto/create-timeline-event.dto';
export class DateUtil {
  calculateNeededDaysWithTime = (
    start_day,
    end_day,
    need_day,
  ): CreateTimelineEventDto[] => {
    const startDate = moment(start_day, 'YYYY/MM/DD');
    const endDate = moment(end_day, 'YYYY/MM/DD');

    const currentDate = startDate.clone();
    const result = [];

    while (currentDate <= endDate) {
      const matchingDay = need_day.find(
        (item) => item.days === currentDate.format('dddd').toLowerCase(),
      );

      if (matchingDay) {
        const [timeStart, timeEnd] = matchingDay.time.split('~');
        result.push({
          day: currentDate.format('dddd'),
          date: currentDate.format('D'),
          month: currentDate.format('M'),
          year: currentDate.format('YYYY'),
          timeStart,
          timeEnd,
        });
      }
      currentDate.add(1, 'day');
    }
    return result;
  };
}
