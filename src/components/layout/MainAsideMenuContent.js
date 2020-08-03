/**
 * @module		侧边菜单
 * @author      nayo
 * @date        2020/8/3 3:41 下午
 * @version     1.0
 */

import {Menu, Submenu, MenuItem} from 'element-ui';

export default {
	name: 'MainAsideMenuContent',
	props: {
		collapsed: {
			type: Boolean,
			required: false,
			default: false
		},
		menus: {
			type: Array,
			default: () => []
		},
		model: {
			type: String,
			default: 'vertical'
		}
	},
	data() {
		return {
			defaultActive: ''
		};
	},
	created() {
		this.defaultActive = this.$route.name;
	},
	watch: {
		$route(val) {
			this.defaultActive = val.name;
		}
	},
	methods: {
		renderItem(menu) {
			if (menu.meta.visible) {
				return (menu.children && menu.children.length > 0) ? this.renderSubMenu(menu) : this.renderMenuItem(menu);
			}
			return null;
		},
		renderSubMenu(menu) {
			const itemArr = [];
			if (menu.children && menu.children.length > 0) {
				menu.children.forEach(item => itemArr.push(this.renderItem(item)));
			}
			return (
				<Submenu {...{props: {index: menu.name}}}>
					<template slot="title">
						<i class={menu.meta.icon}/>
						<span slot="title">{menu.meta.menuName}</span>
					</template>
					{itemArr}
				</Submenu>
			);
		},
		renderMenuItem(menu) {
			return (
				<MenuItem {...{props: {index: menu.name, route: {name: menu.name}}}}>
					<i class={menu.meta.icon}/>
					<span>{menu.meta.menuName}</span>
				</MenuItem>
			);
		}
	},
	render() {
		let {model, collapsed, menus} = this;
		let props = {
			collapse: collapsed,
			mode: model,
			router: true,
			defaultActive: this.defaultActive
		};
		const menuTree = menus.map(item => {
			if (item.hidden) {
				return null;
			}
			return this.renderItem(item);
		});
		return (
			<Menu {...{props}}>
				{menuTree}
			</Menu>
		);
	}
};