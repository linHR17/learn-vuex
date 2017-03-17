import shop from '../../api/shop'
import * as types from '../mutation-types'

const state = {
  all: []
}

const getters = {
  allProducts: state => state.all
}

const actions = {
  getAllProducts ({commit}) {
    shop.getProducts((products) => {
      commit(types.RECEIVE_PRODUCTS, { products })
    })
  }
}

const mutations = {
  [types.RECEIVE_PRODUCTS] (state, { products }) {
    state.all = products
    // console.log(state.all)
  },
  [types.ADD_TO_CART] (state, p) {
    state.all.find(item => {
      return item.id === p.id
    }).inventory--
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
