<template>
	<el-dialog title="提示" :visible.sync="visible" width="700px" destroy-on-close>
		<md-form :model="data" :ref="formRef" :rules="rules" label-width="80px">
			<el-form-item label="上级目录">
				<el-cascader v-model="data.parentId" :options="tree" :props="{ checkStrictly: true, value:'id', label: 'menuName'}" clearable style="width: 100%"></el-cascader>
			</el-form-item>
			<el-form-item label="菜单名称">
				<el-input v-model="data.menuName"/>
			</el-form-item>
		</md-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="visible = false">取 消</el-button>
			<el-button type="primary" @click="visible = false">确 定</el-button>
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
				visible: true,
				rules: {},
				tree: []
			};
		},
		created() {
			menuApi.list().then(res => {
				this.$utils.responseHandler(res).then(data => {
					this.tree = data;
				});
			});
		},
		computed: {},
		methods: {},
		watch: {}
	};
</script>

<style scoped lang="scss">
	.md-MenuListDialog {
	}
</style>