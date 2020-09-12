// 引进布局组件
import Layout from '@/layout'

export default {
  component: Layout, // 当前组件
  path: '/approvals', // 路由地址
  name: 'approvals', // 路由名称

  children: [{
    path: '', // 二级默认路由
    component: () => import('@/views/approvals'), // 按需加载
    // 为什么meta要在二级默认路由写 因为 当 访问地址是 /approvals的时候 实际上访问的是二级默认路由的路由信息
    meta: {
      title: '审批管理', // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
      icon: 'tree-table'
    }
  }]
}
