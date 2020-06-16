function updatedView() {
	console.log('update')
}

const oldArrPrototype = Array.prototype
const arrPrototype = Object.create(oldArrPrototype)
['push', 'pop', 'shift', 'unshift', 'splice'].array.forEach(method => {
	arrPrototype.method = function () {
		updatedView()
		oldArrPrototype[method].call(this, ...args)
	}
});

function defineReactive(target, key, val) {
	observe(val)

	Object.defineProperty(target, key, {
		get() {
			return val
		},
		set(newVal) {
			if (newVal !== val) {
				observe(newVal)
				val = newVal
				updatedView()
			}
		}
	})
}

function observe(target) {
	if (typeof target !== 'object' || target === null) {
		return target
	}

	if (Array.isArray(target)) {
		Object.setPrototypeOf(target, arrPrototype)
	}

	for (let key in target) {
		defineReactive(target, key, target[key])
	}
}

const obj = {
	a: '123',
	b: 2,
	c: {
		c1: 123
	}
}