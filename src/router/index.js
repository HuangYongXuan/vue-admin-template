/**
 * @module		vue router 配置文件
 * @author      nayo
 * @date        2020/7/29 1:31 下午
 * @version     1.0
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err);
};

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
	return originalReplace.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

import Base from '@/router/modules/_Base';
import Admin from '@/router/modules/_Admin';

export const routes = [...Admin, ...Base];

export default new VueRouter({
	base: process.env.VUE_APP_ROUTER_BASE,
	mode: 'history',
	routes,
	scrollBehavior: () => ({y: 0})
});
