import { NextFunction, Request, Response } from "express";
import IdeaService from "../service/ideas.service";
import Idea from "../interface/ideas.interface";
import catchAsync from "../utils/catchAsync";

class IdeaController {
  public IdeaService = new IdeaService();

  public getAllIdeas = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const ideas: Idea[] = await this.IdeaService.findAllIdeas();
      res.status(200).json({
        success: true,
        data: ideas,
      });
    }
  );

  public getIdea = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const ideaSlug: string = req.params.slug;
      const idea: Idea = await this.IdeaService.findIdeaBySlug(ideaSlug);
      res.status(200).json({
        success: true,
        data: idea,
      });
    }
  );

  public CreateIdea = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = req.body
      const idea: Idea = await this.IdeaService.createIdea(data);
      res.status(201).json({
        success: true,
        data: idea,
      });
    }
  );

  public UpdateIdea = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = req.body;
      const ideaSlug = req.params.slug;

      const idea: Idea = await this.IdeaService.UpdateIdea(data, ideaSlug);
      res.status(200).json({
        success: true,
        data: idea,
      });
    }
  );

  public deleteIdea = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const ideaSlug: string = req.params.slug;
      await this.IdeaService.deleteIdea(ideaSlug);
      res.status(200).json({
        success: true,
        data: null,
      });
    }
  );
}

export default IdeaController;
