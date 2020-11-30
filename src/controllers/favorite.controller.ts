import { NextFunction, Request, Response } from "express";
import FavoriteService from "../service/favorite.service";
import IFavorite from "../interface/favorite.interface";
import catchAsync from "../utils/catchAsync";
import { RequestWithUser } from "../interface/auth.interface";

class FavoriteController {
  public FavoriteService = new FavoriteService();

  public CreateFavorite = catchAsync(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
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


  public GetUserFavorite = catchAsync(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const userId = req.user.id;
      

      const favorite: IFavorite[] = await this.FavoriteService.getUserFavorite(userId);

      res.status(200).json({
        success: true,
        data: favorite,
      });
    }
  );

  public DeleteUserFavorite = catchAsync(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const favId = req.params.id;
      await this.FavoriteService.deleteUserFavorite(favId);

      res.status(204).json({
        success: true,
        data: {},
      });
    }
  );
}

export default FavoriteController;
