import { ImageRepository } from "../../../domain/repositories/imageRepository";

export class DeleteImage {
  constructor(private imageRepository: ImageRepository) {}

  async execute(id: string): Promise<void> {
    return this.imageRepository.delete(id);
  }
}