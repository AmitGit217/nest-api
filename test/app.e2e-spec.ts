import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { AuthInterface } from '../src/interfaces';

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
    });
    describe('Login', () => {
      it('Log in', () => {
        return pactum
          .spec()
          .post(`/auth/login`)
          .withBody(dto)
          .expectStatus(200);
      });
    });
  });

  describe('User', () => {
    describe('Get current', () => {});
    describe('Edit current', () => {});
  });

  describe('Bookmark', () => {
    describe('Create bookmarks', () => {});
    describe('Get bookmark', () => {});
    describe('Get bookmark by id', () => {});
    describe('Edit bookmark', () => {});
    describe('Delete bookmark', () => {});
  });
});
