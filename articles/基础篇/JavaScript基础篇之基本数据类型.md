# JavaScript基础篇之基本数据类型

## String 字符串

### 语法

字符串可以是引号中的任意文本，其语法为：双引号 `""` 或者单引号 `''` 

示例：

```js
    var a = 'abc'
    var b = "123"
    var c = '变成光'
    var d = ''

    typeof a  // string
    typeof b  // string
    typeof c  // string
    typeof d  // string
```

### 转义符

在字符串中我们可以使用 `\` 作为转移字符，当表示一些特殊符号时可以使用 `\` 进行转义。

- `\"` 表示 `"` 双引号

- `\'` 表示 `'` 单引号

- `\\` 表示 `、` \

- `\r` 表示 回车

- `\n` 表示 换行

- `\t` 表示 缩进

- `\b` 表示 空格

示例：

```js
    var str1 = '\"今\t天不错儿\"'
    var str2 = '\\\'
    
    console.log(str1) //  今  天不错儿
    console.log(str2) // \\
```


### 获取字符串的长度

字符串由若干个字符组成，这些字符的数量就是字符串的长度。我们可以通过字符串的 length 属性拿到整个字符串的长度。

示例：

```js
    var str1 = 'abcdf'
    var str2 = 'trunintolight'
    var str3 = '正道的光芒'

    console.log(str1.length) // 5
    console.log(str2.length) // 13
    console.log(str3.length) // 5
```

在判断字符串的长度时：

- 一个中文算一个字符，一个英文算一个字符。

- 一个标点符号算一个字符。

- 一个空格算一个字符。

### 字符串的拼接

多个字符串之间可以使用加号 `+` 进行拼接。

语法： 
 
```js
    字符串 + 任意数据类型 = 拼接之后的新字符串
```

拼接前，会把与字符串相加的这个数据类型转成字符串，然后再拼接成一个新的字符串。

示例：

```js
    var str1 = 'a' + 'b'
    var str2 = 'a' + 123
    var str3 = 'a' + undefined

    console.log(str1) // ab
    console.log(str2) // a123
    console.log(str3) // aundefined
```

### 字符串的不变性

字符串里面的值不可被改变。虽然看上去可以改变内容，但是其实是地址变了，内存中新开辟了一个新的空间。

示例：

```js
    var str = 'ab'
    str = 'ff'
```

上面代码，重新给变量str赋值时，常量 **ab** 不会被修改，依然保存在内存中。str 会改为指向 **ff**。

### 模板字符串

ES6引入了 **模板字符串**。

示例：

```js
    var name = 'trunintolight'
    var age = '23'
    
    console.log('我的名字是' + name + ',age:' + age) // 传统拼接写法
    console.log(`我的名字是${name},age:${age}`) // ES6写法
```


## 布尔值： Boolean

布尔型有两个值：**ture** 和 **false**。主要用来做逻辑判断: true 表示真，false 表示假。

示例：

```js
    var a = true

    typeof a // boolean
```

布尔型和数字类型相加时，true 按 1 来算，false 按 0 来算。


## 数值型：Number

在JavaScript中所有的数值都是 **Number** 类型，包括整数和浮点数（小数）。

```js
    var a = 23
    console.log(typeof a) // number

    var b = 1.2
    console.log(typeof b) // number
```

### 数字范围

由于内存的限制，所以不能保存世界上所有的数值。

- 最大值：**Number.MAX_VALUE**，这个值为：1.7976931348623157e+308

- 最小值：**Number.MIN_VALUE**，这个值为： 5e-324。

如果使用 Number 表示的变量超过了最大值，则会返回 Infinity。

- 无穷大（正无穷）： Infinity

- 无穷小（负无穷）： -Infifigy

PS: **typeof Infinity** 的返回结果是 number

### NaN

是一个特殊的数字，表示 **Not a Number**，非数值。如：

```js
    console.log('ac' / 10) // NaN
    console.log('a' * 'b') // NaN
```

PS: **typeof NaN** 的结果是 number

Undefined 和任何数值计算的结果为 NaN。NaN 与任何值都不相等，包括 NaN 本身。


## Null 和 Undefined

### Null：空对象

null 专门用来定义一个空对象 （var a = null）

- Null 类型的值只有一个，就是 null。

- 使用 typeof 检查一个 null 值时，会返回 object。

### Undefined

#### 变量已经声明，未赋值时

声明了一个变量，但没有赋值，此时它的值就是 **undefined**。

```js
    var name
    console.log(name) // undefined
    typeof name // undefined
```

- Undefined 类型的值只有一个，就是 undefined。

- 使用 typeof 检查一个 undefined 值时，就会返回 undefined。

#### 变量未声明（未定义）时

```js
    console.log(typeof a) // undefined
    console.log(a) // error: ReferenceError
```

#### 函数无返回值时

如果一个函数没有返回值，那么这个函数的返回值就是 undefined。

```js
    function foo() {}
    cosnole.log(foo()) // undefined
```

#### 调用函数时，未传参

调用函数时，如果没有传参，那个这个参数的值就是 undefined。

```js
    // 调用函数时，如果没有传参，可以给形参设置一个默认值
    function foo(name) {
        name = name || 'sun'
    }

    foo()

    // ES6
    function bar(name='sun') {}

    bar()
```

#### null 和 undefined 区别

null 和 undefined 的相似性。**null == undefined** 的结果是 **true**。

但是，**null === undefined** 的结果是 **false**，所以还是有区别的。

- 任何数字类型和 undefined 运算都是 NaN

- 任何值和 null 运算，null 可看做 0


如果喜欢或者有所收获，欢迎start，对作者也是一种鼓励。

如果错误或者不严谨的地方，请给予指正，十分感谢。