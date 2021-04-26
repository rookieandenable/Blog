# ES6之const和let


## 介绍

为了加强对**变量**生命周期的控制，ES6引入了块级作用域。

块级作用域存在于：

- 函数内部

- 块之间(大括号{}之间的区域)

**let**和**const**都是块级声明的一种，用于声明在指定的作用域之外无法访问的变量。

## 特点

1. 不会被提升

```js
    if(false) {
        let val = 1
    }
    console.log(val) // value is not defined
```

2. 重复声明报错

```js
    var val = 1
    let val = 2 // val has already been declared
```

3. 不绑定全局作用域

```js
    let val = 1
    console.log(window.val) // undefined
```

**const**声明变量，其值一旦设定就不能再被修改，否则会报错。

但是：const 声明不允许修改绑定，但允许修改值。这意味着当用 const 声明对象时

```js
    const data = {
        val: 1
    }

    // 允许
    data.val = 2
    data.num = 6

    // 报错
    data = {} // Assignment to constant variable
```

### 临时死区

临时死区(Temporal Dead Zone)，简写 TDZ.

let 和 const 声明的变量不会被提升到作用域的顶部，如果在声明之前访问这些变量，会导致报错。

```js
    console.log(typeof val) // val is not defined
    let val = 1
```

解释：因为 JavaScript 引擎在扫描代码发现变量声明时，要么将它们提升到作用域顶部(遇到 var 声明)，要么将声明放在 TDZ 中(遇到 let 和 const 声明)。访问 TDZ 中的变量会触发运行时错误。只有执行过变量声明语句后，变量才会从 TDZ 中移出，然后方可访问。

```js
    var val = 'global'

    // 例子1
    (function() {
        console.log(val)
        let val = 'local'
    })()

    // 例子2
    {
        console.log(val)
        const val = 'local'
    }
```

两个例子中，结果并不会打印 ‘global’，而是 val is not undefined，就是因为 TDZ 缘故。


### 循环中的块级作用域

```js
    var funcs = []
    for (var i = 0; i < 3; i++) {
        funcs[i] = function () {
            console.log(i)
        }
    }
    funcs[0]() // 3
```

解决方案之一：

```js
   var funcs = []
   for (var i = 0; i < 3; i++) {
       funcs[i] = (function (i) {
           console.log(i)
       }(i))
   }
   funcs[0]() // 0
```

ES6 let

```js
    var funcs = []
    for (let i = 0; i < 3; i++) {
        funcs[i] = function () {
            console.log(i)
        }
    }
    funcs[0]() // 0
```

我们发现，在 for 循环中使用 let 和 var，底层会使用不同的处理方式。

那么，当使用 let 的时候底层到底是怎么做的呢

简单来说，在 for (let i = 0; i < 3; i++) 中，圆括号之内建立一个隐藏的作用域

```js
    for (let i = 0; i  3; i++) {
        let i = 'abc'
        console.log(i)
    }
    // abc
    // abc
    // abc
```

然后**每次迭代循环时都创建一个新变量，并以之前迭代中同名变量的值将其初始化**。

```js
    var funcs = []
    for (let i = 0; i < 3; i++) {
        funcs[i] = function () {
            console.log(i)
        }
    }
    funcs[0]()
```

相当于

```js
    // 伪代码
    (let i = 0) {
        funcs[0] = function () {
            console.log(i)
        }
    }

    (let i = 1) {
        funcs[1] = function () {
            console.log(i)
        }
    }

    (let i = 2) 
    funcs[2] = function () {
        console.log(i)
    }
```

当执行函数的时候，根据词法作用域就可以找到正确的值，其实你也可以理解为 let 声明模仿了闭包的做法来简化循环过程。

```js
    var funcs = []
    for (const i = 0; i < 3; i++) {
        funcs[i] = function () {
            console.log(i)
        }
    }
    funcs[0]() // Assignment to constant variable
```

结果是会报错，因为虽然我们每次都创建来一个新的变量，然而我们却在迭代中尝试修改 const 的值
，所以最终会报错。

```js
   var funcs = [], object = {a: 1, b: 2, c: 3}
   for (const key in object) {
       funcs.push(function() {
           console.log(key)
       })
   }
   funcs[0]() // a
```

结果正确打印 a 这是因为在 for in 循环中，每次迭代不会修改已有的绑定，而是会创建一个新的绑定。


### Babel

在 Babel 中是如何编译 let 和 const 的呢 来看看编译后的代码

```js
    let val = 1
```

编译为

```js
    var val = 1
```

可以看到 Babel 直接将 let 编译成来 var 

```js
    let val = 1
    {
        let val = 2
    }
    val = 3
```

```js
    var val = 1
    {
        var _val = 2
    }
    val = 3
```

本质是一样的，就是改变变量名，使内外层的变量名称不一样。

const 的修改值报错，以及重复声明报错怎么实现的呢

其实就是在编译的时候直接给你报错

let 循环

```js
    var funcs = []
    for (let i = 0; i < 3; i++) {
        funcs[i] = function() {
            console.log(i)
        }
    }
    funcs[0]() // 0
```

Babel 巧妙的编译成

```js
    var funcs = []

    var _loop = function _loop(i) {
        funcs[i] = function() {
            console.log(i)
        }
    }

    for (var i = 0; i < 3; i++) {
        _loop(i)
    }
    funcs[0]() // 0
```


在我们开发的时候，可能认为应该默认使用 let 而不是 var，这种情况下，对于需要写保护的变量要使用 const。然而另一种做法日益普及：默认使用 const，只有当确实需要改变变量的值的时候才使用 let。这是因为大部分的变量的值在初始化后不应再改变，而预料之外的变量的改变是很多 bug 的源头。