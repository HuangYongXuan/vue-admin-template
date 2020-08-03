import Vue from 'vue';
import ElementUi from 'element-ui';

if (process.env.NODE_ENV === 'development') {
	require('element-ui/lib/theme-chalk/index.css');
}

import router from '@/router';
import store from '@/store';
import App from '@/App.vue';
import '@/assets/scss/app.scss';
import '@/common/Utils';
import '@/router/RouterHook';

Vue.use(ElementUi);

Vue.config.productionTip = false;

store.dispatch('GenerateRoutes').finally(() => {
	new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app');
});
