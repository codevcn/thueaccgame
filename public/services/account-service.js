import { axiosClient } from "/utils/axios-client.js"

export class AccountService {
  static async fetchItems() {
    const { data } = await axiosClient.get("/account/accounts")
    return data.items
  }
}
