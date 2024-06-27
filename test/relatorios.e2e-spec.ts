import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('RelatoriosController (e2e)', () => {
    let app: INestApplication;
    let token: string;
    let contaId: string;
    const dataInicial = '2024-01-01T14:30:00.000Z';
    
    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();

        const userData = { username: 'testuserRelatorios', password: 'testpassword' };
        await request(app.getHttpServer()).post('/usuarios/registrar').send(userData);
        const response = await request(app.getHttpServer()).post('/usuarios/login').send(userData);
        token = response.body.access_token;

        const conta = { nome: 'nome sobrenome', tipo: 'corrente', saldo: 1000 };
        const responseConta = await request(app.getHttpServer()).post('/contas/cadastrar').set('Authorization', `Bearer ${token}`).send(conta);
        contaId = responseConta.body.id;

        await request(app.getHttpServer())
            .post('/transacoes/pagarComImagem')
            .set('Authorization', `Bearer ${token}`)
            .field('contaId', contaId)
            .field('valor', 10)
            .field('data', new Date().toISOString())
            .field('descricao', 'despezas');
    });

    afterEach(async () => {
        await app.close();
    });

    it('/relatorios/transacoesByQuery (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get(`/relatorios/transacoesByQuery`)
            .set('Authorization', `Bearer ${token}`)
            .field('contaId', contaId)
            .field('dataFinal', dataInicial)
            .field('dataInicial', new Date().toISOString())
            ;

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('pagamentos');
        expect(response.body).toHaveProperty('total');
    });

    it('/relatorios/transacoesByBody (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get(`/relatorios/transacoesByQuery`)
            .set('Authorization', `Bearer ${token}`)
            .field('contaId', contaId)
            .field('dataFinal', dataInicial)
            .field('dataInicial', new Date().toISOString())
            ;

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('pagamentos');
        expect(response.body).toHaveProperty('total');
    });
});
