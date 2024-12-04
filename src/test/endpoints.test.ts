import request from 'supertest';
import { buildApplication } from '../app';
import { logger } from '../config/logger';
import { type Express } from 'express';
import { initSequelize } from '../database/sequelize-instance-manager';
import { initializeModels } from '../models';
import * as http from 'http';
import { Sequelize } from 'sequelize-typescript';
import { destroy, setup } from './database-test';

let app: Express;
let sequelize: Sequelize;
let server: http.Server;

describe('Endpoints', () => {
  beforeAll(async () => {
    sequelize = await setup();
    app = buildApplication(logger);
    server = await app.listen(process.env.PORT || 3002);
  });

  // Close the database connection after all tests
  afterAll(async () => {
    await sequelize.close();
    await server.close();
  });

  afterEach(async () => {
    await sequelize.truncate({ cascade: true });
  });

  describe('POST /events', () => {
    it('should create a new event', async () => {
      const userCreationResponse = await request(app)
        .post('/users')
        .send({
          email: 'test@example.com',
        })
        .expect(201);

      const response = await request(app)
        .post('/events')
        .send({
          userId: userCreationResponse.body.id,
          consentId: 'email_notifications',
          enabled: true,
        })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty(
        'userId',
        userCreationResponse.body.id,
      );
      expect(response.body).toHaveProperty('consentId', 'email_notifications');
      expect(response.body).toHaveProperty('enabled', true);
    });

    it('should return an error if userId does not exist', async () => {
      await request(app)
        .post('/events')
        .send({
          userId: 9999, // Assuming this ID does not exist
          consentId: 'email_notifications',
          enabled: true,
        })
        .expect(422);
    });

    it('should return 400 if request body is invalid', async () => {
      await request(app)
        .post('/events')
        .send({
          userId: 'invalid',
          consentId: 'invalid',
          enabled: 'invalid',
        })
        .expect(400);
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          email: 'test@example.com',
        })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('email', 'test@example.com');
    });

    it('should return 400 if request body is invalid', async () => {
      await request(app)
        .post('/users')
        .send({
          email: 'invalid',
        })
        .expect(400);
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user by ID', async () => {
      const createUserResponse = await request(app)
        .post('/users')
        .send({
          email: 'test@example.com',
        })
        .expect(201);

      const userId = createUserResponse.body.id;

      const response = await request(app).get(`/users/${userId}`).expect(200);

      expect(response.body).toHaveProperty('id', userId);
      expect(response.body).toHaveProperty('email', 'test@example.com');
    });

    it('should return 404 if user is not found', async () => {
      await request(app).get('/users/999').expect(404);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user by ID', async () => {
      const createUserResponse = await request(app)
        .post('/users')
        .send({
          email: 'test@example.com',
        })
        .expect(201);

      const userId = createUserResponse.body.id;

      await request(app).delete(`/users/${userId}`).expect(204);

      await request(app).get(`/users/${userId}`).expect(404);
    });

    it('should return 404 if user is not found', async () => {
      await request(app).delete('/users/999').expect(404);
    });
  });
});
