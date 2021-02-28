# JavaScript基础篇之变量

## 定义

**变量**：用于存放数据的容器。我们是通过 [ 变量名 ] 获取数据的，甚至可以修改数据。

**本质**：变量是程序在内层中申请的一块用来存放数据的空间

变量还可以用来保存字面量。

PS： 如果变量的储存类型是值类型，那么它保存在**栈内存**。如果是引用类型，那么保存在**堆内存**。

> ”字面量“就是**常量**，它是一个固定的值，不可以改变。看见什么，就是什么。
字面量可以直接用，但是我们一般不会直接去使用它。因为比较麻烦，比如如果有多个地方使用这个字面量，这就需要重复的使用它。所以一般会事先定义一个变量，用来储存这个字面量。

## 字面量

字面量主要有三种：

- 数字

- 布尔型

- 字符串

（1） 数字类型的字面量

```js
    console.log(123) // 123是数字
```

（2）布尔型字面量

```js
    console.log(true)
```

(3) 字符串类型的字面量

```js
    console.log('123') // '123'是字符串
```

## 变量的声明和赋值

### 声明/定义

在ES6之前， 只有一种声明方式，使用 `var`关键字

```js
    var name // 声明一个名为 name 的变量
```

ES6，增加了 `let`，`const` 两种声明方式

```js
    let age
    const name // 定义一个常量
```

### 赋值

```js
    var a = 123
    const b = 'say'
    let c = 'hi'
```

### 初始化

声明一个变量并赋值，我们称之为 `变量的初始化`。

```js
    var age = 21 // 声明age 并且赋值21
    console.log(age) // 输出21
```


## 变量声明提升

### 声明的几种方式

变量建议先声明，再使用。否则可能会出现未知error。如：

写法1、先声明， 再赋值 （正常）

```js
    var age
    age = 123
    console.log(age) // 输出 123
```

写法2、不声明，只赋值 （正常）

```js
    age = 123
    console.log(age) // 输出 123
```

写法3、 只声明，不赋值

```js
    var age
    console.log(age) // undefined
```

写法4、不声明，不赋值，直接使用 （error）

```js
    console.log(age) // error: RferenceError 引用类型错误 因为找不到这个变量
```

### 修改变量的值

一个变量被重复赋值后，它原有的值就会被覆盖，变量值将以最后一次的赋值为准。

```js
    var age = 21
    age = 23
    console.log(age) // 输出 23
```

可以同时声明多个变量，只要写一个var

```js
    var name = 'light', age = 23, addr = 'china'
```


## 关于变量的命名规范

其中，变量名区分 `大小写`, Age 和 age 是两个不同的变量。

```js
    var Age = 21
    var age = 23
```

命名规范：

- 只能由字母、数字、下划线、美元符组成

- 不能以数字开头，变量名中不允许出现空格

- 不能使用 JS 语言的 `关键字` 和 `保留字`

- 建议使用驼峰命名规则。

- 变量名区分大小写，长度不能超过255个字符，不建议使用汉字。

## 标识符 关键字 保留字

### 标识符

定义：在JavaScript中所有的可以由我们自主命名的都可以称为 `标识符`。

如：变量名、函数名、属性名、参数名都属于标识符。

### 关键字

定义：JS本身已经使用了的单词，我们不能再次使用，把它们充当标识符。

JS的关键字：

```js
    this、typeof、undefined、null、false、with、
    true、instanceof、delete、break、continue、
    case、default、if、else、switch、for、in、do、
    while、try、catch、finally、throw、var、void、
    function、return、new
```

### 保留字

指预留的“关键字”，表示 JS 未来可能会使用到。

```js
    abstract、boolean、byte、transient、volatile、debugger、
    goto、float、final、extends、char、class、const、
    double、enum、export、implements、import、int、interface、
    long、native、package、private、protected、public、short、
    static、super、synchronized、throws
```


如果喜欢或者有所收获，欢迎start，对作者也是一种鼓励。

如果错误或者不严谨的地方，请给予指正，十分感谢。