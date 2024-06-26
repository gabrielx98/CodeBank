import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('RelatoriosController (e2e)', () => {
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

    it('/relatorios/transacoesByQuery (GET)', async () => {
        const contaId = 'test_account_id';
        const dataInicial = '2024-01-01';
        const dataFinal = '2024-12-31';

        const response = await request(app.getHttpServer())
            .get(`/relatorios/transacoesByQuery`)
            .field('contaId',contaId)
            .field('dataInicial',dataInicial)
            .field('dataFinal',dataFinal)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('pagamentos');
        expect(response.body).toHaveProperty('total');
    });

    it('/relatorios/transacoesByBody (GET)', async () => {
        const contaId = 'test_account_id';
        const dataInicial = '2024-01-01';
        const dataFinal = '2024-12-31';

        const response = await request(app.getHttpServer())
            .get(`/relatorios/transacoesByQuery`)
            .field('contaId', contaId)
            .field('dataInicial', dataInicial)
            .field('dataFinal', dataFinal)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('pagamentos');
        expect(response.body).toHaveProperty('total');
    });
});
