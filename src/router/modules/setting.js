import Layout from '@/layout'

export default {
  component: Layout,
  path: '/setting',
  menusName: 'settings',

  children: [{
    path: '',
    component: () => import('@/views/setting'),
    menusName: 'settings',
    meta: {
      title: '公司设置',
      icon: 'setting'
    }
  }]
}
