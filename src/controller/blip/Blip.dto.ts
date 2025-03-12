export interface ResetContextDTO {
  phone: string;
}

export interface DeleteContextDTO {
  userId: string;
  varName: string;
  authorize: string;
  router?: string;
}

export interface GetContextDTO {
  userId: string;
  authorize: string;
  router?: string;
}

export interface ResetContextDTO {
  phone: string;
  authorize: string;
  router?: string;
}