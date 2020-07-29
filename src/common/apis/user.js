/**
 * @module
 * @author      nayo
 * @date        2020/7/29 5:47 下午
 * @version     1.0
 */
import Request from '@/common/Request';

export let userApi = {
	login(data) {
		return Request.post('/auth/login', data, {needToken: false});
	}
};

export default userApi;