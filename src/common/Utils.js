/**
 * @module		公用方法
 * @author      nayo
 * @date        2020/7/29 2:28 下午
 * @version     1.0
 */
import Vue from 'vue';
import RotStorage from 'rot-storage/dist/rot-storage';
import store from '@/store';
// eslint-disable-next-line no-unused-vars
import {AxiosRequestConfig} from 'axios';

/**
 * storage
 * @returns {RotStorage}
 */
export const storage = () => {
	return new RotStorage.RotStorage({drive: new RotStorage.drive.LocalStorage()});
};

/**
 * 检查用户token
 * @param options	{HttpClientConfig | AxiosRequestConfig}
 * @returns {Promise<any>}
 */
export const checkToken = async (options) => {
	// 访问Token
	const accessToken = storage().get('accessToken');
	// 刷新Token
	const refreshToken = storage().get('refreshToken');

	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async (resolve) => {
		if (!options.needToken) {
			return resolve();
		}
		if (accessToken) return resolve();
		else if (refreshToken) {
			await store.dispatch('refreshToken').then(() => {
				resolve();
			});
		} else {
			console.info('用户没有登录');
		}
	});
};

const Utils = {
	storage
};

Vue.prototype.$utils = Utils;

export default Utils;
