import { Router } from "express";
import Route from "../interface/routes.interface";
import IdeaController from "../controllers/ideas.controller";
import protect from "../middleware/auth.middleware";
import authorize from '../middleware/authRole.middleware';


class IdeaRoute implements Route {
  public path = "/ideas";
  public router = Router();
  public IdeaController = new IdeaController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(`${this.path}`,  this.IdeaController.getAllIdeas);
    this.router.post(`${this.path}`,  this.IdeaController.CreateIdea);

    this.router
      .route(`${this.path}/:slug`)
      .get(this.IdeaController.getIdea)
      .delete(protect, authorize('admin'), this.IdeaController.deleteIdea)
      .patch(protect, authorize('admin'), this.IdeaController.UpdateIdea);
  }
}

export default IdeaRoute;
