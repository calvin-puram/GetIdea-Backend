import * as mongoose from "mongoose";
import Rating from "../interface/rating.interface";

const {Schema} = mongoose

const RatingSchema = new Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'please add a rating']
  },
  user: {
    
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  idea: {
    
    type: Schema.Types.ObjectId,
    ref: 'Ideas',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

RatingSchema.index({ idea: 1, user: 1 }, { unique: true });

// calulate average ratings
RatingSchema.statics.calcRating = async function(ideaId: object) {
  const stats = await this.aggregate([
    {
      $match: { idea: ideaId }
    },
    {
      $group: {
        _id: '$idea',
        nRating: { $sum: 1 },
        averageRating: { $avg: '$rating' }
      }
    }
  ]);
  if (stats.length > 0) {
    await this.model('Ideas').findByIdAndUpdate(ideaId, {
      ratingsAverage: stats[0].averageRating,
      ratingsQuantity: stats[0].nRating
    });
  } else {
    await this.model('Ideas').findByIdAndUpdate(ideaId, {
      ratingsAverage: 0.0,
      ratingsQuantity: 0
    });
  }
};

RatingSchema.post<Rating & mongoose.Document>('save', function() {
  this.constructor.calcRating(this.idea);
});

//update ratings average
RatingSchema.pre<Rating & mongoose.Document>(/^findOneAnd/, async function(next) {
  //@ts-ignore
  this.r = await this.findOne();
  next();
});

RatingSchema.post(/^findOneAnd/, async function() {
  await this.r.constructor.calcRating(this.r.idea);
});



const RatingModel = mongoose.model<Rating & mongoose.Document>("Ratings", RatingSchema);
export default RatingModel;
