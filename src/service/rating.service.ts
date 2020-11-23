import HttpException from "../exceptions/HttpException";
import Rating from "../interface/rating.interface";
import RatingModel from "../models/ratings.model";
import Idea from "../interface/ideas.interface";
import IdeasModel from "../models/ideas.model";

class RatingService {
  public Ratings = RatingModel;
  public Ideas = IdeasModel;

  public async createRating(ratingData: Rating, ideaId:any): Promise<Rating> {
    const idea: Idea = await this.Ideas.findById(ideaId);
    if (!idea) throw new HttpException(404, "idea not found");
    const newRating = await this.Ratings.create(ratingData)
    return newRating;
  }

}

export default RatingService;
