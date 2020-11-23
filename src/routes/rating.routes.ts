import { Router } from "express";
import Route from "../interface/routes.interface";
import RatingController from "../controllers/rating.controller";
import protect from "../middleware/auth.middleware";

class RatingRoute implements Route {
  public path = "/idea";
  public router = Router();
  public RatingController = new RatingController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router
      .route(`${this.path}/:id/rating`)
      .post(protect, this.RatingController.CreateIdea);
  }
}

export default RatingRoute;
