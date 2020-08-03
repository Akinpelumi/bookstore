/* eslint-disable no-unused-vars */
import express from 'express';
import 'dotenv/config';
import logger from 'morgan';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3050;
app.set('port', port);

app.get('/', (req, res) => res.status(200).json({
  status: 'Success',
  message: 'Welcome to Bami-Bookstore'
}));

app.use((req, res, next) => res.status(404).json({
  status: 'Fail',
  message: 'oooops! page not found'
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
