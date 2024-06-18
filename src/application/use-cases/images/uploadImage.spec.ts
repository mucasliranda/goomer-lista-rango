import { beforeEach, describe, expect, it } from "vitest";
import fs from 'fs';
import { UploadImage } from "./uploadImage";
import { LocalImageRepository } from "../../../domain/repositories/imageRepository/localImageRepository";
import { ImageFile } from "../../../domain/models/imageFile";

describe('Upload Image Use Case', () => {
  const imageRepository = new LocalImageRepository();
  const uploadImage = new UploadImage(imageRepository);

  beforeEach(() => {
    const path = 'public/images-database';
    const files = fs.readdirSync(path);
    for (const file of files) {
      fs.unlinkSync(`${path}/${file}`);
    }
  })

  it('should upload image with success', async () => {
    const image = ImageFile.create({
      id: crypto.randomUUID(),
      originalname: 'image.jpg',
      mimetype: 'image/jpeg',
      buffer: fs.readFileSync(`public/images-mock/restaurante.jpg`)
    });

    await uploadImage.execute(image);

    const filePath = `public/images-database/${image.id}.jpg`;
    expect(fs.existsSync(filePath)).toBe(true);
  });
});