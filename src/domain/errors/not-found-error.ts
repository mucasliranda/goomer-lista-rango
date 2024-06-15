export class NotFoundError extends Error {
  status: number = 404;

  constructor(message: string | undefined = 'NotFoundError') {
    super(message);
  }
}