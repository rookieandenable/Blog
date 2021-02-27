# JavaScript基础篇之typeof

**变量的数据类型转换**：将一种数据类型转换为另外一种数据类型。

三种形式的类型转换：

- 转成字符串类型

- 转成数字类型

- 转成布尔类型

## typeof 运算符

 **typeof()** 表示 **获取变量的数据类**，返回的是 **小写**，写法：

 ```js
     // 写法1
     typeof 变量

     // 写法2
     typeof(变量)
 ```

 typeof 检查变量类型的返回结果：

 | typeof 的代码写法 | 返回结果  |
| :---------------- | :-------: |
| typeof 数字       |  number   |
| typeof 字符串     |  string   |
| typeof 布尔型     |  boolean  |
| typeof 对象       |  object   |
| typeof 方法       | function  |
| typeof null       |  object   |
| typeof undefined  | undefined |


typeof 无法区分数组，可以使用 instanceof

```js
    [] instanceof Array // true
    {} instanceof Array // false
```

## 变量的类型转换的分类

在JavaScript中，类型的转换分为两种：显式类型转换、隐式类型转换。

### 显式类型转换

- toString()

- String()

- Number()

- parseInt()

- parseFloat()

- Boolean()

### 隐式类型转换

- isNaN()

- 自增/自减运算符：`++`、`--`

- 正号/负号：`+a`、`-a`

- 加号：`+`

- 运算符：`-`、`*`、`/`

### 隐式类型转换（特殊）

- 逻辑运算符： `&&`、`||`、`!`。非布尔值进行**与或**运算时，会先将其转换为布尔值，然后再运算，但运算结果是**原值**。

- 关系运算符：`<`、`>`、`<=`、`>=`等。关系运算符，得到的运算结果都是布尔值：要么是 true，要么是 false。

### 简单类型 转成 String

#### 字符串拼接

示例：

```js
    var a = 12 // Number 类型
    console.log(a + '') // 结果是 String 类型
```

上面代码，把 Number 类型转成 String 类型，实际上内部调用的是 String() 函数。即：a = String(a)

#### 调用 toString() 方法

`变量.toString()`

该方法**不会影响到原变量**，它会将转换的结果返回。

另外，Number 类型的变量，在调用 toString() 方法，可以把数字转换成指定的进制，默认是 10 进制。

```js
    var a = 255
    a= a.toString(2) // 转换成二进制

    console.log(a) // 11111111
```

#### 调用 String() 函数

`String(变量)`

- 对于 Number 和 Boolean 而言，本质上就是调用 toString() 方法

- 但是对于 null 和 undefined，则不会调用 toString() 方法。它会将 null 直接转换为 "null"。把 undefined 直接转换为 "undefined"

### 简单类型 转成 Number

#### 使用 Number() 函数

**字符串 --> 数字**

- 如果是字符串是纯数字，则直接转换成数字

- 如果字符串是一个空串或者全是空格的字符串，则转成 0

- 只要字符串中存在其他包含其他非数字的内容（`小数点` 按数字来算），则转成NaN

**布尔 --> 数字**

- true 转成 1

- false 转成 0

**null --> 数字**

- 结果是 0

**undefined --> 数字**

- 结果是 NaN

#### 调用 parseInt() 函数：字符串 --> 数字

parseInt()的作用是将字符串中的**有效整数**内容转成数字。

**转换情况如下**：

**字符串 --> 数字**

- **只保留字符串最开头的数字**，后面的中文自动消失

- 如果字符串不是以数字开头，则转换为 NaN

- 如果字符串是一个空串或者是一个全是空格的字符串，转换时会报错

**Boolean --> 数字**

- 结果为：NaN

**Null --> 数字**

- 结果为：NaN

**Undefined --> 数字**

- 结果为：NaN

Number() 和 parseInt() 的区别：

- Number(true) ：千方百计地想转换为数字

- parseInt(true)/parseFloat(true) ：先转为字符串，再提取出最前面的数字部分；没提取出来，那就返回 NaN

```js
    console.log(parseInt('2021春雨绵绵')) // 2021
    console.log(parseInt('aaa2021春雨绵绵')) // NaN

    var a = 16.99
    console.log(parseInt(a)) // 16 （先把a转成'16.99',然后再操作）
    console.log(parseInt(null)) // NaN
    console.log(parseInt(true)) // NaN
```

可以进制转换

```js
    var a = '110'

    var result = parseInt(a, 16) // 把 a 当成 十六进制 来看待，转成 十进制 的result

    console.log(result) // 272
```

#### parseFloat() 函数：字符串 --> 浮点数（小数）

parseFloat()的作用是：将字符串转换为**浮点数**

parseFloat()和 parseInt()的作用类似，不同的是，parseFloat()可以获得有效的小数部分

```javascript
var a = '123.56.789px'
console.log(parseFloat(a)) // 123.56
```

### 转换为 Boolean

其他的数据类型都可以转换为 Boolean类型。情况如下：

- 数字 --> 布尔。除了 0 和 NaN，其余的都是 true。也就是说，`Boolean(NaN)`的结果是 false

- 字符串 ---> 布尔。除了空串，其余的都是 true。全是空格的字符串，转换结果也是 true。字符串`'0'`的转换结果也是 true

- null 和 undefined 都会转换为 false

- 引用数据类型会转换为 true。注意，空数组`[]`和空对象`{}`，**转换结果也是 true**

**隐式转换为 Boolean 类型**：

当非 Boolean 类型的数值和 Boolean类型的数值做比较时，会先把前者进行隐式转换为 Boolean类型，然后再做比较

```js
console.log(1 == true); // true
console.log(0 == true); // false
```

**2、显式转换为 Boolean 类型**：

使用 `!!`可以显式转换为 Boolean 类型。比如 `!!3`的结果是 true

使用 Boolean() 函数可以显式转换为 Boolean 类型- 16 进制的数字，以`0x`开头

#### 其他进制的数字

- 8 进制的数字，以`0`开头

- 2 进制的数字，`0b`开头（不是所有的浏览器都支持：chrome 和火狐支持，IE 不支持）

比如`070`这个字符串，如果我调用 parseInt()转成数字时，有些浏览器会当成 8 进制解析，有些会当成 10 进制解析。

可行的做法是：可以在 parseInt()中传递第二个参数，来指定当前数字的进制。例如：

```javascript
var a = "070";

a = parseInt(a, 8); //将 070 当成八进制来看待，转换结果为十进制。
console.log(a); // 56
```


### 隐式类型转换

**隐式类型转换，内部调用的都是显式类型的方法**。

#### isNaN() 函数


```javascript
isNaN(参数);
```

判断指定的参数是否为 NaN（非数字类型），返回结果为 Boolean 类型。也就是说：**任何不能被转换为数值的参数，都会让这个函数返回 true**

**执行过程**：

- 先调用`Number(参数)`函数；

- 然后将`Number(参数)`的返回结果和`NaN`进行比较。

示例：

```javascript
console.log(isNaN('123')); // false。

console.log(isNaN('abc')); // true。Number('abc') 的返回结果是 NaN

console.log(isNaN(null)); // false

console.log(isNaN(undefined)); // true

console.log(isNaN(NaN)); // true
```

#### 自增/自减运算符：`++`、`—-`

**例 1**：

```javascript
var a = "666";
a++;

console.log(typeof a); // number
console.log(a); // 667
```

执行过程：

- 先调用`Number(参数)`函数

- 然后将`Number(参数)`的返回结果进行 加 1 操作

**例 2**：

```javascript
var a = 'abc'
a++
console.log(typeof a) // number
console.log(a) // NaN。因为 Number('abc')的结果为 NaN，再自增后，结果依然是 NaN
```

#### 正号/负号：`+a`、`-a`

> 注意，是正号/负号，不是加号/减号。

任何值做`+a`、`-a`、`/a`运算时，运算结果都会自动转换为 Number 类型。 内部调用的是 Number() 函数。

**例**：

```javascript
var a = '666'
var b = +a

console.log(typeof a) // string。说明 a 的数据类型保持不变。
console.log(a) // 666

console.log(typeof b) // number。说明 b 的数据类型发生了变化。
console.log(b) // 666
```

#### 加号：`+`

**一**：字符串 + 数字

- 当加号的两边，只要有一个是字符串的时候，就会调用 String() 函数将数字转为字符串，然后再计算。导致最终的运算结果是字符串。

**二**：Boolean + 数字

- Boolean 型和数字型相加时， true 按 1 来算 ，false 按 0 来算。这里其实是先调 Number() 函数，将 Boolean 类型转换为 Number类型，然后再和 数字相加。

**三**： null + 数字

- 等价于：0 + 数字

**四**： undefined + 数字

- 计算结果：NaN

#### 运算符：`-`、`*`、`/`

1、任何非 Number 类型的值做`-`、`*`、`/`运算时，会将这些值转换为Number然后再运算(内部调用的是 Number() 函数），运算结果是  Number 类型。（注：`任何值 + 字符串`是特例，运算结果是字符串）

如：

```javascript
    result1 = true + 1;  // 2 = 1+ 1

    result2 = true + false; // 1 = 1+ 0

    result3 = 1 + null; // 1 = 1+ 0

    result4 = 100 - '1' // 99
```

2、任何的值和字符串做加法运算，都会先转换为字符串，然后再做拼串操作。

比如：

```javascript
    result1 = 1 + 2 + '3'  // 33

    result2 = '1' + 2 + 3; // 123
```

3、任何值和NaN做运算的结果都是NaN。


感谢阅读。

如果喜欢或者有所收获，欢迎start，对作者也是一种鼓励。

如果错误或者不严谨的地方，请给予指正，十分感谢。