/**
 * @module		vuex user file
 * @author      nayo
 * @date        2020/7/29 1:49 下午
 * @version     1.0
 */
import userApi from '@/common/apis/user';
import {responseHandler, storage} from '@/common/Utils';
import jwtDecode from 'jwt-decode';

export default {
	state: {
		user: {}
	},
	mutations: {
		SET_USER(state, user) {
			state.user = user;
		},
		SET_TOKEN(state, data) {
			let {expiresAt, token} = data;
			let userInfo = jwtDecode(token);
			storage().set('accessToken', token, expiresAt * 1000);
			state.user = userInfo.User;
		}
	},
	actions: {
		async login({commit}, data) {
			return await userApi.auth(data).then(async res => {
				return await responseHandler(res).then(data => {
					commit('SET_TOKEN', data);
					return true;
				});
			});
		}
	},
	getters: {
		user: s => s.user
	}
};