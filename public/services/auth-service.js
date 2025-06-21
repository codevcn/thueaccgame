import { axiosClient } from "/utils/axios-client.js"

export class AuthService {
  static async login(username, password) {
    const { data } = await axiosClient.post("/auth/login", { username, password })
    return data
  }
}
