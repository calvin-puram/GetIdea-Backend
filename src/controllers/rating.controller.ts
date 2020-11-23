import { NextFunction, Request, Response } from "express";
import RatingService from "../service/rating.service";
import Rating from "../interface/rating.interface";
import catchAsync from "../utils/catchAsync";

class RatingController {
  public RatingService = new RatingService();

  public CreateIdea = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
       //@ts-ignore
      console.log(req.user.id)
      const data: Rating = {
          rating: req.body.rating * 1,
          //@ts-ignore
          user:req.user.id,
          idea: req.params.id
      }
      const ideaId = req.params.id;
      const rating: Rating = await this.RatingService.createRating(data, ideaId);
      res.status(201).json({
        success: true,
        data: rating,
      });
    }
  );

}

export default RatingController;
