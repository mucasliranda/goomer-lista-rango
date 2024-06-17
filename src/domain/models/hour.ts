import { ValidationError } from "../errors/validation-error";

const timePattern = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
const quarterHourPattern = /^([0-1][0-9]|2[0-3]):(00|15|30|45)$/;

export default class Hour {
  constructor(
    readonly id: string,
    readonly start: string,
    readonly end: string,
    readonly days: Array<number>
  ) {
    if (!this.start) throw new ValidationError('Hour start is required');
    if (!timePattern.test(this.start)) throw new ValidationError('Hour start must be in HH:mm format');
    
    if (!this.end) throw new ValidationError('Hour end is required');
    if (!timePattern.test(this.end)) throw new ValidationError('Hour end must be in HH:mm format');

    if (!quarterHourPattern.test(this.start) || !quarterHourPattern.test(this.end)) {
      throw new ValidationError('Hour interval must be at least 15 minutes');
    }

    if (this.days.length === 0) throw new ValidationError('Hour days could not be empty');
    for (const day of this.days) {
      if (day < 0 || day > 6) throw new ValidationError('Hour days must be between 0 and 6');
    }
  }

  static create({ id, start, end, days }: Omit<Hour, 'id'> & { id?: string }) {
    return new Hour(
      id || crypto.randomUUID(),
      start,
      end,
      days
    );
  } 
}