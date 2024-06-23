import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { RecommendationController } from '@controllers/recommendation.controller';

export class RecommendationRoute implements Routes {
  public path = '/recommendations';
  public router = Router();
  public recommendationController = new RecommendationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:userId`, this.recommendationController.getRecommendations);
  }
}
