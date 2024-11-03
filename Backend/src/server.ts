import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import { initializeDatabase, runSeeders } from '@src/utils/dbCreateHelper';
import {sequelize as db} from '@src/config/database';

import indexRouter from '@src/routes/index';
import usersRouter from '@src/routes/UserRoutes';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// Database models sync
initializeDatabase()
  .then(() => {
    db.sync().then(() => {
      console.log('models synced successfully');
      runSeeders();
    });
  })
  .catch((err:any) => {
    console.log(err);
  });

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

export default app;
