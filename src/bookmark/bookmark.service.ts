import { CreateBookmarkInterface } from '../interfaces/create-Bookmark.interface';
import { Injectable } from '@nestjs/common';
import { EditBookmarkInterface } from '../interfaces/edit-Bookmark.interface';

@Injectable()
export class BookmarkService {
  getBookmarks(userId: number) {}

  getBookmarkById(userId: number, bookmarkId: number) {}

  createBookmark(userId: number, dto: CreateBookmarkInterface) {}

  updateBookmark(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkInterface,
  ) {}

  deleteBookmark(userId: number, bookmarkId: number) {}
}
