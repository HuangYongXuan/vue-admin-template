import Vue from 'vue';
import ElementUi from 'element-ui';
import 'xe-utils';
import VXETable from 'vxe-table';

if (process.env.NODE_ENV === 'development') {
	require('element-ui/lib/theme-chalk/index.css');
	require('vxe-table/lib/index.css');
}

import router from '@/router';
import store from '@/store';
import App from '@/App.vue';
import '@/assets/scss/app.scss';
import '@/common/Utils';
import '@/router/RouterHook';

Vue.use(ElementUi);
Vue.use(VXETable);

Vue.config.productionTip = false;

VXETable.interceptor.add('beforeDestroy', (params, event) => {
	console.info(params, event);
});

store.dispatch('GenerateRoutes').finally(() => {
	new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app');
});
