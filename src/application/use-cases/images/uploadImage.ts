import { ImageRepository } from "../../../domain/repositories/imageRepository";
import { ImageFile } from "../../../domain/models/imageFile";

export class UploadImage {
  constructor(private imageRepository: ImageRepository) {}

  async execute(image: ImageFile): Promise<void> {
    return this.imageRepository.save(image);
  }
}