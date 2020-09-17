<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <template slot="before">共{{ page.total }}条记录</template>
        <template slot="after">
          <el-button type="warning" size="small" @click="$router.push('/import?type=user')">导入</el-button>
          <el-button type="danger" size="small" @click="exportData">导出</el-button>
          <el-button type="primary" size="small" @click="add">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 表格内容 -->
      <el-card>
        <el-table border="" :data="list">
          <el-table-column type="index" align="center" sortable="custom" label="序号" width="80" />
          <el-table-column prop="username" align="center" sortable="custom" label="姓名" />
          <el-table-column prop="workNumber" align="center" sortable="custom" label="工号" />
          <el-table-column align="center" :formatter="formatEmployment" sortable="custom" label="聘用形式" />
          <el-table-column prop="departmentId" align="center" sortable="custom" label="部门" />
          <el-table-column prop="timeOfEntry" align="center" sortable="custom" label="入职时间">
            <template slot-scope="obj">
              {{
                obj.row.timeOfEntry | formatDate
              }}
            </template>
          </el-table-column>
          <el-table-column prop="enableState" align="center" sortable="custom" label="账户状态">
            <template slot-scope="obj">
              <!-- 账户状态 -->
              <el-switch :value="obj.row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="280" fixed="right">
            <template slot-scope="{ row }">
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
              <el-button size="small" type="text">转正</el-button>
              <el-button size="small" type="text">调岗</el-button>
              <el-button size="small" type="text">离职</el-button>
              <el-button size="small" type="text">角色</el-button>
              <el-button size="small" type="text" @click="delEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" align="middle" justify="center" style="height:60px">
          <el-pagination
            layout="prev, pager, next"
            :page-size="page.size"
            :page-count="page.page"
            :total="page.total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
      <AddEmployee :show-dialog.sync="showDialog" @addUser="addUser" />
    </div>
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
// 调用枚举文件
import EmployeeEnum from '@/api/constant/employees'
// 引近弹片组件
import AddEmployee from './components/add-employee'
import { formatDate } from '@/filters'
export default {
  components: {
    AddEmployee
  },
  data() {
    return {
      list: [],
      time: '',
      page: {
        page: 1,
        size: 5,
        total: 0
      },
      showDialog: false
    }
  },
  created() {
    this.getEmployeeList()// 获取员工列表
  },
  methods: {
  // 获取员工列表
    async getEmployeeList() {
      const res = await getEmployeeList(this.page)
      this.list = res.rows
      this.page.total = res.total
    },
    // 格式化聘用形式
    formatEmployment(row) {
      const list = EmployeeEnum.hireType // 枚举列表
      const item = list.find(item => item.id === row.formOfEmployment)
      return item ? item.value : '无'
    },
    // 删除员工信息
    delEmployee(id) {
      this.$confirm('确定要删除该员工信息吗').then(() => {
        return delEmployee(id)
      }).then(() => {
        // 删除成功
        this.$message.success('删除成功')
        // 重新出刷新数据
        this.getEmployeeList()
      })
    },
    // 点击添加按钮
    add() {
      // 跳出弹片
      this.showDialog = true
    },
    addUser() {
      // 刷新数据
      this.getEmployeeList()
    },
    // 页面跳转
    changePage(newPage) {
      this.page.page = newPage
      this.getEmployeeList()
    },
    // 导出员工数据
    exportData() {
      // 表头对应关系
      const headers = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const data = this.formatJson(headers, this.list) // 处理数据
      // 动态引入excel插件
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: Object.keys(headers), // 导出数据的表头
          data: data,
          filename: '员工名单',
          autoWidth: true,
          bookType: 'xlsx'
        })
        this.$message.success('导出报表成功！')
      })
    },
    // 处理json数据 返回的是一个二维数组
    formatJson(headers, data) {
      return data.map(item => {
        return Object.keys(headers).map(key => {
          if (headers[key] === 'correctionTime' || headers[key] === 'timeOfEntry') {
            // 处理时间
            return formatDate(item[headers[key]])
          }
          return item[headers[key]]
        })
      })
    }
  }
}
</script>

<style>

</style>
