/**
 * @module		角色Api
 * @author      nayo
 * @date        2020/8/19 5:02 下午
 * @version     1.0
 */

import ApiMaster from '@/common/apis/apiMaster';

export let roleApi = new ApiMaster('/api/backstage/forums/user/role/');

export default roleApi;
