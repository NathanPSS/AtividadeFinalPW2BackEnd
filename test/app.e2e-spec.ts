import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';



describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    
    await app.init();

    const app2 = await import('../src/main')
    const request = require('supertest')
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  describe('Testes de Modulos de Usuarios',() =>{
    it('Deve criar um usuario',() => {
     return request(app.getHttpServer())
       .post('/user')
       .send({
        email:'test@gmail.com',
        telefone: '0839123-12234',
        password: '123456',
        endereco: 'Rua do Teste',
        nome: 'Teste'
      }).expect(201)
    })
  })
  afterAll(() =>{
    app.close()
  })
});
