/**
 * @module		user api
 * @author      nayo
 * @date        2020/7/29 5:47 下午
 * @version     1.0
 */
import Request from '@/common/Request';

export let userApi = {
	login(data) {
		return Request.post('/api/user/auth', data, {needToken: false, loading: true});
	},
};

export default userApi;