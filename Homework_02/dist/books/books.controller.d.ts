import { Response } from 'express';
interface Book {
    id: number;
    title: string;
    author: string;
    price: number;
    available: boolean;
}
export declare class BooksController {
    private books;
    findAll(minPrice?: string, author?: string, available?: string): Book[];
    findOne(id: string, response: Response): Response<any, Record<string, any>>;
    create(requestBook: Book): Book;
    updateBook(updateBookData: Book, id: string, res: Response): Response<any, Record<string, any>>;
    remove(id: string, res: Response): Response<any, Record<string, any>>;
}
export {};
