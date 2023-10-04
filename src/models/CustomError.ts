import { ValidationError } from "express-validator";

export interface ICustomError {
  message: string;
  statusCode: number;
  errors?: ValidationError[];
}

export class CustomError extends Error {
  msg: string;
  statusCode: number;
  errors?: ValidationError[];

  constructor(props: ICustomError) {
    const { message, statusCode, errors } = props;
    super(message);
    this.msg = message;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
