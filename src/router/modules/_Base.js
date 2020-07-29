/**
 * @module		路由主要配置文件
 * @author      nayo
 * @date        2020/7/29 1:36 下午
 * @version     1.0
 */

export default [
	{
		name: 'Index',
		path: '/index',
		component: () => import('@/pages/Index')
	},
	{path: '*', redirect: {name: 'Index'}},
];