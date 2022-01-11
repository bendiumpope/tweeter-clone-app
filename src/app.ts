import { HttpError } from 'http-errors';
import AppError from "./utils/http-error";
import express, {Request, Response, NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import authLimiter from './middlewares/rateLimiter';
import routes from './routes/indexRoutes'

const app = express();

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use("/api/v1", authLimiter);

app.use('/api/v1', routes)


// catch 404 and forward to error handler
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError(
    `Cant find ${req.originalUrl} on this server!`,
    404
  );

  throw error;
});

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.code || 500).json({
    message: error.message || "An unknown error occured",
  });
});

module.exports = app;
