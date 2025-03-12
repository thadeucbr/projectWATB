export interface ResetContextDTO {
  phone: string;
}

export interface DeleteContextDTO {
  userId: string;
  varName: string;
  authorize: string;
}

export interface GetContextDTO {
  userId: string;
  authorize: string;
}

export interface ResetContextDTO {
  phone: string;
  authorize: string;
}