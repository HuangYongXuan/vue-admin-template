/**
 * @module
 * @author      nayo
 * @date        2020/8/3 2:23 下午
 * @version     1.0
 */
import userApi from '@/common/apis/user';
import {genRouterMenu, responseHandler} from '@/common/Utils';

export let isGenMenu = false;

export default {
	state: {
		menus: [],
		buttons: [],
		router: []
	},
	mutations: {
		SET_MENUS(state, menus) {
			state.menus = menus;
		},
		SET_BUTTONS(state, buttons) {
			state.buttons = buttons;
		},
		SET_ROUTER(state, router) {
			state.router = router;
		}
	},
	actions: {
		async getUserMenu({commit}) {
			return await userApi.menu().then(async (res) => {
				return await responseHandler(res).then(async (data) => {
					let buttons = data.map(item => item.perms);
					commit('SET_BUTTONS', buttons);
					commit('SET_MENUS', data);
					let router = await genRouterMenu(data);
					commit('SET_ROUTER', router);
					isGenMenu = true
					return data;
				});
			});
		},
		async GenerateRoutes ({commit, state}) {
			let router = await genRouterMenu(state.menus);
			isGenMenu = true
			commit('SET_ROUTER', router);
		}
	},
	getters: {
		menus: s => s.menus,
		buttons: s => s.buttons,
		router: s => s.router
	}
};