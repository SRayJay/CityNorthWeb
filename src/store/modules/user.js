import Vue from 'vue'
import { login, register } from '@/api/user'
import { getToken, setToken, removeToken, getUserInfo, setUserInfo, removeUserInfo } from '@/utils/auth'
// import { resetRouter } from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: getUserInfo()
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  REMOVE_TOKEN: (state, token) => {
    removeToken()
    removeUserInfo()
    Object.assign(state, getDefaultState())
  },
  SET_USERINFO: (state, data) => {
    state.userInfo = data
    // removeUserInfo()
    setUserInfo(data)
  },
  UPDATE_USERINFO: (state, data) => {
    Vue.set(state.userInfo, 'userPhoto', data.userPhoto)
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { login_username, login_password } = userInfo
    return new Promise((resolve, reject) => {
      login(login_username, login_password)
        .then(response => {
          const { data } = response
          console.log(response)
          if (data.message === 400) {
            reject(400)
          } else if (data.message === 200) {
            commit('SET_TOKEN', data.token)
            commit('SET_USERINFO', data.user)
            setToken(data.token)
            setUserInfo(data.user)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
    })
  },
  register({ commit }, userInfo) {
    const { register_username, register_password } = userInfo
    return new Promise((resolve, reject) => {
      register(register_username, register_password).then(response => {
        const { data } = response
        console.log(response)
        console.log(data.message === 400)
        if (data.message === 400) {
          reject(400)
        } else if (data.message === 200) {
          commit('SET_TOKEN', data.token)
          commit('SET_USERINFO', data.user)
          setToken(data.token)
          setUserInfo(data.user)
        }

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
  // logout({ commit, state }) {
  //   removeToken()
  //   // resetRouter()
  //   console.log(this.$store.state.user.token)
  //   commit('RESET_STATE')
  // },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
