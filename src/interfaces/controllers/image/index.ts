import { LocalImageRepository } from '../../../domain/repositories/imageRepository/localImageRepository';
import { GetImage } from '../../../application/use-cases/images/getImage';
import { Router } from 'express';

const router = Router();

const imageRepository = new LocalImageRepository();
const getImage = new GetImage(imageRepository);

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const image = await getImage.execute(id);
  
  const imageBuffer = Buffer.from(image, 'base64');

  res.contentType('image/jpeg');

  res.send(imageBuffer);
});

export default router