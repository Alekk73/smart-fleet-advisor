import AxiosIntance from "../../../api/axios";

interface ILoginCredentials {
  email: string;
  password: string;
}

interface IRegisterCredentials extends ILoginCredentials {
  name: string;
  lastname: string;
}

export const LoginService = async (credentials: ILoginCredentials) => {
  const res = await AxiosIntance.post(`auth/login`, credentials);
  const token = res.data.accessToken;

  if (token) localStorage.setItem("token", token);
};

export const RegisterService = async (credentials: IRegisterCredentials) => {
  await AxiosIntance.post("auth/register", credentials);
};
