import { LocalImageRepository } from "../../../domain/repositories/imageRepository/localImageRepository";
import { ImageFile } from "../../../domain/models/imageFile";
import { describe, expect, it } from "vitest";
import { UploadImage } from "./uploadImage";
import { DeleteImage } from "./deleteImage";
import fs from 'fs';

describe('Delete Image Use Case', () => {
  const imageRepository = new LocalImageRepository();
  const uploadImage = new UploadImage(imageRepository);
  const deleteImage = new DeleteImage(imageRepository);

  it('should delete image', async () => {
    const image = ImageFile.create({
      id: crypto.randomUUID(),
      originalname: 'image.jpg',
      mimetype: 'image/jpeg',
      buffer: fs.readFileSync(`public/images-mock/restaurante.jpg`)
    });

    await uploadImage.execute(image);

    const filePath = `public/images-database/${image.id}.jpg`;
    expect(fs.existsSync(filePath)).toBe(true);

    await deleteImage.execute(image.id);

    expect(fs.existsSync(filePath)).toBe(false);
  });
});