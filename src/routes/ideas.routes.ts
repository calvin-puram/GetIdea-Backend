import { Router } from "express";
import Route from "../interface/routes.interface";
import IdeaController from "../controllers/ideas.controller";
import protect from "../middleware/auth.middleware";

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
      .delete(this.IdeaController.deleteIdea)
      .patch(this.IdeaController.UpdateIdea);
  }
}

export default IdeaRoute;
