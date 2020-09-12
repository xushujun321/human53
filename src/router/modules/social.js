import Layout from '@/layout'

export default {
  component: Layout,
  path: '/social',
  name: 'social',

  children: [{
    path: '',
    component: () => import('@/views/social'),
    meta: {
      title: '工资管理',
      icon: 'table'
    }
  }]
}
