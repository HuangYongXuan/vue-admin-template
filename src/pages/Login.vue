<template>
	<div class="md-login">
		<div class="md-login-container">
			<div class="md-login-header">
				<div class="brand">
					<span class="logo"></span> <b>Vue</b> Admin
					<small>responsive Element UI admin template</small>
				</div>
				<div class="icon">
					<i class="el-icon-lock"></i>
				</div>
			</div>
			<div class="md-login-body">
				<md-form :model="form" @submit="onSubmit" :rules="rules">
					<el-form-item prop="email">
						<el-input placeholder="Email Address" type="email" v-model="form.email"/>
					</el-form-item>
					<el-form-item prop="password">
						<el-input placeholder="Password" type="password" v-model="form.password"/>
					</el-form-item>
					<el-form-item prop="rememberMe">
						<el-checkbox v-model="form.rememberMe">Remember Me</el-checkbox>
					</el-form-item>
					<el-button class="md-block" type="success" native-type="submit">Sign me in</el-button>
				</md-form>
			</div>
		</div>
	</div>
</template>

<script>
	import MdForm from '@/components/form/MdForm';

	export default {
		name: 'Login',
		components: {MdForm},
		data() {
			return {
				form: {
					email: undefined,
					password: undefined,
					rememberMe: false
				},
				rules: {
					email: {
						rules: ['required', 'email'],
						validator: this.$utils.getValidator(),
						trigger: 'blur'
					},
					password: {
						rules: ['required', 'string', 'min:6'],
						validator: this.$utils.getValidator(),
						trigger: 'blur'
					}
				}
			};
		},
		created() {
		},
		computed: {},
		methods: {
			onSubmit() {
				this.$store.dispatch('login', this.form).then(() => {
					this.getUserMenu();
				});
			},
			getUserMenu() {
				this.$store.dispatch('getUserMenu').then(() => {
					this.$router.push({name: 'AdminHome'});
				});
			}
		},
		watch: {}
	};
</script>

<style scoped lang="scss">
	.md-login {
		display: flex;
		align-items: center;
		height: 100vh;
		width: 100%;

		.md-login-container {
			flex: 1;
		}

		.md-login-header {
			width: 400px;
			padding: 0;
			margin: 0 auto 15px auto;
			font-weight: 300;
			position: relative;
			display: flex;
			align-items: center;

			.brand {
				padding: 0;
				font-size: 28px;
				color: #2d353c;

				.logo {
					border: 14px solid transparent;
					border-color: transparent rgba(0, 0, 0, .15) rgba(0, 0, 0, .3);
					background-color: #ab06d0;
					width: 28px;
					height: 28px;
					position: relative;
					font-size: 0;
					margin-right: 10px;
					top: -11px;
					-webkit-border-radius: 6px;
					border-radius: 6px;
				}

				small {
					font-size: 14px;
					display: block;
					color: #4e5c68;
				}
			}

			.icon {
				margin-left: auto;
				color: rgba(45, 53, 60, .15);

				i {
					font-size: 64px;
				}
			}
		}

		.md-login-body {
			padding: 30px;
			background: #2d353c;

			.el-form {
				padding: 0;
				color: #c6ced5;
				width: 400px;
				margin: 0 auto;

				::v-deep {
					.el-checkbox__label {
						color: #c6ced5;
					}
				}
			}
		}
	}
</style>