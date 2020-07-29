/**
 * @module		axios 配置
 * @author      nayo
 * @date        2020/7/29 2:02 下午
 * @version     1.0
 */
// eslint-disable-next-line no-unused-vars
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {checkToken} from '@/common/Utils';
// eslint-disable-next-line no-unused-vars
import {HttpClientConfig} from 'index.ts';
import {Loading} from 'element-ui';

class HttpClient {
	#axios;

	constructor() {
		this.#axios = axios.create({
			baseURL: process.env.VUE_APP_BASE_API_URL + '/api',
			timeout: 8000
		});

		this.#axios.interceptors.request.use(
			config => {
				if (config['loading'] === true) {
					Loading.service({
						lock: true,
						text: 'Loading',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
				}
				return Promise.resolve(config);
			},
			error => {
				return Promise.reject(error);
			}
		);


		this.#axios.interceptors.response.use(
			response => {
				return response.data;
			},
			error => {
				return Promise.reject(error);
			}
		);
	}

	/**
	 * get 方法
	 * @param url		{string}
	 * @param params	{Object}
	 * @param config 	{HttpClientConfig}
	 * @returns {Promise<AxiosResponse<*>>}
	 */
	get(url, params = {}, config = {}) {
		return this._send({url, method: 'get', params, ...config});
	}

	/**
	 * post 方法
	 * @param url		{string}
	 * @param data		{Object}
	 * @param config 	{HttpClientConfig}
	 * @returns {Promise<AxiosResponse<*>>}
	 */
	post(url, data = {}, config = {}) {
		return this._send({url, method: 'post', data, ...config});
	}

	/**
	 * put 方法
	 * @param url		{string}
	 * @param config 	{HttpClientConfig}
	 * @returns {Promise<AxiosResponse<*>>}
	 */
	put(url, config = {}) {
		return this._send({url, method: 'put', ...config});
	}

	/**
	 * delete 方法
	 * @param url		{string}
	 * @param config 	{HttpClientConfig}
	 * @returns {Promise<AxiosResponse<*>>}
	 */
	delete(url, config = {}) {
		return this._send({url, method: 'delete', ...config});
	}


	/**
	 * 发送请求
	 * @param config	{AxiosRequestConfig}
	 * @returns {Promise<AxiosResponse<any>>}
	 * @private
	 */
	async _send(config) {
		return await checkToken(config).then(async () => {
			return await this.#axios(config);
		});
	}
}

export const Request = new HttpClient();

export default Request;