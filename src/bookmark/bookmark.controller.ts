import { User } from '@prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator/getUser.decorator';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkInterface } from '../interfaces/create-Bookmark.interface';
import { EditBookmarkInterface } from '../interfaces/edit-Bookmark.interface';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Get()
  getBookmarks(@GetUser() user: User) {
    return this.bookmarkService.getBookmarks(user.id);
  }

  @Get(':id')
  getBookmarkById(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.getBookmarkById(user.id, bookmarkId);
  }

  @Post()
  createBookmark(@GetUser() user: User, @Body() dto: CreateBookmarkInterface) {
    return this.bookmarkService.createBookmark(user.id, dto);
  }

  @Patch(':id')
  updateBookmark(
    @GetUser() user: User,
    bookmarkId: number,
    @Body() dto: EditBookmarkInterface,
  ) {
    return this.bookmarkService.updateBookmark(user.id, bookmarkId, dto);
  }

  @Delete(':id')
  deleteBookmark(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.deleteBookmark(user.id, bookmarkId);
  }
}
