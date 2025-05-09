import axios from "axios";

export const baseURL = "http://192.168.200.46:4000/api";
// export const baseURL = "http://192.168.200.177:4000/api";

export const login = async (data: any) => {
  try {
    const res = await axios.post(`${baseURL}/auth/login`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const forgotPassword = async (data: any) => {
  try {
    const res = await axios.post(`${baseURL}/auth/password/forgot`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const forgotPasswordOtpVerify = async (data: any) => {
  try {
    const res = await axios.post(`${baseURL}/auth/password/verify-otp`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const forgotPasswordResetPassword = async (data: any) => {
  try {
    const res = await axios.post(`${baseURL}/auth/password/reset`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

// get  profile
export const getUserProfile = async (token: string) => {
  try {
    const res = await axios.get(`${baseURL}/admin/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// update  profile
export const updateUserProfile = async (data: any, token: string) => {
  try {
    const res = await axios.patch(`${baseURL}/admin/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
