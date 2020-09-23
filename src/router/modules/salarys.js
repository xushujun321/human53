
import Layout from '@/layout'

const salaryRouter = {
  path: '/salarys',
  component: Layout,
  menusName: 'salarys',
  children: [
    {
      path: '',
      component: () => import('@/views/salarys'),
      menusName: 'salarys',
      meta: {
        title: '工资',
        icon: 'money'
      }
    },
    {
      path: 'setting',
      component: () => import('@/views/salarys/setting'),
      menusName: 'salarysSetting',
      hidden: true,
      meta: {
        title: '设置'
      }
    },
    {
      path: 'details/:yearMonth/:id',
      component: () => import('@/views/salarys/detail'),
      menusName: 'salarysDetails',
      hidden: true,
      meta: {
        title: '详情'
      }
    },
    {
      path: 'historicalArchiving',
      component: () => import('@/views/salarys/historical'),
      menusName: 'salarysHistorical',
      hidden: true,
      meta: {
        title: '历史归档'
      }
    },
    {
      path: 'monthStatement',
      component: () => import('@/views/salarys/month'),
      menusName: 'salarysMonthStatement',
      hidden: true,
      meta: {
        title: '月报表'
      }
    }
  ]
}
export default salaryRouter
