<template>
  <div>
    <el-progress v-if="showProgress" :percentage="progress" style="width:180px" />
    <el-upload
      list-type="picture-card"
      action="#"
      limit="1"
      :on-preview="preview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :on-change="handleChange"
      :class="{disabled:formData}"
      :before-upload="upload"
      :http-request="uploadFiles"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="showDialog">
      <img width="100%" :src="ImageUrl" alt="">
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
      showDialog: false, // 预览弹片的显示
      ImageUrl: '', // 上传图片的地址
      fileList: [], // 上传图片的图片列表
      currImageId: '', // 上传的图片的id标识
      progress: 0, // 进度条
      showProgress: false// 显示进度条
    }
  },
  computed: {
    // 对上传图片的长度进行监听
    formData() {
      return this.fileList.length === 1
    }
  },
  methods: {
    // 预览
    preview(file) {
      this.showDialog = true// 打开弹片
      this.ImageUrl = file.url// 显示图片
    },
    // 删除图片
    handleRemove(file, fileList) {
      this.fileList = fileList.filter(item => {
        item.uid !== file.uid
      })
    },
    // 上传图片
    handleChange(file, fileList) {
      this.fileList = fileList.map(item => item)
    },
    // 上传之前的检查
    upload(file) {
      // 上传文件的格式
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      // 上传图片的大小,限制5M
      const maxSize = 5 * 1024 * 1024// 实际是以b单位
      if (maxSize < file.size) {
        // 所选文件超出头像的大小
        this.$message.error('上传图片不能超过5M')
        return false
      }
      // 检查都合格
      this.currImageId = file.uid
      // 打开进度条
      this.showProgress = true
      return true
    },
    // 自定义上传到腾讯云
    uploadFiles(params) {
      if (params.file) {
        cos.putObject({
          Bucket: 'xiangmu-ziyuan01-1303194459', /* 必须 存储桶*/
          Region: 'ap-guangzhou', /* 存储桶所在地域，必须字段 */
          Key: params.file.name, /* 文件名*/
          StorageClass: 'STANDARD', // 写死
          Body: params.file, // 上传文件对象
          onProgress: (progressData) => {
            this.progress = progressData.loaded / progressData.total * 100 // 百分比
          }
        }, (err, data) => {
          if (!err && data.statusCode === 200 && data.Location) {
            // 上传成功
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currImageId) {
                return { url: 'http://' + data.Location, upload: true }
              }
              return item
            })
            // 清除进度条，隐藏进度条
            setTimeout(() => {
              this.progress = 0
              this.showProgress = false
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
