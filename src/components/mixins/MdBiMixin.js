/**
 * @module      bi报表的混入
 * @author      hyx
 * @date        2020/6/2 2:28 下午
 * @version     1.0
 */
import moment from 'moment';

export default {
	methods: {
		_formatJson(data) {
			data = this.$utils.deepCopy(data);
			if (data.widgetLibrary !== 'dashboard') {
				return data;
			}
			data.dataJson.filters = data.dataJson.filters.map((item, index) => {
				if (index === 0 && item.type === 'dynamic') {
					let number = item.filterValues[0];
					if (number > 0) {
						item.filterValues = [
							moment().subtract(number, 'd').startOf('d').format('YYYY-MM-DD HH:mm:ss'),
							moment().endOf('d').format('YYYY-MM-DD HH:mm:ss')
						];
					}
				}
				return item;
			});
			return data;
		},
		getQueryData() {
			let data = this._formatJson(this.widget);
			data = this.$utils.copyData(data, ['datasetId', 'dataJson']);
			try {
				data.dataJson.filters = data.dataJson.filters.map(item => {
					if (item.filters) {
						console.info();
					} else if (item.columnType && item.columnType.toLocaleLowerCase() === 'datetime') {
						console.info();
					} else {
						if (!item.filterValues || item.filterValues.length !== 2 && !item.filterValues[0]) {
							item.filterValues = [];
						}
					}
					return item;
				});
			} catch (e) {

			}
			data.dataJson = JSON.stringify(data.dataJson);
			return data;
		}
	}
};
