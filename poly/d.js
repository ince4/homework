function a (obj) {
    const handler = {
        get(target, key, receiver) {
            return Reflect.get(target, key)
            // return 'sb'
        },
        set(target, key, val, receiver) {
            console.log('??/')
            return Reflect.set(target, key, 'wos')
        }
    }
    return new Proxy(obj, handler)
}

let oo = {
    asd: 1,
    zxc: 2,
    z: {
        a:123
    }
}

let b = a(oo)
b.z = 9
console.log(b)