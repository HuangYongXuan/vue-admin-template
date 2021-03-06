/**
 * @module		公用方法
 * @author      nayo
 * @date        2020/7/29 2:28 下午
 * @version     1.0
 */
import Vue from 'vue';
import RotStorage from 'rot-storage/dist/rot-storage';
// eslint-disable-next-line no-unused-vars
import {AxiosRequestConfig} from 'axios';
import {Message} from 'element-ui';
import validator from 'el-form-validator';
import router from '@/router';

/**
 * storage
 * @returns {RotStorage}
 */
export const storage = () => {
	return new RotStorage.RotStorage({drive: new RotStorage.drive.LocalStorage()});
};

/**
 * 检查用户token
 * @param options	{HttpClientConfig | AxiosRequestConfig}
 * @returns {Promise<any>}
 */
export const checkToken = async (options) => {
	// 访问Token
	const accessToken = storage().get('accessToken');
	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async (resolve, reject) => {
		if (!options.needToken) {
			return resolve();
		}
		if (accessToken) return resolve();
		else reject('_un_login');
	});
};

/**
 * 简单生成最长10位的Uuid
 *
 * @param prefix    {string}    default: ''     前缀
 * @param size      {number}    default: 6      uuid长度 最长10位
 * @return          {string}
 */
export const generateUuid = (prefix = '', size = 6) => {
	return prefix + Math.random().toString(36).slice(2, size + 2);
};


/**
 * 处理 http的响应结果
 * @param data           {Object}        // response的数据 由axios提供返回
 * @param ss            {boolean}       // 是否显示成功消息，默认不显示
 * @param se            {boolean}       // 是否现象错误消息，默认显示
 * @param sm            {string}        // 自定义成功消息
 * @param em            {string}        // 自定义错误消息
 * @returns 			{Promise<Object>}
 */
export const responseHandler = async (data, ss = false, se = true, sm = undefined, em = undefined) => {
	if (!data) {
		return Promise.reject(data);
	}
	if (data.success === true) {
		if (ss) {
			Message({
				type: 'success',
				message: sm || data.message || data.msg,
				duration: 2000
			});
		}
		return Promise.resolve(data.data);
	} else {
		if (se) {
			Message({
				type: 'error',
				message: em || data.message || data.msg,
				duration: 2000
			});
		}
		return Promise.reject(data);
	}
};

/**
 * 获取验证方法
 * @returns {StaticValidator.verification}
 */
export const getValidator = () => {
	return validator.verification;
};

/**
 * 转换数据
 * @param data
 * @param columns
 * @returns {{}}
 */
export const copyData = (data, columns = []) => {
	let obj = {};
	columns.forEach(column => {
		obj[column] = data[column];
	});
	return obj;
};

/**
 * 深度复制obj
 * @param object
 * @returns {{}|*}
 */
export const deepCopy = (object) => {
	if (object === null || object === undefined || typeof object !== 'object') {
		return object;
	}
	let isArray = Array.isArray(object);
	let newObj = {};
	if (isArray) {
		newObj = [];
	}
	for (let key in object) {
		let v = object[key];

		if (typeof v === 'object') {
			newObj[key] = deepCopy(v);
		} else {
			if (isArray) {
				newObj.push(v);
			} else {
				newObj[key] = v;
			}
		}
	}

	return newObj;
};

/**
 * 为字段生成验证规则
 * @param rules
 * @param trigger
 * @returns {{validator: StaticValidator.verification, rules: *, trigger: string}}
 */
export const genElFormRule = (rules, trigger = 'blur') => {
	return {
		rules,
		validator: getValidator(),
		trigger: trigger
	};
};

/**
 *
 * @param menus
 */
export const genRouterMenu = async (menus = []) => {
	let routers = menus.filter(item => ['menu', 'list'].includes(item.menuType)).map(menu => {
		return {
			id: menu.menuId,
			parentId: menu.parentId,
			path: menu.path,
			name: menu.name,
			component: () => import('@/' + menu.component + '.vue'),
			meta: {
				icon: menu.icon,
				activeIcon: menu.activeIcon,
				menuName: menu.menuName,
				visible: menu.visible
			}
		};
	});
	let menuData = treeData(routers);
	await router.addRoutes(menuData);
	return JSON.parse(JSON.stringify(menuData));
};

/**
 * 生成树行数据
 * @param source
 * @param id
 * @param parentId
 * @param children
 * @returns {*}
 */
export const treeData = (source, id, parentId, children) => {
	id = id || 'id';
	parentId = parentId || 'parentId';
	children = children || 'children';
	const cloneData = deepCopy(source);

	let result = [];
	if (!Array.isArray(cloneData)) {
		return result;
	}

	cloneData.forEach(item => {
		delete item.children;
	});
	let map = {};
	cloneData.forEach(item => {
		map[item[id]] = item;
	});
	cloneData.forEach(item => {
		let parent = map[item[parentId]];
		if (parent) {
			(parent[children] || (parent[children] = [])).push(item);
		} else {
			result.push(item);
		}
	});

	return result;
};

export const checkPermission = () => {
	return true;
};

const Utils = {
	storage,
	generateUuid,
	responseHandler,
	getValidator,
	copyData,
	deepCopy,
	genElFormRule
};

Vue.prototype.$utils = Utils;

export default Utils;
