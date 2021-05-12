import { CustomError } from './custom-error'

export class BadRequestError extends CustomError {
  statusCode = 401
  constructor(public message: string) {
    super(message)

    Object.setPrototypeOf(this, BadRequestError.prototype)
  }
  serializeErrors() {
    return [{ message: this.message }]
  }
}
