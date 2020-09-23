
import Layout from '@/layout'

export default {
  path: '/users',
  component: Layout,
  hidden: true,
  menusName: 'user12345',
  children: [
    {
      path: '/users/approvals',
      component: () => import('@/views/users/approvals'),
      menusName: 'usersApprovals',
      hidden: true,
      meta: {
        title: '用户'
      }
    },
    {
      path: '/users/info',
      component: () => import('@/views/users/info'),
      menusName: 'myInfo',
      hidden: true,
      meta: {
        title: '我的信息'
      }
    }
  ]
}
