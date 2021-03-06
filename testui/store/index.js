import Vuex from 'vuex'
import axios from '~/plugins/axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      version: '1.0.0'
    },
    mutations: {
      newVersion(state, version) {
        state.version = version
      }
    },
    actions: {
      foo() {
        return axios.get('/api/stdcvt');
      }
    }
  })
}

export default createStore
