import { DatabaseSaleRepository } from '../../../domain/repositories/saleRepository/databaseSaleRepository';
import CreateSale from '../../../application/use-cases/sales/createSale';
import DeleteSale from '../../../application/use-cases/sales/deleteSale';
import UpdateSale from '../../../application/use-cases/sales/updateSale';
import { Sale } from '../../../domain/models/sale';
import { Router } from 'express';

const router = Router();

const saleRepository = new DatabaseSaleRepository();
const createSale = new CreateSale(saleRepository);
const updateSale = new UpdateSale(saleRepository);
const deleteSale = new DeleteSale(saleRepository);

router.post('/:productId', async (req, res) => {
  const { productId } = req.params;

  const { price, description, hours } = req.body;

  const sale = Sale.create({ 
    productId,
    description,
    price: parseFloat(price),
    hours,
  });

  await createSale.execute(sale);

  res.status(201).send('Sale created');
});

router.put('/:productId/:id', async (req, res) => {
  const { productId, id } = req.params;

  const { price, description, hours } = req.body;

  const sale = Sale.create({
    id,
    productId,
    price: parseFloat(price),
    description,
    hours,
  });

  await updateSale.execute(sale);

  res.send('Sale updated');
});

router.delete('/:productId/:id', async (req, res) => {
  const { id } = req.params;

  await deleteSale.execute(id);

  res.send('Sale deleted');
});




















// router.get('/:restaurantId', async (req, res) => {
//   const { restaurantId } = req.params;

//   const products = await getProducts.execute(restaurantId);

//   res.send(products);
// });

// router.post('/:restaurantId', upload.single('image'), async (req, res) => {
//   const { restaurantId } = req.params;

//   if (!req.file) {
//     return res.status(400).send('No image uploaded');
//   }

//   const { name, price, category } = req.body;

//   const product = Product.create({ 
//     name, 
//     restaurantId: restaurantId.toString(),
//     price: parseFloat(price),
//     category,
//   });

//   const imageFile = ImageFile.create({
//     id: product.id,
//     originalname: req.file.originalname,
//     mimetype: req.file.mimetype,
//     buffer: req.file.buffer
//   });

//   await createProduct.execute(product);
//   await uploadImage.execute(imageFile);

//   res.status(201).send('Product created');
// });

// router.put('/:restaurantId/:id', upload.single('image'), async (req, res) => {
//   const { restaurantId, id } = req.params;

//   if (!req.file) {
//     return res.status(400).send('No image uploaded');
//   }

//   const { name, price, category } = req.body;

//   const product = Product.create({ 
//     id,
//     name, 
//     restaurantId: restaurantId.toString(),
//     price: parseFloat(price),
//     category,
//   });

//   const imageFile = ImageFile.create({
//     id: product.id,
//     originalname: req.file.originalname,
//     mimetype: req.file.mimetype,
//     buffer: req.file.buffer
//   });

//   await updateProduct.execute(product);
//   await uploadImage.execute(imageFile);

//   res.send('Product updated');
// });

// router.delete('/:restaurantId/:id', async (req, res) => {
//   const { restaurantId, id } = req.params;

//   await productRepository.delete(id);
//   await deleteImage.execute(id);

//   res.send('Product deleted');
// });






export default router