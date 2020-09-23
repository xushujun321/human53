
import Layout from '@/layout'

const attendRouter = {
  path: '/attendances',
  component: Layout,
  menusName: 'attendances',
  children: [
    {
      path: '',
      component: () => import('@/views/attendances'),
      menusName: 'attendances',
      meta: {
        title: '考勤',
        icon: 'excel' }
    },
    {
      path: 'archiving',
      component: () => import('@/views/attendances/historical'),
      menusName: 'archiving',
      hidden: true,
      meta: {
        title: '归档'
      }
    },
    {
      path: 'report/:month',
      component: () => import('@/views/attendances/report'),
      menusName: 'reports',
      hidden: true,
      meta: {
        title: '报表'
      }
    }
  ]
}
export default attendRouter
