import { Service } from 'typedi';
import { DB } from '@/database';
import { CreateDishDto, UpdateDishDto, UpdateLikeDto } from '@/dtos/dishes.dto';
import { HttpException } from '@/exceptions/HttpException';
import { Dish } from '@/interfaces/dishes.interface';

@Service()
export class DishService {
  //list all dishes
  public async findAllDishes(): Promise<Dish[]> {
    const dishes = await DB.Dish.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
        include: [],
      },
    });
    return dishes;
  }
  //find dishes
  public async findDishbyId(dishId: number): Promise<Dish> {
    const findDish: Dish = await DB.Dish.findByPk(dishId);
    if (!findDish) throw new HttpException(409, "Dish doesn't exist");

    return findDish;
  }
  //get 10 popular dishes
  public async findTenPopularDishes(): Promise<Dish[]> {
    const dishes: Dish[] = await DB.Dish.findAll({
      limit: 10,
      order: [['score', 'DESC']],
    });
    return dishes;
  }

  //seeding
  public async seedDish(dto: CreateDishDto): Promise<Dish> {
    // const findDish = await DB.Dish.findOne({ where: { name: dto.name } });
    // if (findDish) throw new HttpException(409, `This dish ${dto.name} already exists`);

    const { productid, ...product } = dto;

    const createDishData: Dish = await DB.Dish.create({ ...product, productid: productid });
    return createDishData;
  }

  //add
  public async createDish(dto: CreateDishDto): Promise<Dish> {
    const { productid, ...product } = dto;
    const aaa: string[] = productid;
    for (const id of aaa) {
      const findproduct = await DB.Product.findOne({ where: { id: id } });
      if (!findproduct) {
        throw new HttpException(404, `Product with ID ${id} does not exist`);
      }
    }

    const createDishData: Dish = await DB.Dish.create({ ...product, productid: aaa });
    return createDishData;
  }

  //update
  public async updateDish(dishId: number, dishData: UpdateDishDto): Promise<Dish> {
    const findDish = await DB.Dish.findByPk(dishId);
    if (!findDish) throw new HttpException(404, `Dish with ID ${dishId} not found`);
    console.log(dishData.score);
    if (dishData.productid) {
      for (const id of dishData.productid) {
        const findProduct = await DB.Product.findOne({ where: { id: id } });
        if (!findProduct) {
          throw new HttpException(404, `Product with ID ${id} does not exist`);
        }
      }
    }

    await DB.Dish.update(dishData, { where: { id: dishId } });

    const updatedDish = await DB.Dish.findByPk(dishId);
    return updatedDish;
  }
  //update score
  public async updateScore(dishId: number): Promise<Dish> {
    const findDish = await DB.Dish.findByPk(dishId);
    if (!findDish) throw new HttpException(404, `Dish with ID ${dishId} not found`);

    // Increment the score by 1
    const newScore = findDish.score + 1;

    // Update only the score attribute
    await DB.Dish.update({ score: newScore }, { where: { id: dishId } });

    const updatedDish = await DB.Dish.findByPk(dishId);
    return updatedDish;
  }
  public async updateScore2(dishId: number): Promise<Dish> {
    const findDish = await DB.Dish.findByPk(dishId);
    if (!findDish) throw new HttpException(404, `Dish with ID ${dishId} not found`);

    // Increment the score by 1
    const newScore = findDish.score - 1;

    // Update only the score attribute
    await DB.Dish.update({ score: newScore }, { where: { id: dishId } });

    const updatedDish = await DB.Dish.findByPk(dishId);
    return updatedDish;
  }

  //delete
  public async deleteDish(dishId: number): Promise<Dish> {
    const findDish: Dish = await DB.Dish.findByPk(dishId);
    if (!findDish) throw new HttpException(409, "Dish doesn't exist");

    await DB.Dish.destroy({ where: { id: dishId } });

    return findDish;
  }
  //search by name
  public async searchDishByName(query: string) {
    const dishes = await DB.Dish.findAll({
      where: {
        name: {
          [DB.Sequelize.Op.like]: `%${query}%`,
        },
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
        include: [],
      },
    });

    return dishes;
  }
}
