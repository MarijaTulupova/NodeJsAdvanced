import {
  Controller,
  Get,
  Param,
  Res,
  Post,
  Body,
  Put,
  Delete,
  Query,
  HttpCode,
} from '@nestjs/common';
import { Response } from 'express';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  available: boolean;
}

@Controller('books')
export class BooksController {
  private books: Book[] = [];

  @Get()
  @HttpCode(200)
  findAll(
    @Query('minPrice') minPrice?: string,
    @Query('author') author?: string,
    @Query('available') available?: string,
  ) {
    let result = this.books;

    if (minPrice) {
      const priceValue = parseFloat(minPrice);
      result = result.filter((book) => book.price >= priceValue);
    }

    if (author) {
      result = result.filter(
        (book) =>
          typeof book.author === 'string' &&
          book.author.toLowerCase().includes(author.toLowerCase()),
      );
    }

    if (available !== undefined) {
      const isAvailable = available === 'true';
      result = result.filter((book) => book.available === isAvailable);
    }

    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() response: Response) {
    const book = this.books.find((b) => b.id === parseInt(id));

    if (!book) {
      return response
        .status(404)
        .send({ message: `Book with id: ${id} is not found.` });
    }
    return response.send(book);
  }

  @Post()
  create(@Body() requestBook: Book) {
    console.log(requestBook);

    const newBook: Book = {
      ...requestBook,
      id: Date.now(),
    };

    this.books.push(newBook);
    return newBook;
  }

  @Put(':id')
  updateBook(
    @Body() updateBookData: Book,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const bookIndex = this.books.findIndex((b) => b.id === parseInt(id));

    if (bookIndex === -1) {
      return res
        .status(404)
        .send({ message: `Book with id ${id} is not found.` });
    }

    const updatedBook: Book = {
      ...updateBookData,
      id: parseInt(id),
    };

    this.books[bookIndex] = updatedBook;
    return res.send(updatedBook);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const bookIndex = this.books.findIndex((b) => b.id === parseInt(id));

    if (bookIndex === -1) {
      return res.status(404).send({ message: `Book with id ${id} not found.` });
    }

    this.books.splice(bookIndex, 1);
    return res.status(204).send();
  }
}
