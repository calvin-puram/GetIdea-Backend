import HttpException from "../exceptions/HttpException";
import IFavorite from "../interface/favorite.interface";
import FavoriteModel from "../models/favorite.model";

class FavoriteService {
  public Favorite = FavoriteModel;

  public async createFavorite(favData: IFavorite): Promise<IFavorite> {
    const favorite: IFavorite = await this.Favorite.create(favData);
    return favorite;
  }
}

export default FavoriteService;
