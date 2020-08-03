/**
 * @module
 * @author      nayo
 * @date        2020/8/3 3:14 下午
 * @version     1.0
 */
import router from '@/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({showSpinner: false});

// const WhiteList = {
// 	LoginEliminate: ['Login', 'Register', 'Login2'],
// 	LogoutRouter: ['Login', 'Register', 'Index', 'ForgotPassword', 'ResetPassword', 'Error404', 'Base', 'Login2']
// };

router.beforeEach(async (to, from, next) => {
	NProgress.start();
	// if (!isGenMenu) {
	// 	await store.dispatch('GenerateRoutes');
	// }

	return next()
});

router.afterEach(() => {
	NProgress.done();
});