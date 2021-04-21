/* tslint:disable:no-unused-variable */
import { TestBed, async, inject, getTestBed } from "@angular/core/testing";
import { BookService } from "./book.service";
import * as faker from "faker";

import {
 HttpTestingController,
 HttpClientTestingModule,
} from "@angular/common/http/testing";

import { Book } from "./book";
import { Editorial } from "../editorial/editorial";
import { environment } from "../../environments/environment";

describe("Service: Book", () => {
 let injector: TestBed;
 let service: BookService;
 let httpMock: HttpTestingController;
 let apiUrl = environment.baseUrl + "books";

 beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [HttpClientTestingModule],
     providers: [BookService],
   });
   injector = getTestBed();
   service = injector.get(BookService);
   httpMock = injector.get(HttpTestingController);
 });

 afterEach(() => {
   httpMock.verify();
 });

 it("getPost() should return 10 records", () => {
   let mockPosts: Book[] = [];

   let editorial = new Editorial(
    faker.random.number(),
    faker.lorem.sentence()
  );

   for (let i = 1; i < 11; i++) {
     let book = new Book(
       i,
       faker.lorem.sentence(),
       faker.lorem.sentence(),
       faker.lorem.sentence(),
       faker.image.imageUrl(),
       faker.date.past(),
       editorial
     );

     mockPosts.push(book);
   }

   service.getBooks().subscribe((books) => {
     expect(books.length).toBe(10);
   });

   const req = httpMock.expectOne(apiUrl);
   expect(req.request.method).toBe("GET");
   req.flush(mockPosts);
 });
});
