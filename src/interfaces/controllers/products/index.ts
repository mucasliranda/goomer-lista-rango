import { DatabaseProductRepository } from '../../../domain/repositories/productRepository/databaseProductRepository';
import { LocalImageRepository } from '../../../domain/repositories/imageRepository/localImageRepository';
import UpdateProduct from '../../../application/use-cases/products/updateProduct';
import CreateProduct from '../../../application/use-cases/products/createProduct';
import { UploadImage } from '../../../application/use-cases/images/uploadImage';
import { DeleteImage } from '../../../application/use-cases/images/deleteImage';
import GetProducts from '../../../application/use-cases/products/getProducts';
import { ImageFile } from '../../../domain/models/imageFile';
import { Product } from '../../../domain/models/product';
import { Router } from 'express';
import multer from 'multer';

const router = Router();

const productRepository = new DatabaseProductRepository();
const createProduct = new CreateProduct(productRepository);
const getProducts = new GetProducts(productRepository);
const updateProduct = new UpdateProduct(productRepository);

const imageRepository = new LocalImageRepository();
const uploadImage = new UploadImage(imageRepository);
const deleteImage = new DeleteImage(imageRepository);

const upload = multer({ storage: multer.memoryStorage() });

router.get('/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;

  const products = await getProducts.execute(restaurantId);

  res.send(products);
});

router.post('/:restaurantId', upload.single('image'), async (req, res) => {
  const { restaurantId } = req.params;

  if (!req.file) {
    return res.status(400).send('No image uploaded');
  }

  const { name, price, category } = req.body;

  const product = Product.create({ 
    name, 
    restaurantId: restaurantId.toString(),
    price: parseFloat(price),
    category,
  });

  const imageFile = ImageFile.create({
    id: product.id,
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    buffer: req.file.buffer
  });

  await createProduct.execute(product);
  await uploadImage.execute(imageFile);

  res.status(201).send('Product created');
});

router.put('/:restaurantId/:id', async (req, res) => {
  const { restaurantId, id } = req.params;

  const { name, price, category } = req.body;

  const product = Product.create({ 
    id,
    name, 
    restaurantId: restaurantId.toString(),
    price: parseFloat(price),
    category,
  });

  await updateProduct.execute(product);

  res.send('Product updated');
});

router.delete('/:restaurantId/:id', async (req, res) => {
  const { restaurantId, id } = req.params;

  await productRepository.delete(id);
  await deleteImage.execute(id);

  res.send('Product deleted');
});

export default router