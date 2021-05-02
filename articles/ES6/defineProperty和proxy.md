# ES6 之 defineProperty 和 proxy


## 介绍

**数据绑定**这个词，关键在于监听数据的变化，可以对于这样一个对象， `var obj = { value: 1 }`，我们该怎么知道 obj 发生了改变。


### defineProperty

ES5 提供了 Object.defineProperty 方法，该方法可以在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象。

**object.defineProperty(obj, prop, descriptor)**

参数：

```js
    obj: 要在其上定义属性的对象。

    prop: 要定义或修改的属性的名称。

    descriptor: 将被定义或修改的属性的描述符。
```

```js
    var obj = {}
    Object.defineProperty(obj, 'num', {
      value: 1,
      writable: true,
      enumerable: true,
      configurable: true
    })
    // 对象 obj 拥有属性 num，值为 1
```

虽然我们可以直接添加属性和值，但是使用这种方式，我们能进行更多的配置。

函数的第三个参数 descriptor 所表示的属性描述符有两种形式：**数据描述符和存取描述符**

**两者均具有以下两种键值**

**configurable**

`当且仅当该属性的 configurable 为 true时，该属性描述符才能够被改变，也能够被删除。 默认为 false`

**enumerable**

`该属性的 enumerable 为 true 时，该属性才能够出现在对象的枚举属性中。默认为 false`

**数据描述符同时具有以下可选键值**

**value**

`该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认 undefined`

**writable**

`该属性的 writable 为 true 时，该属性才能够被赋值运算符改变。默认 false`

**存取描述符同时具有以下可选键值**

**get**

`y一个给属性提供 getter 的方法，如果没有 getter 则为 undefined. 该方法的返回值被用作属性值。默认 undefined`

**set**

`一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为 undefined。
`

**属性描述符必须是数据描述符或者存取描述符两种形式之一，不能同时是两者 。**

```js
Object.defineProperty({}, "num", {
    value: 1,
    writable: true,
    enumerable: true,
    configurable: true
})
```

也可以：

```js
var value = 1;
Object.defineProperty({}, "num", {
    get : function(){
      return value
    },
    set : function(newValue){
      value = newValue;
    },
    enumerable : true,
    configurable : true
})
```

但是不可以：

```js
// 报错
Object.defineProperty({}, "num", {
    value: 1,
    get: function() {
        return 1
    }
})
```


此外，所有的属性描述符都是非必须的，但是 descriptor 这个字段是必须的，如果不进行任何配置，你可以这样：

```js
var obj = Object.defineProperty({}, "num", {});
console.log(obj.num); // undefined
```


### Setters 和 Getters