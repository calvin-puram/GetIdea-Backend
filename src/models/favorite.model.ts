import * as mongoose from "mongoose";
import IFavorite from "../interface/favorite.interface";

const FavoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  idea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ideas',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

FavoriteSchema.index({ idea: 1, user: 1 }, { unique: true });

FavoriteSchema.pre<IFavorite & mongoose.Document>(/^find/, function(next) {
  this.populate('idea');
  next();
});

export default mongoose.model<IFavorite & mongoose.Document>('Favorite', FavoriteSchema);
