<template>
  <div>
    <svg-icon icon-class="fullscreen" style="color:#fff; width:20px; height:20px" @click="changeScreen" />
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  methods: {
    changeScreen() {
      if (!screenfull.isEnabled) {
        this.$message.warning('此时不能全屏')
        return
      }
      screenfull.toggle()// 不断进行全屏方法
    }
  }

}
</script>

<style>

</style>
