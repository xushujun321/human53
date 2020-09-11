// 负责管理所有的自定义指令

// 首先定义第一个自定义指令v-imagerror
export const imageerror = {
  inserted(dom, options) {
    // 监听图片元素的error事件 出现错误时 赋值指令后面的表达式的值
    dom.onerror = function() {
      dom.src = options.value
    }
  }
}
