<template>
  <el-row type="flex" justify="space-between" style="height:40px;width: 100%" align="middle">
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="partments">
            <span>操作 <i class="el-icon-arrow-down" /></span>
            <el-dropdown-menu slot="dropdown" @command="partments">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="delete">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>

      </el-row>
    </el-col>
  </el-row>
</template>

<script>
// 引进接口
import { delDepartments } from '@/api/departments'
export default {
  props: {
    treeNode: {
      required: true, // 设置当前数据为必填
      type: Object // 类型是Object
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    partments(command) {
      if (command === 'add') {
        // 添加部门
        // 传出被点击的当前节点，才能知道要在那个节点内部进行添加子部门
        this.$emit('addDepts', this.treeNode) // 触发新增部门事件
      } else if (command === 'edit') {
        // 编辑部门
        // console.log('edit')
        this.$emit('editDepts', this.treeNode) // 触发编辑部门事件
      } else if (command === 'delete') {
        // 删除部门
        // 跳出弹出框，问是否确认删除
        this.$confirm('你确认要删除吗').then(() => {
          // 调用接口
          // 返回Promise对象
          return delDepartments(this.treeNode.id)
        }).then(() => {
          // 如果删除成功
          this.$emit('delDepts') // 触发自定义事件
          this.$message.success('删除部门成功')
        })
        // 注意：不用再写catch，因为响应式拦截已经处理了error
        // .catch(() => {
        //   console.log('你已取消删除')
        // })
      }
    }
    // addDept() {
    //   this.$emit('addDepts', this.treeNode) // 触发新增部门事件
    // }
  }
}
</script>

<style lang="less">

</style>
