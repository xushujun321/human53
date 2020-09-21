<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template slot="after">
          <!-- 往根上添加根元素，此时type为1，pid为0是固定的addPermission(1, 0) -->
          <el-button type="primary" @click="addPermission(1, '0')">添加权限模块</el-button>
        </template>
      </page-tools>
      <el-card>
        <!-- 放置权限列表 -->
        <el-table :data="list" row-key="id">
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="code" label="标识" />
          <el-table-column prop="description" label="描述" />
          <el-table-column label="操作">
            <template slot-scope="obj">
              <!-- 只有两级 没有第三级  所在在这里控制添加的按钮，此时二级的type=2，是固定的，二级的pid等于根的id，所以传id -->
              <el-button v-if="obj.row.type === 1" type="text" size="small" @click="addPermission(2, obj.row.id)">添加</el-button>
              <el-button type="text" size="small" @click="editPermission( obj.row.id)">编辑</el-button>
              <el-button type="text" size="small" @click="delPermission(obj.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 放置一个弹层 用来编辑新增节点 -->
      <el-dialog :title="`${showTxt}权限`" :visible="showDialog" @close="btnCancel">
        <!-- 放置表单 -->
        <el-form ref="addPerm" label-width="120px" :model="formData" :rules="rules">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" autocomplete="off" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" autocomplete="off" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" autocomplete="off" style="width:90%" />
          </el-form-item>
          <el-form-item label="开启">
            <!-- 开关组件，可以利用active-value与inactive-value来设置开关代表的值 -->
            <el-switch v-model="formData.enVisible" active-value="1" inactive-value="0" />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button type="primary" @click="btnOK">确定</el-button>
            <el-button @click="btnCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { updatePermission, addPermission, getPermissionDetail, delPermission, getPermissionList } from '@/api/permission'
import { transListToTreeData } from '@/utils'
export default {
  data() {
    return {
      list: [],
      formData: {
        name: '',
        code: '',
        description: '',
        type: '',
        pid: '',
        enVisible: ''// 默认关闭
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      },
      showDialog: false // 显示弹层

    }
  },
  computed: {
    showTxt() {
      return this.formData.id ? '编辑' : '新增'
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    // 获取数据
    async  getPermissionList() {
      this.list = transListToTreeData(await getPermissionList(), '0')
    },
    addPermission(type, id) {
      this.showDialog = true
      this.formData.type = type // 添加的类型，可以知道往哪个节点加
      this.formData.pid = id // 设置增加的权限点id，往根上填，pid为0
    },
    async  btnOK() {
      try {
        await this.$refs.addPerm.validate() // 重置字段
        this.formData.id ? await updatePermission(this.formData) : await addPermission(this.formData)
        this.$message.success('操作成功')
        this.getPermissionList() // 重新拉取数据
        this.btnCancel()
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      this.showDialog = false
      this.formData = {
        name: '',
        code: '',
        description: '',
        type: '',
        pid: '',
        enVisible: '0'
      }
      this.$refs.addPerm.resetFields() // 重置字段
    },
    // 编辑时获取数据
    async editPermission(id) {
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    },
    // 删除
    async delPermission(id) {
      this.$confirm('确定删除该权限点吗').then(async() => {
        await delPermission(id)
        this.$message.success('删除权限成功')
        this.getPermissionList() // 重新拉取数据
      })
    }
  }
}
</script>

<style>

</style>
