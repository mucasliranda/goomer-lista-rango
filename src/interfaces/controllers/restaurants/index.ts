import { DatabaseRestaurantRepository } from '../../../domain/repositories/restaurantRepository/databaseRestaurantRepository';
import { LocalImageRepository } from '../../../domain/repositories/imageRepository/localImageRepository';
import CreateRestaurant from '../../../application/use-cases/restaurants/createRestaurant';
import UpdateRestaurant from '../../../application/use-cases/restaurants/updateRestaurant';
import DeleteRestaurant from '../../../application/use-cases/restaurants/deleteRestaurant';
import GetRestaurants from '../../../application/use-cases/restaurants/getRestaurants';
import GetRestaurant from '../../../application/use-cases/restaurants/getRestaurant';
import { UploadImage } from '../../../application/use-cases/images/uploadImage';
import { ImageFile } from '../../../domain/models/imageFile';
import Restaurant from '../../../domain/models/restaurant';
import { Router } from 'express';
import multer from 'multer';

const router = Router();

const restaurantRepository = new DatabaseRestaurantRepository();
const createRestaurant = new CreateRestaurant(restaurantRepository);
const getRestaurants = new GetRestaurants(restaurantRepository);
const getRestaurant = new GetRestaurant(restaurantRepository);
const updateRestaurant = new UpdateRestaurant(restaurantRepository);
const deleteRestaurant = new DeleteRestaurant(restaurantRepository);

const imageRepository = new LocalImageRepository();
const uploadImage = new UploadImage(imageRepository);

const upload = multer({ storage: multer.memoryStorage() });

router.get('', async (req, res) => {
  const restaurants = await getRestaurants.execute();

  res.json(restaurants);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const restaurant = await getRestaurant.execute(id);

  res.json(restaurant);
});

router.post('/', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No image uploaded');
  }

  const { name, address, hours: jsonHours } = req.body;
  const hours = !!jsonHours ? JSON.parse(jsonHours) : [];

  const restaurant = Restaurant.create({ name, address, hours})
  const imageFile = ImageFile.create({
    id: restaurant.id,
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    buffer: req.file.buffer
  })

  await createRestaurant.execute(restaurant)
  await uploadImage.execute(imageFile)
  
  res.status(201).send('Restaurant created');
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, address, hours } = req.body;

  const restaurant = Restaurant.create({ id, name, address, hours });

  await updateRestaurant.execute(restaurant);

  res.send('Restaurant updated');
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await deleteRestaurant.execute(id);

  res.send('Restaurant deleted');
});

export default router