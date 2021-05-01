# ES6之Set数据结构

## 介绍

ES6 提供了新的数据结构 Set。

它类似于数组，但是成员的值都是唯一的，没有重复的值。


### 初始值

Set 本身是一个构造函数，用来生成 Set 数据结构。

```js
    let set = new Set()
```

Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

```js
    let set = new Set([1, 2, 3])
    console.log(set) // Set(3) {1, 2, 3}

    set = new Set(document.querySelectorAll('div'))
    console.log(set.size) // 66

    set = new Set(new Set([1, 2, 3]))
    console.log(set.size) // 3
```

### API

操作方法有：

1. **add(value)** 添加某个值，返回 Set 结构本身
  
2. **delete(value)** 删除某个值，返回一个布尔值，表示删除是否成功

3. **has(value)** 返回一个布尔值，表示该值是否为 Set 的成员

4. **clear()** 清除所有成员，无返回值

举例：

```js
    let set = new Set()
    console.log(set.add(1).add(2)) // Set(2) {1, 2}

    console.log(set.delete(2)) // true
    console.log(set.has(2)) // false

    console.log(set.clear()) // undefined
    console.log(set.has(1)) // false
```

遍历的方法有：

1. keys() 返回键名的遍历器
2. values() 返回键值的遍历器
3. entries() 返回键值对的遍历器
4. forEach() 使用回调函数遍历每个成员，无返回值

属性：

1. Set.prototype.constructor 构造函数，默认就是 Set 函数
2. Set.prototype.size 返回 Set 实例的成员总数

### 模拟 Set 数据结构部分功能实现

模拟实现一个简单的 Set 数据结构，实现 add、delete、has、clear、forEach 方法：

```js
    (function(global) {
      function Set(data) {
        this._values = []
        this.size = 0

        data && data.forEach(function(item) {
          this.add(item)
        }, this)
      }

      Set.prototype['add'] = function(value) {
        if (this._values.indexOf(value) === -1) {
          this._values.push(value)
          ++this.size
        }
      }

      Set.prototype['has'] = function(value) {
        return (this._values.indexOf(value) === -1)
      }

      Set.prototype['delete'] = function(value) {
        var idx = this._values.indexOf(value)
        if (idx === -1) return false
        this._values.splice(idx, 1)
        --this.size
        return true
      }

      Set.prototype['clear'] = function(value) {
        this._values = []
        this.size = 0
      }

      Set.prototype['forEach'] = function(callbackFn, thisArg) {
        thisArg = thisArg || global
        for (var i = 0; i < this._values.length; i++) {
          callbackFn(thisArg, this._values[i], this)
        }
      }

      Set.length = 0

      global.Set = Set

    })(this)
```