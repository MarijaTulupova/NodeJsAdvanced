import {
  Injectable,
  Inject,
  forwardRef,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PostsService } from 'src/posts/posts.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './dto/user.interface';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(
    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,
  ) {}

  create(createUserDto: CreateUserDto): User {
    const { name, email, role } = createUserDto;

    const emailExists = this.users.some((user) => user.email === email);

    if (emailExists) {
      throw new BadRequestException('Email is already in use.');
    }
    const newUser: User = {
      id: uuidv4(),
      name,
      email,
      role,
      posts: [],
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    user.posts = this.postsService.findByUserId(id).map((post) => post.id);
    return user;
  }

  addPostToUser(userId: string, postId: string) {
    const user = this.findOne(userId);
    user.posts.push(postId);
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const user = this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    Object.assign(user, updateUserDto);
    return user;
  }

  remove(id: string): void {
    const index = this.users.findIndex((user) => user.id === id);

    if (index < 0) {
      throw new NotFoundException('User not found.');
    }
    this.users.splice(index, 1);
  }
}
