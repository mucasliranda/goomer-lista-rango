import { ValidationError } from "../errors/validation-error";

export default class Hour {
  constructor(
    readonly id: string,
    readonly start: string,
    readonly end: string,
    readonly days: Array<number>
  ) {
    if (!this.start) throw new ValidationError('Hour start is required');
    if (!this.end) throw new ValidationError('Hour end is required');
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