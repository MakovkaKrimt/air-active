import $api from "../api";

export default class AuthAxiosQueries {
  static registration = async (data) => {
    return (await $api.post("/api/users/registration", data)).data;
  };

  static login = async (data) => {
    return (await $api.post("/api/users/login", data)).data;
  };

  static logout = async (data) => {
    await $api.post("/api/users/logout");
  };

  static requestResetPwd = async (data) => {
    await $api.post("/api/users/forgot-password", data);
  };
  static resetPwd = async (data) => {
    await $api.post(`/api/users/reset-password`, data);
  };

  static checkEmailExists = async (email) => {
    return (await $api.get(`/api/users/email-exists/${email}`)).data;
  };
}
