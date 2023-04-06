import { defineStore } from 'pinia'
 
const apiUrl = import.meta.env.VITE_API_BASE_URL + '/users'

interface Geo {
  lat: string
  lng: string
}
interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}
interface Company {
  name: string
  catchPhrase: string
  bs: string
}
export interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

interface State {
  userList: User[]
  isLoading: boolean
  hasUserListFetched: boolean
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    userList: [],
    isLoading: false,
    hasUserListFetched: false
  }),
  getters: {
    getUserListCount: (state) => state.userList.length,
    getUserById: (state) => {
      return (userId: number) => state.userList.find((user) => user.id === userId)
    }
  },
  actions: {
    async fetchUserList() {
      if (this.hasUserListFetched) return
      this.isLoading = true
      try {
        const result = await fetch(apiUrl)
        const data = await result.json()
        this.userList = data
        this.hasUserListFetched = true
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    }
  }
})
