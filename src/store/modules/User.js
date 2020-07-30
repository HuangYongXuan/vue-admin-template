/**
 * @module		vuex user file
 * @author      nayo
 * @date        2020/7/29 1:49 下午
 * @version     1.0
 */
import userApi from '@/common/apis/user';
import {responseHandler, storage} from '@/common/Utils';
import jwtDncode from 'jwt-decode';

export default {
	state: {
		user: {}
	},
	mutations: {
		SET_USER(state, user) {
			state.user = user;
		},
		SET_TOKEN(state, token) {
			let {accessToken, refreshToken} = token;
			let accessTokenObj = jwtDncode(accessToken);
			let refreshTokenObj = jwtDncode(refreshToken);
			storage().set('accessToken', accessToken, new Date().getTime() + accessTokenObj.exp * 1000);
			storage().set('refreshToken', refreshToken, new Date().getTime() + refreshTokenObj.exp * 1000);
			state.user = accessTokenObj;
		}
	},
	actions: {
		async login({commit}, data) {
			return await userApi.login(data).then(async res => {
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