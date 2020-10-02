import Layout from '@/layout'

export default {
  component: Layout,
  path: '/permission',
  name: 'permissions',

  children: [{
    path: '',
    name: 'permissions',
    component: () => import('@/views/permission'),
    meta: {
      title: '权限管理',
      icon: 'lock'
    }
  }]
}
