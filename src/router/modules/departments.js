import Layout from '@/layout'

export default {
  component: Layout,
  path: '/departments',
  name: 'departments',

  children: [{
    path: '',
    component: () => import('@/views/departments'),
    name: 'departments',
    meta: {
      title: '组织构架',
      icon: 'tree'
    }
  }]
}
