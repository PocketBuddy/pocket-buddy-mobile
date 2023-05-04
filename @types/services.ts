export enum ResponseStatus {
  Success = 'Success',
  Error = 'Error',
}

export type BaseResponse = {
  status: ResponseStatus;
  data: null;
  meta: null;
  message: string;
  errors?: Record<string, string[]> | null;
};

export type BaseResponseWithAuth = BaseResponse | { message: string };
