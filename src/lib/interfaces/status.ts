export enum PROMISE_STATUSES {
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

export enum HTTP_CODES {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

export enum HTTP_STATUS {
  SUCCESS = 'success',
  FAILED = 'failed',
}

export enum HTTP_MESSAGES {
  INVALID_API_KEY = 'Invalid API key',
  AUTHORIZATION_FAILED = 'Failed to authorize endpoint',
  MESSAGE_OK = 'OK',
}

export interface VerificationErrorModel {
  [key: string]: string;
}
