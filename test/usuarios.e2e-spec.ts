import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UsuariosController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    it('/usuarios/cadastrar (POST)', async () => {
        const usuario = {
            username: 'usuario',
            password: 'senha',
        };

        const response = await request(app.getHttpServer())
            .post('/usuarios/cadastrar')
            .send(usuario);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('username', usuario.username)
        expect(response.body).toHaveProperty('password', usuario.password)
        expect(response.body).toHaveProperty('passwordHashed');
    });

    it('/usuarios/login (POST) ', async () => {
        const usuario = {
            username: 'usuario',
            password: 'senhas',
        };

        const response = await request(app.getHttpServer())
            .post('/usuarios/login')
            .send(usuario);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('access_token');
    });
});
