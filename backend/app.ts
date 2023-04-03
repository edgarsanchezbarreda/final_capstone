import express from 'express';
import cors from 'cors';
import { NotFoundError } from './errors/expressError';
import { authenticateJWT } from './middleware/auth';

import morgan from 'morgan';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(authenticateJWT);

app.use(function (req, res, next) {
    return next(new NotFoundError());
});

app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== 'test') console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

module.exports = app;
