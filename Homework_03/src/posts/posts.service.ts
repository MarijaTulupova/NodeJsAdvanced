import {
  Injectable,
  Inject,
  forwardRef,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './dto/post.interface';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  create(createPostDto: CreatePostDto): Post {
    const { title, content, authorId } = createPostDto;

    const user = this.usersService.findOne(authorId);

    if (!user) {
      throw new BadRequestException(
        'Author ID does not reference to an existing user.',
      );
    }
    const newPost: Post = {
      id: uuidv4(),
      title,
      content,
      authorId,
    };
    this.posts.push(newPost);

    this.usersService.addPostToUser(authorId, newPost.id);
    return newPost;
  }

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: string): Post {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException('Post not found.');
    }
    return post;
  }

  findByUserId(userId: string): Post[] {
    return this.posts.filter((post) => post.authorId === userId);
  }

  update(id: string, updatePostDto: UpdatePostDto): Post {
    const post = this.findOne(id);

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    Object.assign(post, updatePostDto);
    return post;
  }

  remove(id: string): void {
    const index = this.posts.findIndex((post) => post.id === id);
    if (index === -1) {
      throw new NotFoundException('Post not found.');
    }
    this.posts.splice(index, 1);
  }
}
