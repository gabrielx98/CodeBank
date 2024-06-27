import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as path from 'path';

describe('TransacoesController (e2e)', () => {
    let app: INestApplication;
    let token: string;
    let contaId: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();

        const userData = { username: 'testuserTransacoes', password: 'testpassword' };
        await request(app.getHttpServer()).post('/usuarios/registrar').send(userData);
        const response = await request(app.getHttpServer()).post('/usuarios/login').send(userData);
        token = response.body.access_token;

        const conta = { nome: 'nome sobrenome', tipo: 'corrente', saldo: 1000 };
        const responseConta = await request(app.getHttpServer()).post('/contas/cadastrar').set('Authorization', `Bearer ${token}`).send(conta);
        contaId = responseConta.body.id;

    });

    afterEach(async () => {
        await app.close();
    });

    it('/transacoes/pagarComImagem (POST)', async () => {
        const pagamento = {
            contaId: contaId,
            valor: 10,
            data: new Date().toISOString(),
            descricao: 'despezas'
        };

        const filePath = path.join(__dirname, 'test-image.jpg');

        const response = await request(app.getHttpServer())
            .post('/transacoes/pagarComImagem')
            .set('Authorization', `Bearer ${token}`)
            .field('contaId', pagamento.contaId)
            .field('valor', pagamento.valor)
            .field('data', pagamento.data)
            .field('descricao', pagamento.descricao);
            
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('contaId', pagamento.contaId);
        expect(response.body).toHaveProperty('valor', pagamento.valor);
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('descricao', pagamento.descricao);
        expect(response.body).toHaveProperty('imageUrl');
    });

    it('/transacoes/pagar (POST)', async () => {
        const pagamento = {
            contaId: contaId,
            valor: 10,
            data: new Date().toISOString(),
            descricao: 'despezas'
        };

        const response = await request(app.getHttpServer())
            .post('/transacoes/pagarComImagem')
            .set('Authorization', `Bearer ${token}`)
            .field('contaId', pagamento.contaId)
            .field('valor', pagamento.valor)
            .field('data', pagamento.data)
            .field('descricao', pagamento.descricao);
            
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('contaId', pagamento.contaId);
        expect(response.body).toHaveProperty('valor', pagamento.valor);
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('descricao', pagamento.descricao);
        
    });
});
