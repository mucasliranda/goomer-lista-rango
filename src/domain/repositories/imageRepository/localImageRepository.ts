import { ImageFile } from '../../models/imageFile';
import { ImageRepository } from './';
import path from 'path';
import fs from 'fs';

export class LocalImageRepository implements ImageRepository {
  constructor() {}

  async get(id: string): Promise<string> {
    const filePath = path.join('public/images-database', id + '.jpg');
    return fs.readFileSync(filePath).toString('base64');
  }

  async save(image: ImageFile): Promise<void> {
    const filePath = path.join('public/images-database', image.id + '.jpg');
    fs.writeFileSync(filePath, image.buffer);
  }

  async delete(id: string): Promise<void> {
    const filePath = path.join('public/images-database', id + '.jpg');
    fs.unlinkSync(filePath);
  }
}