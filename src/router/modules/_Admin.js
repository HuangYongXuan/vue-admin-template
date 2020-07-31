/**
 * @module		Admin路由
 * @author      nayo
 * @date        2020/7/31 2:17 下午
 * @version     1.0
 */
export default [
	{
		name: 'Admin',
		path: '/admin',
		component: () => import('@/components/layout/MainLayout'),
		children: [
			{
				path: 'home',
				name: 'AdminHome',
				component: () => import('@/pages/admin/Home')
			}
		]
	}
];