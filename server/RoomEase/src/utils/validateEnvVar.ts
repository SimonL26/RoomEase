import { cleanEnv, port, str } from "envalid";

const validateEnv = () => {
  cleanEnv(process.env, {
    PGHOST: str(),
    PGPORT: port(),
    PGUSER: str(),
    PGPASSWORD: str(),

    COOKIE_SECRET: str(),

    JWT_SECRET: str(),

    EMAIL_USER: str(),
    EMAIL_PASS: str(),
    EMAIL_HOST: str(),
    EMAIL_PORT: port(),
  });
};

export default validateEnv;
