<template>
	<el-dialog :title="`${modeStr}菜单`" :visible.sync="visible" width="800px" destroy-on-close>
		<md-form :model="data" :ref="formRef" :rules="rules" label-width="80px" @submit="onSubmit">
			<el-row :gutter="8">
				<el-col :span="24">
					<el-form-item label="上级目录">
						<el-cascader v-model="data.parentId" :options="tree" :props="{ checkStrictly: true, value:'id', label: 'menuName',emitPath: false}"
									 clearable
									 style="width: 100%"/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="菜单名称" prop="menuName">
						<el-input v-model="data.menuName"/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="菜单类型" prop="menuType">
						<el-select v-model="data.menuType" class="md-block">
							<el-option value="list" label="目录"/>
							<el-option value="menu" label="菜单"/>
							<el-option value="button" label="按钮"/>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="路由路径" prop="path">
						<el-input v-model="data.path"/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="路由名称" prop="name">
						<el-input v-model="data.name"/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="路由组件" prop="component">
						<el-input v-model="data.component"/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="权限标识" prop="perms">
						<el-input v-model="data.perms"/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="路由图标" prop="icon">
						<el-input v-model="data.icon"/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="激活图标" prop="activeIcon">
						<el-input v-model="data.activeIcon"/>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="排序" prop="sort">
						<el-input-number v-model="data.sort" :min="0" :max="999999" :precision="0"/>
					</el-form-item>
				</el-col>
				<el-col :span="18">
					<el-form-item>
						<el-switch v-model="data.visible"></el-switch>
						<span style="padding-right: 20px">是否隐藏</span>
						<el-switch v-model="data.isEnable"></el-switch>
						<span>是否启用</span>
					</el-form-item>
				</el-col>
			</el-row>
		</md-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="visible = false">取 消</el-button>
			<el-button type="primary" @click="onSuccess" :loading="confirmLoading">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import MdModuleModal from '@/components/mixins/MdModuleModal';
	import MdForm from '@/components/form/MdForm';
	import menuApi from '@/common/apis/menu';

	export default {
		name: 'MenuListDialog',
		components: {MdForm},
		mixins: [MdModuleModal],
		data() {
			return {
				visible: false,
				rules: {
					menuName: this.$utils.genElFormRule(['required', 'string']),
					path: this.$utils.genElFormRule(['required', 'string']),
					name: this.$utils.genElFormRule(['required', 'string']),
					menuType: this.$utils.genElFormRule(['required', 'string']),
					sort: this.$utils.genElFormRule(['required', 'integer', 'min:0', 'max:999999'])
				},
				tree: []
			};
		},
		created() {
			menuApi.list({menuType: 'list,menu'}).then(res => {
				this.$utils.responseHandler(res).then(data => {
					this.tree = data;
				});
			});
		},
		computed: {},
		methods: {
			onSubmit() {
				this.confirmLoading = true;
				this.data.children = undefined;
				let promise = this.data.id ? menuApi.update(this.data.id, this.data) : menuApi.save(this.data);
				promise.then((res) => {
					this.$utils.responseHandler(res).then(() => {
						this.visible = false;
						this.$emit('success');
					})
				}).finally(() => this.confirmLoading = false);
			},
			add(data = {}) {
				this.action({
					sort: 1,
					visible: false,
					isEnable: true,
					...data
				}, 'add');
			},
			edit(row) {
				this.action(row, 'edit');
			}
		},
		watch: {}
	};
</script>

<style scoped lang="scss">
	.md-MenuListDialog {
	}
</style>