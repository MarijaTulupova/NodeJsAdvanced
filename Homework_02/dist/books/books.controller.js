"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const common_1 = require("@nestjs/common");
let BooksController = class BooksController {
    books = [];
    findAll(minPrice, author, available) {
        let result = this.books;
        if (minPrice) {
            const priceValue = parseFloat(minPrice);
            result = result.filter((book) => book.price >= priceValue);
        }
        if (author) {
            result = result.filter((book) => typeof book.author === 'string' &&
                book.author.toLowerCase().includes(author.toLowerCase()));
        }
        if (available !== undefined) {
            const isAvailable = available === 'true';
            result = result.filter((book) => book.available === isAvailable);
        }
        return result;
    }
    findOne(id, response) {
        const book = this.books.find((b) => b.id === parseInt(id));
        if (!book) {
            return response
                .status(404)
                .send({ message: `Book with id: ${id} is not found.` });
        }
        return response.send(book);
    }
    create(requestBook) {
        console.log(requestBook);
        const newBook = {
            ...requestBook,
            id: Date.now(),
        };
        this.books.push(newBook);
        return newBook;
    }
    updateBook(updateBookData, id, res) {
        const bookIndex = this.books.findIndex((b) => b.id === parseInt(id));
        if (bookIndex === -1) {
            return res
                .status(404)
                .send({ message: `Book with id ${id} is not found.` });
        }
        const updatedBook = {
            ...updateBookData,
            id: parseInt(id),
        };
        this.books[bookIndex] = updatedBook;
        return res.send(updatedBook);
    }
    remove(id, res) {
        const bookIndex = this.books.findIndex((b) => b.id === parseInt(id));
        if (bookIndex === -1) {
            return res.status(404).send({ message: `Book with id ${id} not found.` });
        }
        this.books.splice(bookIndex, 1);
        return res.status(204).send();
    }
};
exports.BooksController = BooksController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)('minPrice')),
    __param(1, (0, common_1.Query)('author')),
    __param(2, (0, common_1.Query)('available')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "updateBook", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "remove", null);
exports.BooksController = BooksController = __decorate([
    (0, common_1.Controller)('books')
], BooksController);
//# sourceMappingURL=books.controller.js.map