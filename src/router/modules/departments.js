import Layout from '@/layout'

export default {
  component: Layout,
  path: '/departments',
  menusName: 'departments',

  children: [{
    path: '',
    component: () => import('@/views/departments'),
    meta: {
      title: '组织构架',
      icon: 'tree'
    }
  }]
}
