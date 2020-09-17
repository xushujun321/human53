<template>
  <!-- 弹片 -->
  <el-dialog title="新增员工" :visible="showDialog" @close="btnCancel">
    <el-form ref="formData" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="1-30哥字符" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-input v-model="formData.timeOfEntry" type="date" style="width:50%" placeholder="选择日期" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="选择形式">
          <el-option v-for="item in EmployeeEnum.hireType" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="1-20字符" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择" @focus="getDeparts" />
        <!-- 部门弹层 -->
        <el-tree
          v-if="showTree"
          :data="treeData"
          :props="defaultProps"
          default-expand-all
          @node-click="selectDept"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-input v-model="formData.correctionTime" type="date" style="width:50%" placeholder="选择日期" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="middle">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOK">提交</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { addEmployee } from '@/api/employees'
// 枚举文件
import EmployeeEnum from '@/api/constant/employees'
// 引进树形和部门数据
import { transListToTreeData } from '@/utils'
import { getDepartments } from '@/api/departments'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      EmployeeEnum,
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [{
          required: true,
          message: '员工名称不能为空',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '员工名称为1-20个字符',
          trigger: 'blur'

        }],
        mobile: [{
          required: true,
          message: '手机号不能为空',
          trigger: 'blur'

        }, {
          pattern: /^1[3-9]\d{9}$/,
          message: '手机格式不符合要求',
          trigger: 'blur'

        }],
        formOfEmployment: [{ required: true,
          message: '聘用形式不能为空', trigger: 'blur'
        }],
        workNumber: [{ required: true,
          message: '工号不能为空', trigger: 'blur'
        }],
        departmentName: [{ required: true,
          message: '部门不能为空', trigger: 'change'
        }],
        timeOfEntry: [{ required: true,
          message: '入职时间不能为空', trigger: 'blur'
        }]
      },
      showTree: false,
      treeData: [],
      defaultProps: {
        label: 'name'
      }
    }
  },
  methods: {
    // 点击提交
    btnOK() {
      // 进行验证
      this.$refs.formData.validate(async isOK => {
        if (isOK) {
          // 验证成功
          // 新增功能
          await addEmployee(this.formData)
          // 告诉父组件，进行数据刷新
          this.$emit('addUser')
          // 实行取消按钮
          this.btnCancel()
          this.$message.success('新增成功')
        }
      })
    },
    // 取消按钮
    btnCancel() {
      // 清空数据
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      // 清除校验
      this.$refs.formData.resetFields()
      // 关闭弹层
      this.$emit('update:showDialog', false)
    },
    // 获取部门信息
    async getDeparts() {
      this.showTree = true // 显示树形组件
      const { depts } = await getDepartments()
      this.treeData = transListToTreeData(depts, '')
    },
    // 选择部门时，触发的点击事件
    selectDept(data) {
      console.log(data)
      this.formData.departmentName = data.name
      // 网页数据是默认显示departmentId的，只是我们要获取到的数据是name，
      // 所以要保留在id即可显示部门号
      this.formData.departmentId = data.id
      // this.partId = data.id
      // 关闭弹层
      this.showTree = false
    }
  }

}
</script>

<style>

</style>
