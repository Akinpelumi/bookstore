import authRoutes from './auth';

const baseUrl = '/v1/bookstore-api';
const routes = app => {
  app.use(`${baseUrl}/auth`, authRoutes);
};

export default routes;
