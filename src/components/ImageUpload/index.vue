<template>
  <div>
    <el-progress v-if="showProcess" style="width:180px" :percentage="percent" />
    <!-- 放置上传组件 el-upload  action设置为空 否则会报错  limit 设置为1 只能上传一个图片-->
    <el-upload
      action="#"
      :limit="1"
      list-type="picture-card"
      :file-list="fileList"
      :on-remove="handleRemove"
      :on-preview="preview"
      :on-change="changeFile"
      :http-request="uploadFiles"
      :before-upload="beforeUpload"
      :class="{ disabled: fileComputed }"
    >
      <!-- i标签  是否显示 取决于现在url数组中有几个地址 如果地址等于上传数量 表示 不能再增加了-->
      <!-- 只有可以上传的时候 才显示加号 -->
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog title="查看图片" :visible.sync="dialogVisible">
      <img width="100%" :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import COS from 'cos-js-sdk-v5' // 引入腾讯云sdk
const cos = new COS({
  SecretId: 'AKID0xCB8i4FA2kDj6q6TaBVbS4tSmu1OmRq', // 身份识别 ID
  SecretKey: '7yLRHrAH7bquiMkrmQ4ScVCnBE9pIWie' // 身份密钥
})
export default {
  data() {
    return {
      fileList: [], // 图片地址设置为数组，上传列表
      dialogVisible: false, // 控制显示预览弹层
      currentFileUid: '', // 记录当前上传文件的id
      imgUrl: '', // 预览的图片地址
      percent: 0, // 当前上传百分比
      showProcess: false // 是否显示进度条
    }
  },
  computed: {
    // 设置一个计算属性  判断是否已经上传完毕
    fileComputed() {
      // 当数组中的地址 已经等于长度的时候  就表示不能再上传了
      return this.fileList.length === 1
    }
  },
  methods: {
    // 删除图片 这里有几种可能性 有可能是 读取过来的图片 删除 有可能是 本地还没有上传的图片删除不一样的
    handleRemove(file, fileList) {
      this.fileList = fileList.filter(item => item.uid !== file.uid)
    },
    // 预览图片
    preview(file) {
      this.dialogVisible = true // 显示弹层
      this.imgUrl = file.url // 赋值url
    },
    // 添加文件时触发
    changeFile(file, fileList) {
      this.fileList = fileList.map(item => item)
    },
    // 上传文件之前
    beforeUpload(file) {
      // 限制上传文件的大小 5M
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      const maxSize = 5 * 1024 * 1024 // 真实大小以b为单位
      if (maxSize < file.size) {
        // 所选文件超出头像的大小
        this.$message.error('上传图片不能超过5M')
        return false
      }
      this.currentFileUid = file.uid
      this.showProcess = true
      return true
    },
    // 因为我们要上传到腾讯云 所以需要这里自定义上传
    uploadFiles(params) {
      if (params.file) {
        cos.putObject({
          Bucket: 'xiangmu-ziyuan01-1303194459', /* 必须 存储桶*/
          Region: 'ap-guangzhou', /* 存储桶所在地域，必须字段 */
          Key: params.file.name, /* 文件名*/
          StorageClass: 'STANDARD', // 写死
          Body: params.file, // 上传文件对象
          onProgress: (progressData) => {
            this.percent = progressData.loaded / progressData.total * 100 // 百分比
          }
        }, (err, data) => {
          // 需要注意 不论上传成功或者失败 都会进入第二个参数
          // 上传成功时，状态码与Location存在
          if (!err && data.statusCode === 200 && data.Location) {
            // 注意：不能写死上传多少张。要找到该上传的是哪张图片
            this.fileList = this.fileList.map(item => {
              // currentFileUid是对上传的图片储存的uid地址，注意：这里要是用this.currentFileUid，必须是箭头函数
              if (item.uid === this.currentFileUid) {
                // 将本地地址转换为上传后的图片地址
                return { url: 'http://' + data.Location, upload: true }
              }
              return item
            })
            setTimeout(() => {
              this.percent = 0
              this.showProcess = false
            }, 3000)
          } else {
            console.log(err)
          }
        })
      }
    }
  }
}
</script>

<style>
.disabled .el-upload--picture-card{
  display: none;
 }
</style>
