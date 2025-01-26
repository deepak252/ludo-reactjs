class ApiResponse<T> {
  code: number
  message: string
  data?: T

  constructor(message = 'Success', data?: T, code = 200) {
    this.code = code
    this.message = message
    this.data = data
  }
}

class ResponseSuccess<T> extends ApiResponse<T> {
  constructor(message = 'Success', data?: T, code = 200) {
    super(message, data, code)
  }
}

class ResponseFailure<T> extends ApiResponse<T> {
  stack?: string
  constructor(message = 'Error', code = 400, stack?: string) {
    super(message, undefined, code)
    this.stack = stack
  }
}

export { ApiResponse, ResponseSuccess, ResponseFailure }
