import { ImageFile } from "../../models/imageFile";

export abstract class ImageRepository {
  abstract save(image: ImageFile): Promise<void>;
  abstract delete(id: string): Promise<void>;
}