/**
 * @module      拖动元素
 * @author      hyx
 * @date        2020/3/30 3:26 下午
 * @version     1.0
 */

export default {
	data() {
		return {
			moveEl: undefined,
			canMove: false,
			addClass: 'md-move',
			resetClass: 'md-ul-li-d',
			els: []
		};
	},
	created() {
		document.addEventListener('mousemove', this.documentMousemove);
		document.addEventListener('mouseup', this.documentMouseup);
	},
	methods: {
		mousedown(event, m, qClass) {
			let target = event.target;
			let cloneEl = target.cloneNode(true);
			cloneEl._data = m;
			let left = event.clientX - event.offsetX;
			let top = event.clientY - event.offsetY;
			let width = target.offsetWidth;
			let height = target.offsetHeight;
			cloneEl._x = event.offsetX;
			cloneEl._y = event.offsetY;
			cloneEl.setAttribute('style', `left: ${left}px;top: ${top}px; width: ${width}px;height: ${height}px`);
			document.body.appendChild(cloneEl);
			cloneEl.className += ' ' + this.addClass;
			this.moveEl = cloneEl;
			this.canMove = true;
			this.els = document.querySelectorAll(qClass);
			this.els.forEach(el => {
				el.style.boxShadow = '0 0 10px 0px #999';
			});
		},
		documentMousemove(e) {
			if (this.canMove === true) {
				let left = e.clientX - this.moveEl._x;
				let top = e.clientY - this.moveEl._y;
				let width = this.moveEl.offsetWidth;
				let height = this.moveEl.offsetHeight;
				this.moveEl.setAttribute('style', `left: ${left}px;top: ${top}px; width: ${width}px;height: ${height}px`);
				this.els.forEach(el => {
					let box = this.getBoxCoords(el);
					let x = e.clientX;
					let y = e.clientY;

					if (box.x <= x && x <= box._x && box.y <= y && y <= box._y) {
						el.style.backgroundColor = '#e3e3e3';
					} else {
						el.style.backgroundColor = '#fff';
					}
				});
			}
		},
		documentMouseup(e) {
			if (this.canMove === true) {
				document.body.removeChild(this.moveEl);
				this.canMove = false;
				this.els.forEach(el => {
					el.style.backgroundColor = '#fff';
					el.style.boxShadow = 'none';
					let box = this.getBoxCoords(el);
					let x = e.clientX;
					let y = e.clientY;

					if (box.x <= x && x <= box._x && box.y <= y && y <= box._y) {
						let type = el.getAttribute('type');
						let data = this.$utils.deepCopy(this.moveEl._data);
						console.info(type);
						this.$bus.emit(type, data);
					} else {
						console.info();
					}
				});
			}
		},
		getBoxCoords(el) {
			let box = {};
			box.x = el.offsetLeft - document.documentElement.scrollLeft;
			box.y = el.offsetTop - document.documentElement.scrollTop;
			let parent = el.offsetParent;
			do {
				box.x += parent.offsetLeft;
				box.y += parent.offsetTop;
				parent = parent.offsetParent;
			} while (parent);
			box._x = el.offsetWidth + box.x;
			box._y = el.offsetHeight + box.y;
			return box;
		}
	},
	destroyed() {
		document.removeEventListener('mousemove', this.documentMousemove);
		document.removeEventListener('mouseup', this.documentMouseup);
	}
};
