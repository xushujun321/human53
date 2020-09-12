// 引进布局组件
import Layout from '@/layout'

export default {
  component: Layout, // 当前组件
  path: '/attendances', // 路由地址
  name: 'attendances', // 路由名称

  children: [{
    path: '', // 二级默认路由
    component: () => import('@/views/attendances'), // 按需加载
    // 为什么meta要在二级默认路由写 因为 当 访问地址是 /approvals的时候 实际上访问的是二级默认路由的路由信息
    meta: {
      title: '考勤管理', // 用作左边侧边栏
      icon: 'skill'
    }
  }]
}
