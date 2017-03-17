<template lang="html">
  <div class="">
    <ul>
      <li v-for="p in products">
        {{ p.title }} - {{ p.price | currency }}
        <br>
        <button
          :disabled="!p.inventory"
          @click="addToCart(p)">
          Add to cart
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      list: []
    }
  },
  computed: {
    // products () {
    //   return this.$store.state.products.all
    // },
    ...mapState({
      products: state => state.products.all
    }),
    ...mapGetters({
    })
  },
  methods: {
    ...mapActions([
      'addToCart'
    ])
  },
  created () {
    this.$store.dispatch('getAllProducts')
  }
}
</script>

<style lang="css">
</style>
