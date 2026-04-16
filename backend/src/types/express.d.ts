declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HASH_SALT: number;
    }
  }
}
