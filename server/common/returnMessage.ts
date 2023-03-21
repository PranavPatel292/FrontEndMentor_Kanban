export interface successMessage {
  message: string;
  data?: Object | undefined;
}

export interface errorMessage {
  message: string;
  status?: number;
}
