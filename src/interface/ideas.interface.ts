
interface Idea {
  ratingsAverage: number;
  name: string;
  category: string;
  ratingsQuantity: number;
  slug?: string;
  tag: string;
  content: string;
  imageCover: string;
  images: string[];
  createdAt?: Date;
}

export default Idea;
