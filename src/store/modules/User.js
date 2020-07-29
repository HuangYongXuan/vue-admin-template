/**
 * @module		vuex user file
 * @author      nayo
 * @date        2020/7/29 1:49 下午
 * @version     1.0
 */
import userApi from '@/common/apis/user';

export default {
	state: {
		user: {}
	},
	mutations: {
		SET_USER(state, user) {
			state.user = user;
		}
	},
	actions: {
		// eslint-disable-next-line no-unused-vars
		async login({commit}, data) {
			return await userApi.login(data).then(data => {
				console.info(data)
			})
		}
	},
	getters: {
		user: s => s.user
	}
};