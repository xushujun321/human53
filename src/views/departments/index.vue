<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构 -->
      <el-card class="tree-card">
        <!-- 企业标题部分 -->
        <TreeTools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <!-- 放置树形结构体 -->
        <el-tree :data="departs" :props="defaultProps" node-key="id" default-expand-all>
          <!-- 下面才有删除功能，之所以在这里直接调用获取数据，起更新作用 -->
          <TreeTools slot-scope="obj" :tree-node="obj.data" @delDepts="getDepartments" @addDepts="addDepts" @editDepts="editDepts" />
        </el-tree>
      </el-card>
    </div>
    <!-- 引入新增部门组件 -->
    <add-dept ref="getDepart" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { getDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils'
import AddDept from './components/add-dept' // 引入新增部门组件
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      departs: [],
      company: {}, // 公司数据
      defaultProps: {
        label: 'name' // 设置显示文本的字段名称
        // 注意：之所以没有children，是因为获取的数据的子级就是children，与参数名一样，可以不用写
      },
      showDialog: false, // 显示窗体
      node: null
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    // 获去数据
    async getDepartments() {
      const result = await getDepartments()
      this.departs = transListToTreeData(result.depts, '')
      // console.log(this.departs)
      // id之所以给空字符串，因为是根，他的子部门pid全是空字符串
      this.company = { name: result.companyName, manager: '负责人', id: '' }
    },
    // node为操作的节点
    addDepts(node) {
      // 首先打开弹层
      this.showDialog = true
      // node接受的是子组件传递过来的被点击的节点内容{name等}对象，
      // 父组件接受后，传递给弹出框子组件
      this.node = node // 赋值操作的节点
    },
    // 编辑操作的节点
    editDepts(node) {
      // 打来弹层
      this.showDialog = true
      // 传递node
      this.node = node
      // 使用方法，进行获取部门详情
      this.$refs.getDepart.getDepartDetail(node.id)
    }
  }
}
</script>

<style>

</style>
