import { BrandController } from '@/controllers/brands.controller';
import { Routes } from '@/interfaces/routes.interface';
import { logger } from '@utils/logger';
import { Router } from 'express';

export class BrandRoute implements Routes {
  public path = '/brands';
  public router = Router();
  public brand = new BrandController();

  constructor() {
    logger.info('Initializing BrandRoute...');
    this.initializeRoutes();
    logger.info('BrandRoute initialized successfully');
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.brand.getBrands);
  }
}
