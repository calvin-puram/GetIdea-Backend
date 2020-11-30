import { NextFunction, Request, Response } from "express";
import FavoriteService from "../service/favorite.service";
import IFavorite from "../interface/favorite.interface";
import catchAsync from "../utils/catchAsync";

class FavoriteController {
  public FavoriteService = new FavoriteService();

  public CreateFavorite = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      req.body.user = req.user.id;
      req.body.idea = req.params.id;

      const favorite: IFavorite = await this.FavoriteService.createFavorite(
        req.body
      );
      res.status(201).json({
        success: true,
        data: favorite,
      });
    }
  );
}

export default FavoriteController;
