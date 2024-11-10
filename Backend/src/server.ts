import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import { initializeDatabase, runSeeders } from '@src/utils/dbCreateHelper';
import {sequelize as db} from '@src/config/database';

import indexRouter from '@src/routes/index';
import usersRouter from '@src/routes/UserRoutes';
import approvalRouter from '@src/routes/ApprovalRoutes';
import departmentRouter from '@src/routes/DepartmentRoutes';
import clearanceRequestRouter from '@src/routes/ClearanceRequestRoutes';

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
app.use('/approvals', approvalRouter);
app.use('/departments', departmentRouter);
app.use('/clearance', clearanceRequestRouter);

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

// Error handling middleware
app.use((err: any, _: Request, res: Response, __: NextFunction) => {
  // Log the error to the console
  console.error(err);

  // Send the error response
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  });
});

export default app;
