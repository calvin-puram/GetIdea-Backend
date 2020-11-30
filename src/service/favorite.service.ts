import HttpException from "../exceptions/HttpException";
import IFavorite from "../interface/favorite.interface";
import FavoriteModel from "../models/favorite.model";

class FavoriteService {
  public Favorite = FavoriteModel;

  public async createFavorite(favData: IFavorite): Promise<IFavorite> {
    const favorite: IFavorite = await this.Favorite.create(favData);
    return favorite;
  }

  public async getUserFavorite(favId:any): Promise<IFavorite[]> {
     const favorite: IFavorite[] = await this.Favorite.find({ user: favId });
    if (!favorite) throw new HttpException(404, "user has no favorite idea");
    return favorite;
  }

  public async deleteUserFavorite(favId:any): Promise<void> {
     await this.Favorite.findOneAndRemove({ idea: favId });
  }
}

export default FavoriteService;
