<template>
  <div id="app">
    <button @click="open">点击打开</button>
    <p>输入内容为：{{name}}</p>
    <p>接收返回参数为：{{res.a}}</p>
    <wc-dialog id="js-wc-dialog" :visible="visible" @close="close" ref="dialog">
      <div slot="content">
        <input type="text" v-model="name" />
        <div class="st">
          用户须知
        </div>
        <button @click="closeDialog">取消</button>
      </div>
    </wc-dialog>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      name: '你好',
      visible: false,
      res: {}
    }
  },
  methods: {
    open() {
      this.visible = true
    },
    close({detail}) {
      this.res = detail
      this.visible = false
    },
    closeDialog() {
      this.visible = false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
