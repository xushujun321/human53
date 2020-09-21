// 员工接口
import request from '@/utils/request'

// 获取员工列表
export function getEmployeeList(params) {
  return request({
    url: 'sys/user',
    params
  })
}

// 删除员工信息
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

// 新增员工api
export function addEmployee(data) {
  return request({
    url: `/sys/user`,
    method: 'post',
    data
  })
}

// 导入员工
export function importEmployee(data) {
  return request({
    url: `/sys/user/batch`,
    method: 'post',
    data
  })
}

// 保存某个用户的基本信息
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

// 读取个人信息
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

// 保存个人信息
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.id}/personalInfo`,
    data,
    method: 'put'
  })
}

// 读取岗位信息
export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}

// 保存岗位信息
export function updateJob(data) {
  return request({
    url: `/employees/${data.id}/jobs`,
    method: 'put',
    data
  })
}

// 获取员工列表
export function getEmployeeSimple() {
  return request({
    url: `/sys/user/simple`
  })
}

// 给用户分配角色
export function assignRoles(data) {
  return request({
    url: '/sys/user/assignRoles',
    data,
    method: 'put'
  })
}
