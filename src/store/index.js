/**
 * @module		vuex 配置
 * @author      nayo
 * @date        2020/7/29 1:46 下午
 * @version     1.0
 */
import Vue from 'vue';
import Vuex from 'vuex';
import VuexLocalSync from '@/store/plugins/VuexStorage';

Vue.use(Vuex);

import User from '@/store/modules/User';

const modules = {
	...User
};

const VueLocalSyncPlugin = new VuexLocalSync({
	key: 'store',
	storage: window.localStorage
});

export default new Vuex.Store({
	modules,
	plugins: [VueLocalSyncPlugin.plugin]
});