import UserApi from '../../api/user'
import { setItem, getItem } from '../../utils/storage'
export default {
  namespaced: true,
  state: () => ({
    token: getItem('token') || ''
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    }
  },
  actions: {
    async login({ commit }, payload) {
      try {
        const response = await UserApi.login(payload)
        commit('setToken', response.token)
        return response
      } catch (err) {
        console.log(err)
      }
    }
  }
}
