export class ValidationError extends Error {
  status: number = 400;

  constructor(message: string | undefined = 'ValidationError') {
    super(message);
  }
}