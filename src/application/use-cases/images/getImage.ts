import { ImageRepository } from "../../../domain/repositories/imageRepository";

export class GetImage {
  constructor(private imageRepository: ImageRepository) {}

  async execute(id: string): Promise<string> {
    return this.imageRepository.get(id);
  }
}