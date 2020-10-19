/* eslint-disable no-unused-vars */
import express from 'express';
import 'dotenv/config';
import logger from 'morgan';
import routes from './routes/v1';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3050;
app.set('port', port);

app.get('/', (req, res) => res.status(200).json({
  status: 'Ok',
  message: 'Welcome to Bami-Bookstore'
}));

routes(app);

app.use((req, res, next) => res.status(404).json({
  status: 'Not Found',
  message: 'oooops! page not found'
}));

app.use((req, res, next) => res.status(400).json({
  status: 'Fail',
  message: 'Bad Request'
}));

app.use((err, req, res, next) => {
  res.status(500).json({
    status: 'Server failure',
    message: err.message || 'oooops! Something broke. Internal Server error'
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`port ${port} is up and jumping well`);
});

export default app;
