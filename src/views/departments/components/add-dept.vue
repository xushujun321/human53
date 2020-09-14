<template>
  <el-dialog title="新增部门" :visible="showDialog" @close="btnCancel">
    <el-form ref="deptForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width: 80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width: 80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width: 80%" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width: 80%" type="textarea" :rows="3" placeholder="1-300个字符" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" class="dialog-footer">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import { getDepartments, getEmployeeSimple, addDepartments, getDepartDetail, updateDepartments } from '@/api/departments'

export default {
  props: {
    // 用来控制窗体是否显示
    showDialog: {
      type: Boolean,
      default: false
    },
    // 当前操作的节点
    // 可以用来查询当前部门下所有子部门，避免出现重复
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    // 避免同级部门的名字出现重复
    const checkNameRepeat = async(rule, value, callback) => {
      // 获取最新的构架数据
      const { depts } = await getDepartments()
      let isReader = false
      if (this.formData.id) {
        isReader = false
      } else {
      // 利用filter过滤出对应节点下的所有子部门，然后some进行查找是否部门名重复
        isReader = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      }
      isReader ? callback(new Error(`同级部门${value}已存在`)) : callback()
    }
    // 避免部门的编号出现重复
    const checkCodeRepeat = async(rule, value, callback) => {
      // 获取最新的架构数据
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.formData.id) {
        isRepeat = depts.some(item => item.id !== this.treeNode.id && item.code === value && value)
      } else {
        isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.code === value)
      }
      isRepeat ? callback(new Error(`部门编码${value}已经存在`)) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 负责人
        introduce: '' // 介绍
      },
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }, { min: 1, max: 50, message: '部门名称长度在1到50个之间', trigger: 'blur' }, { trigger: 'blur',
          validator: checkNameRepeat }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' }, { min: 1, max: 50, message: '部门编码长度在1到50个之间', trigger: 'blur' }, { trigger: 'blur',
          validator: checkCodeRepeat }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' }, { min: 1, max: 300, message: '部门介绍长度在1到300个之间', trigger: 'blur' }],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }]
      },
      peoples: []
    }
  },
  methods: {
    // 获取员工信息
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    },
    // 点击确定
    btnOk() {
      // 表单提交，进行整体校验，需要给el-form给一个ref即可，然后用validate（）
      this.$refs.deptForm.validate(async isValidate => {
        // 是否校验通过
        if (isValidate) {
          if (this.formData.id) {
            // 更新功能
            await updateDepartments(this.formData)
          } else {
          // 如果该值为true 表示校验通过
          // 注意：增加部门的参数处理formData之外还需要pid，所以需要进行组合
            const addData = { ...this.formData, pid: this.treeNode.id ? this.treeNode.id : '' }
            await addDepartments(addData) // 调用新增部门方法
          }
          // 告诉父组件，重新加载数据
          this.$emit('addDepts')
          this.$emit('update:showDialog', false)
        }
      })
    },
    // 点击取消按钮
    btnCancel() {
      // 数据清空
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 负责人
        introduce: '' // 介绍
      }
      // 清除校验
      this.$refs.deptForm.resetFields()
      // 关闭弹出框
      this.$emit('update:showDialog', false)
    },
    // 定义函数，由于props传递的值是异步的，不稳定，此方法需要在父组件中使用
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id)
    }
  }

}
</script>

<style>

</style>
