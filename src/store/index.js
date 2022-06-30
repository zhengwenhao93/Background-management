import { createStore } from 'vuex'
import user from '../store/modules/user'
import getters from './getters'
export default createStore({
  getters,
  modules: {
    user
  }
})
