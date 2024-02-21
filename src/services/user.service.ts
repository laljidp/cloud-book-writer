import { UserPayloadT, UserT } from "../types/user.type";
import { BASE_URL } from "../constants";
import { Fetcher } from "swr";

export const registerNewUser = async (payload: UserPayloadT) => {
  try {
    const resp = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await resp.json();
    return { success: true, data };
  } catch (err) {
    console.log("ERROR calling APIs to save user::", err);
    return { success: false };
  }
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    const resp = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await resp.json();
    if (!data.accessToken) {
      return { success: false, data: null };
    }
    return { success: true, data };
  } catch (err) {
    console.log("ERROR logging user::", err);
    return { success: false, data: null };
  }
};

export const fetchUsers: Fetcher<UserT[]> = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/users`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await resp.json();
    return data || [];
  } catch (err) {
    console.log("ERROR requesting /GET users::", err);
    return [];
  }
};
