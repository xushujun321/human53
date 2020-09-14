import request from '@/utils/request'

/** *
 * 获取组织结构数据
 * **/
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

// 组织构架的删除部门的接口
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

// 添加部门
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

// 编辑部门
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}

// 获取部门详情
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}

// 获取简单的员工列表
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

