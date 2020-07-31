/**
 * @module		菜单api
 * @author      nayo
 * @date        2020/7/31 2:35 下午
 * @version     1.0
 */
import ApiMaster from '@/common/apis/apiMaster';

export let menuApi = new ApiMaster('/api/backstage/forums/menu');

export default menuApi;