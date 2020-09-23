import Layout from '@/layout'

export default {
  component: Layout,
  path: '/permission',
  menusName: 'permissions',

  children: [{
    path: '',
    component: () => import('@/views/permission'),
    meta: {
      title: '权限管理',
      icon: 'lock'
    }
  }]
}
