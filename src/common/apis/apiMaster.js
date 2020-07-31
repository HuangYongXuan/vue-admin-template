/**
 * @module		Api
 * @author      nayo
 * @date        2020/7/31 2:35 下午
 * @version     1.0
 */
import Request from '@/common/Request';

export default class ApiMaster {
	constructor(baseUrl) {
		this.prefix = baseUrl;
	}

	/**
	 * 获取列表
	 * @param params
	 * @returns {Promise<AxiosResponse<T>>}
	 */
	list(params = {}) {
		return Request.get(this.getUrl('list'), params, {needToken: true, loading: true});
	}

	/**
	 * 保存接口
	 * @param data
	 * @returns {Promise<AxiosResponse<T>>}
	 */
	save(data = undefined) {
		return Request.post(this.getUrl(''), data, {needToken: true, loading: true});
	}

	/**
	 * 保存接口
	 * @param id	{string}
	 * @param data	{Object}
	 * @returns {Promise<AxiosResponse<T>>}
	 */
	update(id, data = undefined) {
		return Request.put(this.getUrl(id), {needToken: true, loading: true, data});
	}


	/**
	 * 获取详情接口
	 * @param id		{string}
	 * @param params	{Object}
	 * @returns {Promise<AxiosResponse<T>>}
	 */
	get(id, params = {}) {
		return Request.get(this.getUrl(id), params, {needToken: true, loading: true});
	}


	/**
	 * 删除接口
	 * @param id 	{string}
	 * @returns {Promise<AxiosResponse<T>>}
	 */
	remove(id) {
		return Request.delete(this.getUrl(id), {needToken: true, loading: true});
	}

	/**
	 *
	 * @param path {string}
	 * @returns {string}
	 */
	getUrl(path) {
		return `${this.prefix}/${path}`;
	}

	/**
	 *
	 * @returns {HttpClient}
	 */
	request() {
		return Request;
	}
}