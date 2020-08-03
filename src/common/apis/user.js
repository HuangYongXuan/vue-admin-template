/**
 * @module		user api
 * @author      nayo
 * @date        2020/7/29 5:47 下午
 * @version     1.0
 */
import Request from '@/common/Request';

export let userApi = {
	/**
	 * 用户授权
	 * @param data
	 * @returns {Promise<AxiosResponse<*>>}
	 */
	auth(data) {
		return Request.post('/api/user/auth', data, {needToken: false, loading: true});
	},
	/**
	 * 获取用户的菜单
	 * @returns {Promise<AxiosResponse<*>>}
	 */
	menu() {
		return Request.get('/api/user/menu', {}, {needToken: true, loading: true})
	}
};

export default userApi;