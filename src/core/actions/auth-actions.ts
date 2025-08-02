import { pulseStreamApp } from "../api/pulseStreamApi";

export interface AuthResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}

const returnUserToken = (
  data: AuthResponse
): {
  token: string;
} => {
  // const { id, email, fullName, isActive, roles, token } = data;
  const { token } = data;

  // const user: User = {
  //   id,
  //   email,
  //   fullName,
  //   isActive,
  //   roles,
  // };

  return {
    token,
  };
};

export const authLogin = async (email: string, password: string) => {
  email = email.toLowerCase();

  const { data } = await pulseStreamApp.post<AuthResponse>("/auth/login", {
    email,
    password,
  });

  return returnUserToken(data);
};

export const authRegister = async ({
  name,
  lastName,
  email,
  password,
  confirmPassword,
}: {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  email = email.toLowerCase();

  const { data } = await pulseStreamApp.post<AuthResponse>("/auth/register", {
    name,
    lastName,
    email,
    password,
    confirmPassword,
  });

  return returnUserToken(data);
};

export const authCheckStatus = async () => {
  try {
    const { data } = await pulseStreamApp.get<AuthResponse>(
      "/auth/check-status"
    );

    return returnUserToken(data);
  } catch (error) {
    return null;
  }
};
