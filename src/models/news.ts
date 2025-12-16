export interface News {
  _id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  imageurl?: string;
  author: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}
