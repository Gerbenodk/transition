import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      page: 'index',
      indexedUser: 0,
      users: [
        {
          name: 'Ben Allen',
          img: '/profile3.jpg',
          location: 'Eindhoven',
        },
        {
          name: 'Jill Fernandez',
          img: '/profile4.jpg',
          location: 'Eindhoven',
        },
        {
          name: 'Cynthia Obel',
          img: '/profile5.jpg',
          location: 'Eindhoven',
        },
        {
          name: 'Thomas Gonzalez',
          img: '/profile2.jpg',
          location: 'Eindhoven',
        },
      ]
    },
    getters: {
      selectedUser: state => {
        return state.users[state.indexedUser]
      }
    },
    mutations: {
      updatePage(state, pageName) {
        state.page = pageName
      },
      // addFollower(state) {
      //   state.users[state.indexedUser].followers++
      // },
      // removeFollower(state) {
      //   state.users[state.indexedUser].followers--
      // },
      changeUser(state, i) {
        state.indexedUser = i
      }
    }
  })
}

export default createStore
