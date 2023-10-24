export {};

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export interface UserPayload {
  id: number;
  email: string;
  role: string;
}
