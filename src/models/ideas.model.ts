import * as mongoose from "mongoose";
import Idea from "../interface/ideas.interface";
import slugify from 'slugify';


const IdeasSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  category: {
    type: String,
    required: [true, "category"],
  },
  ratingsAverage: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5,
      set: (val: number) => Math.round(val * 10) / 10
    },
  slug: {
    type:String,
    unique: true
  },
  ratingsQuantity: {
      type: Number,
      default: 0
  },
 tag: {
      type: String,
      required: [true, 'an Idea must have a tag']
  },
  content: {
      type: String,
      required: [true, 'an Idea must have a content']
    },
  imageCover: String,
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// slug
IdeasSchema.pre<Idea & mongoose.Document>('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});


const IdeasModel = mongoose.model<Idea & mongoose.Document>("Ideas", IdeasSchema);
export default IdeasModel;
