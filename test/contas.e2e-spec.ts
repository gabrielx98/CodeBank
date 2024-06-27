import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('ContasController (e2e)', () => {
    let app: INestApplication;
    let token: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();

        const userData = { username: 'testuserContas', password: 'testpassword' };
        await request(app.getHttpServer()).post('/usuarios/registrar').send(userData);
        const response = await request(app.getHttpServer()).post('/usuarios/login').send(userData);
        token = response.body.access_token;
});

    afterEach(async () => {
        await app.close();
    });

    it('/contas/cadastrar (POST) cadastro de contas', async () => {
        const conta = {
            nome: 'nome sobrenome',
            tipo: 'corrente',
            saldo: 1000,
        };

        const response = await request(app.getHttpServer())
            .post('/contas/cadastrar')
            .set('Authorization', `Bearer ${token}`)
            .send(conta);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('nome', conta.nome);
        expect(response.body).toHaveProperty('tipo', conta.tipo);
        expect(response.body).toHaveProperty('saldo', conta.saldo);
    });
});
