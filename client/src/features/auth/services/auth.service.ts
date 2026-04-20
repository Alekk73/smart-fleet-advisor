import AxiosIntance from "../../../api/axios";

interface ILoginCredentials {
  email: string;
  password: string;
}

interface IRegisterCredentials extends ILoginCredentials {
  name: string;
  lastname: string;
}

export const getCurrentUser = async () => {
  const res = await AxiosIntance.get("auth/me");
  return res.data;
};

export const loginService = async (credentials: ILoginCredentials) => {
  const res = await AxiosIntance.post(`auth/login`, credentials);
  const token = res.data.accessToken;

  if (token) localStorage.setItem("token", token);

  return await getCurrentUser();
};

export const registerService = async (credentials: IRegisterCredentials) => {
  await AxiosIntance.post("auth/register", credentials);
};
