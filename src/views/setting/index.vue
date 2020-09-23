<template>
  <el-card>
    <el-tabs>
      <el-tab-pane label="角色管理">
        <el-row style="height: 60px">
          <el-button type="primary" size="small" @click="addRole">新增角色</el-button>
        </el-row>
        <!-- 角色列表 -->
        <el-table v-loading="loading" :data="list" border="">
          <el-table-column align="center" header-align="center" label="序号" width="80" type="index" />
          <el-table-column align="center" header-align="center" prop="name" label="角色名称" width="240" />
          <el-table-column header-align="center" prop="description" label="描述" />
          <el-table-column align="center" header-align="center" label="操作">
            <template slot-scope="{ row }">
              <el-button type="primary" size="small" @click="assignPermission(row.id)">分配权限</el-button>
              <el-button size="small" @click="updateRole(row.id)">编辑</el-button>
              <el-button type="danger" size="small" @click="deleteRole(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" style="height:60px" align="middle">
          <!-- 注意：分页结构的layout值要用都好隔开，但是最后一个不能加逗号，会死机 -->
          <el-pagination
            layout="prev,pager,next"
            :total="page.total"
            :page-size="page.pagesize"
            :page-count="page.page"
            @current-change="changePage"
          />
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="公司信息" name="second">
        <el-alert
          :closable="false"
          show-icon
          type="info"
          title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
        />
        <el-form label-width="120px">
          <el-form-item />
          <el-form-item label="公司名称">
            <el-input v-model="formData.name" style="width:400px" disabled="" />
          </el-form-item>
          <el-form-item label="公司地址">
            <el-input v-model="formData.companyAddress" style="width:400px" disabled="" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formData.mailbox" style="width:400px" disabled="" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formData.remarks" type="textarea" :rows="3" style="width:400px" disabled="" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!-- 编辑与添加的弹片层 -->
    <!-- 放置弹层 -->
    <el-dialog title="编辑角色" :visible="showDialog" @close="btnCanon">
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="btnOk">确定</el-button>
          <el-button size="small" @click="btnCanon">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 放置分配权限弹层 -->
    <el-dialog :title="`为${formData.name}分配权限`" :visible="showPermission" @close="btnPermCancel">
      <!-- 放置分配树 -->
      <!-- 树形默认展开要lable -->
      <el-tree
        ref="permTree"
        :data="permissionData"
        :props="defaultProps"
        node-key="id"
        show-checkbox
        default-expand-all
        :default-checked-keys="selectChecks"
        :check-strictly="true"
      />
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="btnPermOK">确定</el-button>
          <el-button size="small" @click="btnPermCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </el-card>
</template>

<script>
import { getRoleList, getCompanyInfo, deleteRole, getRoleDetail, updateRole, addRole } from '@/api/setting'
import { mapGetters } from 'vuex'
import { transListToTreeData } from '@/utils'
import { getPermissionList, assignPerm } from '@/api/permission'
export default {
  data() {
    return {
      list: [],
      page: {
        page: 1,
        pagesize: 5,
        total: 0
      },
      formData: {
        name: '',
        companyAddress: '',
        mailbox: '',
        remarks: ''
      },
      showDialog: false,
      rules: {
        name: [{
          required: true, message: '角色名称不能为空'
        }]
      },
      roleForm: {
        // name: '',
        // region: ''
      },
      loading: false,
      showPermission: false, // 显示分配权限
      permissionData: [], // 权限数据
      selectChecks: [], // 默认选中的节点
      roleId: null, // 当前分配的id
      defaultProps: {
        label: 'name'
      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList()// 监听角色列表
    this.getCompanyInfo()// 获取公司信息
  },

  methods: {
    // 页码切换
    changePage(newPage) {
      this.page.page = newPage
      this.getRoleList()
    },
    // 获取角色列表
    async  getRoleList() {
      this.loading = true
      const { total, rows } = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    // 获取公司信息
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
    // 新增角色
    addRole() {
      // 打开弹片层
      this.showDialog = true
    },
    // 点击弹片层的确定按钮
    async btnOk() {
      // 表单统一验证
      this.$refs.roleForm.validate(async isOK => {
        if (isOK) {
          // 通过判断是否有id，有的话就是编辑功能，没有的话就是新增
          if (this.roleForm.id) {
            await updateRole(this.roleForm)
          } else {
            // 新增功能
            await addRole(this.roleForm)
          }
          // 完成后，
          // 关闭弹窗
          this.showDialog = false
          // 更新数据
          this.getRoleList()
          // 清空数据
          this.roleForm = {}
          // 清除校验
          this.$refs.roleForm.resetFields()
        }
      })
    },
    // 弹片取消功能
    btnCanon() {
      // 关闭弹窗
      this.showDialog = false
      // 更新数据
      this.getRoleList()
      // 清空数据
      this.roleForm = {}
      // 清除校验
      this.$refs.roleForm.resetFields()
    },
    // 删除角色
    deleteRole(id) {
      this.$confirm('你确定要删除吗').then(() => {
        // 确认删除
        return deleteRole(id)
      }).then(() => {
        // 删除成功
        this.$message.success('删除成功')
        // 刷新
        this.getRoleList()
      })
    },
    // 编辑角色
    async updateRole(id) {
      // 打开弹出层
      this.showDialog = true
      // 获取数据
      const reslue = await getRoleDetail(id)
      // 赋值
      this.roleForm = reslue
    },
    // 分配权限
    async assignPermission(id) {
      this.roleId = id // 记住当前编辑了哪个id
      // 这是所有的访问权限 和功能权限,查询所有开启了的权限点，根节点为0
      this.permissionData = transListToTreeData(await getPermissionList({ enVisible: '1', type: 0 }), '0') // 查询所有打开的状态数据
      // 获取当前点击角色的权限
      const { permIds } = await getRoleDetail(id)
      this.selectChecks = permIds
      this.showPermission = true // 显示弹层
    },
    // 确认分配
    async btnPermOK() {
      // 首先要获取勾选了哪些权限
      const permIds = this.$refs.permTree.getCheckedKeys() // 获取节点
      await assignPerm({ id: this.roleId, permIds })
      this.$message.success('分配成功')
      this.btnPermCancel()
    },
    btnPermCancel() {
      this.selectChecks = [] // 重新置空
      this.showPermission = false
    }
  }
}
</script>

<style>

</style>
