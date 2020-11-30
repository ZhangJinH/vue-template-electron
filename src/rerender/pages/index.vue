<template>
  <div class="test">
    <div>vvv</div>
    <img src="@/deps/assets/test.png" alt="">
    <router-link :to="{path: '/home'}" tag="button">to home</router-link>
  </div>
</template>
<script>
export default {
  name: 'test',
  data () {
    return {
    }
  },
  created () {
    console.log(222)
  },
  mounted () {
  },
  methods: {
  },
  components: {
  },
  props: {
  }
}
</script>
<style>
</style>