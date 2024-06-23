import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CreateProductDto } from '@/dtos/products.dto';
import { Dish } from '@/interfaces/dishes.interface';
import { DishService } from '@/services/dishes.service';
import { CreateDishDto, UpdateLikeDto } from '@/dtos/dishes.dto';

export class DishController {
  public dish = Container.get(DishService);

  public getDishes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllDishData: Dish[] = await this.dish.findAllDishes();

      res.status(200).json({ data: findAllDishData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getDishById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dishId = Number(req.params.id);
      const findDishData: Dish = await this.dish.findDishbyId(dishId);

      res.status(200).json({ data: findDishData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createDish = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dishData: CreateDishDto = req.body;
      const createDishData: Dish = await this.dish.createDish(dishData);

      res.status(201).json({ data: createDishData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
  public updateDish = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dishId = Number(req.params.id);
      const dishData: CreateDishDto = req.body;
      const updateDishData: Dish = await this.dish.updateDish(dishId, dishData);

      res.status(200).json({ data: updateDishData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public updateScore = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dishId = Number(req.params.id);
      const updateScore: Dish = await this.dish.updateScore(dishId);
      res.status(200).json({ data: updateScore, message: 'updated +' });
    } catch (error) {
      next(error);
    }
  };
  public updateScore2 = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dishId = Number(req.params.id);

      const updateScore2: Dish = await this.dish.updateScore2(dishId);

      res.status(200).json({ data: updateScore2, message: 'updated -' });
    } catch (error) {
      next(error);
    }
  };

  public getPopularDishes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findTenPopularDishes: Dish[] = await this.dish.findTenPopularDishes();

      res.status(200).json({ data: findTenPopularDishes, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
  public deleteDish = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dishId = Number(req.params.id);
      const deleteDishData: Dish = await this.dish.deleteDish(dishId);

      res.status(200).json({ data: deleteDishData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public searchDishes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { keyword } = req.query;
      const searchDishesData: Dish[] = await this.dish.searchDishByName(keyword as string);

      res.status(200).json({ data: searchDishesData, message: 'search' });
    } catch (error) {
      next(error);
    }
  };
}
