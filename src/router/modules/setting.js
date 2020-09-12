import Layout from '@/layout'

export default {
  component: Layout,
  path: '/setting',
  name: 'setting',

  children: [{
    path: '',
    component: () => import('@/views/setting'),
    meta: {
      title: '公司设置',
      icon: 'setting'
    }
  }]
}
