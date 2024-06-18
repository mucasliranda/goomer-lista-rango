import { ImageFile } from '../../models/imageFile';
import { ImageRepository } from './';
import path from 'path';
import fs from 'fs';

export class LocalImageRepository implements ImageRepository {
  constructor() {}

  async save(image: ImageFile): Promise<void> {
    const filePath = path.join('public/images-database', image.id + '.jpg');
    fs.writeFileSync(filePath, image.buffer);
  }

  async delete(id: string): Promise<void> {
    const filePath = path.join('public/images-database', id + '.jpg');
    fs.unlinkSync(filePath);
  }
}