import { Router } from 'express';
import { DishController } from '@/controllers/dishes.controller';
import { CreateDishDto } from '@/dtos/dishes.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AdminCheckMiddleware, AuthMiddleware } from '@/middlewares/auth.middleware';

export class DishRoute implements Routes {
  public path = '/dishes';
  public router = Router();
  public dish = new DishController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.dish.getDishes);

    this.router.get(`${this.path}/search`, this.dish.searchDishes);
    this.router.get(`${this.path}/:id(\\d+)`, this.dish.getDishById);
    this.router.post(`${this.path}`, AuthMiddleware, AdminCheckMiddleware, ValidationMiddleware(CreateDishDto), this.dish.createDish);
    this.router.put(`${this.path}/:id(\\d+)`, AuthMiddleware, AdminCheckMiddleware, ValidationMiddleware(CreateDishDto, true), this.dish.updateDish);
    this.router.delete(`${this.path}/:id(\\d+)`, AuthMiddleware, AdminCheckMiddleware, this.dish.deleteDish);
  }
}
