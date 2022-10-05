import { CreateBookmarkInterface } from '../src/interfaces/create-Bookmark.interface';
import { EditUserInterface } from '../src/interfaces/editUser.interface';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { AuthInterface } from '../src/interfaces';
import { EditBookmarkInterface } from '../src/interfaces/edit-Bookmark.interface';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3000);
    prisma = app.get(PrismaService);
    await prisma.cleanAll();
    pactum.request.setBaseUrl('http://localhost:3000');
  });
  afterAll(() => app.close());

  describe('Auth', () => {
    const dto: AuthInterface = {
      email: 'mail@mail.com',
      password: '1234',
    };

    describe('Signup', () => {
      it('Sign up', () => {
        return pactum
          .spec()
          .post(`/auth/signup`)
          .withBody(dto)
          .expectStatus(201);
      });
      it('Should throw: email empty', () => {
        return pactum
          .spec()
          .post(`/auth/signup`)
          .withBody(dto.password)
          .expectStatus(400);
      });
      it('Should throw: password empty', () => {
        return pactum
          .spec()
          .post(`/auth/signup`)
          .withBody(dto.email)
          .expectStatus(400);
      });
      it('Should throw: no DTO', () => {
        return pactum.spec().post(`/auth/signup`).expectStatus(400);
      });
    });
    describe('Login', () => {
      it('Log in', () => {
        return pactum
          .spec()
          .post(`/auth/login`)
          .withBody(dto)
          .expectStatus(200)
          .stores('userToken', 'token');
      });
      it('Should throw: email empty', () => {
        return pactum
          .spec()
          .post(`/auth/login`)
          .withBody(dto.password)
          .expectStatus(400);
      });
      it('Should throw: password empty', () => {
        return pactum
          .spec()
          .post(`/auth/login`)
          .withBody(dto.email)
          .expectStatus(400);
      });
      it('Should throw: no DTO', () => {
        return pactum.spec().post(`/auth/login`).expectStatus(400);
      });
    });
  });

  describe('User', () => {
    it('Should return current user', () => {
      return pactum
        .spec()
        .get('/users/me')
        .withHeaders({
          Authorization: 'Bearer $S{userToken}',
        })
        .expectStatus(200);
    });

    it('Should edit current user', () => {
      const dto: EditUserInterface = {
        firstName: 'Amit',
        lastName: 'Bar-gil',
      };
      return pactum
        .spec()
        .patch('/users')
        .withHeaders({
          Authorization: 'Bearer $S{userToken}',
        })
        .withBody(dto)
        .expectStatus(200);
    });
  });

  describe('Bookmark', () => {
    it('Should return empty bookmarks array', () => {
      return pactum
        .spec()
        .get('/bookmarks')
        .withHeaders({
          Authorization: 'Bearer $S{userToken}',
        })
        .expectStatus(200)
        .expectBody([]);
    });

    it('Create bookmark', () => {
      const dto: CreateBookmarkInterface = {
        title: 'First bookmark',
        link: 'http://link.com',
      };
      return pactum
        .spec()
        .post('/bookmarks')
        .withHeaders({
          Authorization: 'Bearer $S{userToken}',
        })
        .withBody(dto)
        .expectStatus(201)
        .stores('bookmarkId', 'id');
    });
    it('Get bookmarks', () => {
      return pactum
        .spec()
        .get('/bookmarks')
        .withHeaders({
          Authorization: 'Bearer $S{userToken}',
        })
        .expectStatus(200);
    });
    it('Get bookmark by id', () => {
      return pactum
        .spec()
        .get('/bookmarks/{id}')
        .withHeaders({
          Authorization: 'Bearer $S{userToken}',
        })
        .withPathParams('id', '$S{bookmarkId}')
        .expectStatus(200)
        .expectBodyContains('$S{bookmarkId}');
    });
    it('Edit bookmark', () => {
      const dto: EditBookmarkInterface = {
        about: 'This is an edited version',
      };
      return pactum
        .spec()
        .patch('/bookmarks/{id}')
        .withPathParams('id', '$S{bookmarkId}')
        .withBody(dto)
        .withHeaders({
          Authorization: 'Bearer $S{userToken}',
        })
        .expectStatus(200);
    });
    it('Delete bookmark', () => {
      return pactum
        .spec()
        .delete('/bookmarks/{id}')
        .withPathParams('id', '$S{bookmarkId}')
        .withHeaders({
          Authorization: 'Bearer $S{userToken}',
        })
        .expectStatus(204);
    });
    it('Should return empty bookmarks array', () => {
      return pactum
        .spec()
        .get('/bookmarks')
        .withHeaders({
          Authorization: 'Bearer $S{userToken}',
        })
        .expectStatus(200)
        .expectBody([]);
    });
  });
});
