<template>
  <el-dialog title="分配角色" :visible="showDialog" @close="btnCanon">
    <!-- 分配角色 -->
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{
          item.name
        }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row type="flex" justify="center" align="middle" style="height:80px">
      <el-button type="primary" size="small" @click="btnOk">确定</el-button>
      <el-button size="small" @click="btnCanon">取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
// 获取角色列表
import { getRoleList } from '@/api/setting'
// 获取个人信息
import { getUserDetailById } from '@/api/user'
// 保存时的分配角色
import { assignRoles } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      list: [],
      roleIds: [],
      page: {
        page: 1,
        pagesize: 10
      }
    }
  },
  created() {
    this.getRoleList()// 获取角色列表
    // this.getUserDetailById()// 获取个人信息
  },
  methods: {
    // 取消按钮
    btnCanon() {
      // 关闭弹层
      this.$emit('update:showDialog', false)
      // 清空选项内容
      this.roleIds = []
    },
    // 获取角色列表
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      this.page.pagesize = total
      this.list = rows
    },
    // 获取个人信息
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.roleIds = roleIds // 赋值本用户的角色
      // console.log(this.roleIds)
    },
    // 点击确定按钮
    async btnOk() {
      await assignRoles({ id: this.userId, roleIds: this.roleIds })
      this.$message.success('分配成功')
      this.btnCanon()
    }
  }
}
</script>

<style>

</style>
