<template>
	<el-aside :width="(collapsed ? 65 : 270) + 'px'" :class="{'md-aside-collapsed': collapsed}">
		<div class="md-logo">
			<img src="@/assets/images/logo.png" alt="logo">
			<span>Vue Admin Template</span>
		</div>
		<div class="md-user-data" :style="{backgroundImage: 'url(' + cardBackgroundImg +')'}">
			<img :src="user.avatar" alt="avatar"/>
			<div class="md-username">
				<span>{{user.username}}</span>
				<span class="tag-group">
					{{roles.join(',')}}
				</span>
			</div>
		</div>
		<main-aside-menu-content :menus="router" v-if="router && router.length > 0" :collapsed="collapsed"
								 class="md-aside-content"/>
	</el-aside>
</template>

<script>
	import {mapGetters} from 'vuex';
	import MainAsideMenuContent from '@/components/layout/MainAsideMenuContent';

	export default {
		name: 'MainAside',
		components: {MainAsideMenuContent},
		data() {
			return {
				width: 275,
				cardBackgroundImg: require('@/assets/images/cover-2-lg.png'),
				collapsed: false
			};
		},
		created() {
		},
		computed: {
			...mapGetters({user: 'user', router: 'router'}),
			roles() {
				if (this.user && this.user.roles) {
					return this.user.roles.map(role => role.displayName);
				}
				return [];
			}
		},
		methods: {
			collapseAction(b) {
				this.collapsed = b;
			}
		},
		watch: {}
	};
</script>

<style scoped lang="scss">
	.el-aside {
		background-image: linear-gradient(270deg, rgba(51, 148, 225, .18), transparent);
		background-color: #584475;
		height: 100vh;
		transition: all .3s;

		.md-logo {
			height: 60px;
			box-shadow: 0 0 28px 0 rgba(0, 0, 0, .13);
			padding: 0 2rem;
			background-image: linear-gradient(270deg, rgba(51, 148, 225, .18), transparent);
			background-color: #584475;
			color: white;
			display: flex;
			align-items: center;
			justify-content: center;

			img {
				width: 28px;
				height: 28px;
			}

			span {
				padding-left: 5px;
				transition: width .3s;
				display: inline-block;
				width: 220px;
				white-space: nowrap;
			}
		}

		.md-user-data {
			height: 150px;
			transition: height .3s, padding .3s, opacity .3s;
			opacity: 1;
			background-size: auto 100%;
			background-repeat: no-repeat;
			background-position: center;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;
			padding: 10px;

			img {
				width: 60px;
				height: 60px;
				border-radius: 50%;
			}

			.md-username {
				padding-left: 10px;
				color: white;
				display: inline-block;
				width: 160px;
				overflow: hidden;

				> span {
					display: block;
					text-align: left;
					line-height: 28px;

					&:last-child {
						color: rgba(255, 255, 255, .75);
						font-size: 12px;
					}
				}
			}
		}

		&.md-aside-collapsed {
			.md-logo {
				span {
					width: 0;
					overflow: hidden;
				}
			}

			.md-user-data {
				height: 0;
				overflow: hidden;
				padding: 0;
				opacity: 0;
			}
		}

		::v-deep {
			.md-aside-content:not(.el-menu--collapse) {
				width: 270px;
			}

			.el-menu {
				background-color: transparent;
				border-right: none;

				.el-submenu {
					.el-submenu__title {
						color: #af9fc7;

						&:hover {
							background-color: rgba(0, 0, 0, .1);
							color: white;

							i {
								color: white;
							}
						}
					}

					&.is-active {
						.el-submenu__title {
							background-color: rgba(255, 255, 255, .04);
							box-shadow: inset 3px 0 0 #886ab5;
							color: white;

							i {
								color: white;
							}
						}
					}

					.el-menu--inline {
						background-color: rgba(0, 0, 0, .1);
					}
				}

				.el-menu-item {
					color: #af9fc7;

					&:hover {
						background-color: rgba(0, 0, 0, .1);
						color: white;

						i {
							color: white;
						}
					}

					&.is-active {
						color: white;
						background-color: rgba(0, 0, 0, .1);
					}
				}
			}
		}
	}
</style>