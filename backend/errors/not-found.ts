import {StatusCodes} from 'http-status-codes'
import CustomAPIError from './custom-api'

class NotFoundError extends CustomAPIError {
  statusCode: StatusCodes;
  constructor(message: string | undefined) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export = NotFoundError;