import { Router } from "express";
import Route from "../interface/routes.interface";
import FavoriteController from "../controllers/favorite.controller";
import protect from "../middleware/auth.middleware";

class FavoriteRoute implements Route {
  public path = "/favorite";
  public router = Router();
  public FavoriteController = new FavoriteController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router
      .route(`${this.path}/:id`)
      .post(protect, this.FavoriteController.CreateFavorite)
      .delete(protect, this.FavoriteController.DeleteUserFavorite);
    this.router.get(`${this.path}/`, protect, this.FavoriteController.GetUserFavorite)
  }
}

export default FavoriteRoute;
