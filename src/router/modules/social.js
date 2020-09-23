
import Layout from '@/layout'

export default {
  path: '/social_securitys',
  component: Layout,
  menusName: 'social_securitys',
  children: [
    {
      path: '',
      component: () => import('@/views/social'),
      menusName: 'social_securitys',
      meta: {
        title: '社保',
        icon: 'table'

      }
    },
    // 报表
    {
      path: 'detail/:id',
      hidden: true,
      component: () => import('@/views/social/detail'),
      menusName: 'socialDetail',
      meta: {
        title: '社保'
      }
    },
    // 历史归档
    {
      path: 'historicalArchiving',
      hidden: true,
      component: () => import('@/views/social/historical'),
      menusName: 'socialHistorical',
      meta: {
        title: '历史归档'
      }
    },
    // 月报表
    {
      path: 'monthStatement',
      component: () => import('@/views/social/month'),
      menusName: 'socialMonthStatement',
      hidden: true,
      meta: {
        title: '当月报表'
      }
    }
  ]
}
