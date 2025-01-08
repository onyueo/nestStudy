export class CreatePostDto {
  userId: number;
  board: string;
  category: string;
  title: string;
  content: string;
  clicked: number;
  // tag?: string;
}
