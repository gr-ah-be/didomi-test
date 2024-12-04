/* istanbul ignore file */

type ErrorDetails = {
  field?: string;
  value?: string;
  code?: string;
  message?: string;
};

export class DatabaseError extends Error {
  public statusCode: number;
  public errors: ErrorDetails[];

  constructor(message: string, statusCode = 500, errors: ErrorDetails[] = []) {
    super(message);
    this.name = 'DatabaseError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
