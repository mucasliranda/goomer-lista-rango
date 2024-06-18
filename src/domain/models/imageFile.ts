import { ValidationError } from "../errors/validation-error";

export class ImageFile {
  constructor(
    readonly id: string,
    readonly originalname: string,
    readonly mimetype: string,
    readonly buffer: Buffer,
  ) {
    if (!this.id) throw new ValidationError('ImageFile id is required');
    if (!this.originalname) throw new ValidationError('ImageFile originalname is required');
    if (!this.mimetype) throw new ValidationError('ImageFile mimetype is required');
    if (!this.buffer) throw new ValidationError('ImageFile buffer is required');
  }

  static create({ id, originalname, mimetype, buffer }: ImageFile) {
    return new ImageFile(
      id,
      originalname,
      mimetype,
      buffer
    );
  }
}