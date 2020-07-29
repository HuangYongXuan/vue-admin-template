export const merge = (into, from) => {
	return Object.assign({}, into, from);
};

export default class VuexLocalSync {
	constructor(options) {
		this.subscriber = (store) => (handler) => store.subscribe(handler);
		this.key = options.key || 'vuex';
		this.storage = options.storage || window.localStorage;
		this.reducer = options.reducer ? options.reducer : ((state) => state);
		this.restoreState = options.restoreState ? options.restoreState : ((key, storage) => {
			const value = (storage).getItem(key);
			if (typeof value === 'string') {
				return JSON.parse(value) || {};
			} else {
				return (value || {});
			}
		});
		this.saveState = options.saveState ? options.saveState : ((key, state, storage) => {
			(storage).setItem(key, JSON.stringify(state));
		});
		this.plugin = async (store) => {
			const savedState = this.restoreState(this.key, this.storage);
			let newState = merge(store.state, savedState || {});

			// TODO vuex 读取处理

			store.replaceState(newState);
			store.subscribe(() => {
				this.saveState(this.key, store.state, this.storage);
			});
		};
	}
}