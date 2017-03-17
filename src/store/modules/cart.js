import shop from '../../api/shop'
import * as types from '../mutation-types'

const state = {
  added: [],
  checkoutStatus: null
}

const getters = {
  checkoutStatus: state => state.checkoutStatus
}

const actions = {
  checkout ({ commit, state }, products) {
    console.log(products)
    const savedCartItems = [...state.added]
    commit(types.CHECKOUT_REQUEST)
    shop.buyProducts(
      products,
      () => commit(types.CHECKOUT_SUCCESS),
      () => commit(types.CHECKOUT_FAILURE, { savedCartItems })
    )
  }
}

const mutations = {
  [types.ADD_TO_CART] (state, { id }) {
    const record = state.added.find(p => p.id === id)
    if (!record) {
      state.added.push({
        id,
        quantity: 1
      })
    } else {
      record.quantity++
    }
    // console.log(state.added)
  },
  [types.CHECKOUT_REQUEST] (state) {
    // clear cart
    state.added = []
    state.checkoutStatus = null
  },
  [types.CHECKOUT_SUCCESS] (state) {
    state.checkoutStatus = 'successful'
  },
  [types.CHECKOUT_FAILURE] (state, { savedCartItems }) {
    state.added = savedCartItems
    state.checkoutStatus = 'failed'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
