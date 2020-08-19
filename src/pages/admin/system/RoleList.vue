<template>
	<div class="md-role-list md-content">
		<md-form :model="query" @submit="getData" inline>
			<el-form-item>
				<el-input v-model="query.name" placeholder="输入名称"/>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" native-type="submit">搜索</el-button>
				<el-button type="success" icon="el-icon-plus" @click="add">创建角色</el-button>
			</el-form-item>
		</md-form>
		<el-table :data="roleList" row-key="id" border>
			<el-table-column prop="name" label="角色名称" align="left" width="140"/>
			<el-table-column prop="displayName" label="显示名称" align="center"/>
			<el-table-column prop="isDefault" label="是否默认" align="center" width="80">
				<template slot-scope="record">
					<el-switch v-model="record.isDefault"/>
				</template>
			</el-table-column>
			<el-table-column prop="canDelete" label="能否删除" align="center" width="80">
				<template slot-scope="record">
					<el-switch v-model="record.canDelete" disabled/>
				</template>
			</el-table-column>
			<el-table-column prop="createdAt" label="创建日期" align="center" :formatter="dateFormatter"/>
			<el-table-column label="操作" align="right" width="220" fixed="right">
				<template slot-scope="record">
					<el-button size="mini" type="success" @click="add({parentId: record.row.id})" v-if="record.row.menuType !== 'button'">添加</el-button>
					<el-button size="mini" type="primary" @click="edit(record)">编辑</el-button>
					<el-button size="mini" type="danger" @click="remove(record)" :disabled="!record.canDelete">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import MdForm from '@/components/form/MdForm';
import roleApi from '@/common/apis/role';
import moment from 'moment';

export default {
	name: 'RoleList',
	components: {MdForm},
	data() {
		return {
			query: {},
			roleList: []
		};
	},
	created() {
		this.getData();
	},
	computed: {},
	methods: {
		getData() {
			roleApi.list(this.query).then(res => {
				this.$utils.responseHandler(res).then((data) => {
					this.roleList = data;
				});
			});
		},
		add() {

		},
		edit() {

		},
		remove() {

		},
		dateFormatter (row, column, cellValue) {

			return moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
		}
	},
	watch: {}
};
</script>

<style scoped lang="scss">
.md-role-list {
}
</style>