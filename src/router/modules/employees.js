import Layout from '@/layout' // 引入布局组件

export default {
  component: Layout, // 当前路由组件
  path: '/employees', // 路由地址
  name: 'employees', // 路由名称

  children: [{
    path: '', // 二级默认路由
    component: () => import('@/views/employees'), // 按需加载
    // 为什么meta要在二级默认路由写 因为 当 访问地址是 /approvals的时候 实际上访问的是二级默认路由的路由信息
    meta: {
      title: '员工管理', // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
      icon: 'people'
    }
  }]
}
