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
import {Message} from 'element-ui';

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

/**
 * 简单生成最长10位的Uuid
 *
 * @param prefix    {string}    default: ''     前缀
 * @param size      {number}    default: 6      uuid长度 最长10位
 * @return          {string}
 */
export const generateUuid = (prefix = '', size = 6) => {
	return prefix + Math.random().toString(36).slice(2, size + 2);
};


/**
 * 处理 http的响应结果
 * @param data           {Object}        // response的数据 由axios提供返回
 * @param ss            {boolean}       // 是否显示成功消息，默认不显示
 * @param se            {boolean}       // 是否现象错误消息，默认显示
 * @param sm            {string}        // 自定义成功消息
 * @param em            {string}        // 自定义错误消息
 * @returns 			{Promise<Object>}
 */
export const responseHandler = async (data, ss = false, se = true, sm = undefined, em = undefined) => {
	if (!data) {
		return Promise.reject(data);
	}
	if (data.success === true) {
		if (ss) {
			Message({
				type: 'success',
				message: sm || data.message || data.msg,
				duration: 2000
			});
		}
		return Promise.resolve(data.data);
	} else {
		if (se) {
			Message({
				type: 'error',
				message: em || data.message || data.msg,
				duration: 2000
			});
		}
		return Promise.reject(data);
	}
};

const Utils = {
	storage,
	generateUuid,
	responseHandler
};

Vue.prototype.$utils = Utils;

export default Utils;
