<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="登录账户设置" name="first">
            <el-row type="flex" justify="center" align="middle" style="height:200px">
              <el-form ref="userInfo" label-width="120px" :model="userInfo" :rules="userRules">
                <el-form-item label="姓名:" prop="username">
                  <el-input v-model="userInfo.username" size="small" style="width:300px" />
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                  <el-input v-model="userInfo.password" type="password" size="small" style="width:300px" />
                </el-form-item>
                <el-form-item>
                  <el-button size="small" type="primary" @click="saveUser">保存</el-button>
                </el-form-item>
              </el-form>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="second">
            <!-- 放置个人详情 -->
            <component :is="UserInfo" />
            <!-- <user-info /> -->
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="third">
            <!-- 放置岗位详情 -->
            <component :is="JobInfo" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import UserInfo from './components/user-info'
import JobInfo from './components/job-info'
export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      activeName: 'first',
      userId: this.$route.params.id, // 传递过来的用户id
      userInfo: {
        username: '', // 用户名
        password: '' // 密码
      },
      userRules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 12, message: '密码长度在6-12位', trigger: 'blur' }]
      },
      UserInfo,
      JobInfo
    }
  },
  created() {
    // 获取用户详细信息
    this.getUserDetailById()
  },
  methods: {
    // 获取用户详细信息
    async getUserDetailById() {
      this.userInfo = await getUserDetailById(this.userId)
    },
    // 保存信息
    saveUser() {
      this.$refs.userForm.validate(async validate => {
        if (validate) {
          await saveUserDetailById(this.userInfo)
          this.$message.success('修改个人基本信息成功')
        }
      })
    }
  }
}
</script>

<style>

</style>
