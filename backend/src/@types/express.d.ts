import { IJwtPayload } from '../common/jwt-payload.interface';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HASH_SALT: number;
    }
  }

  namespace Express {
    interface Request {
      user: IJwtPayload;
    }
  }
}
