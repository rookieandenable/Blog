# JavaScript基础篇之内置对象 String、Number、Math 和 Date


## 内置对象

> JavaScript 中的对象分为3种：自定义对象 、内置对象、 浏览器对象。

> 前面两种对象：是JS的基础内容，属于 ECMAScript； 第三个浏览器对象：属于JS独有，即 JS 内置的API。

**内置对象**：就是指这个语言自带的一些对象，供开发者使用，这些对象提供了一些常用或者最基本而必要的功能（属性和方法）。

内置对象最大的优点就是帮助我们快速开发。

**JavaScript的内置对象**：

| 内置对象 | 对象说明 |
|:-------------|:-------------|
|  Arguments | 函数参数集合|
|  Array | 数组|
|  Boolean | 布尔对象|
|  Math | 数学对象|
|  Date | 日期时间|
|  Error | 异常对象|
|  Function | 函数构造器|
|  Number | 数值对象|
|  Object | 基础对象|
|  RegExp | 正则表达式对象|
|  String | 字符串对象|



## 字符串前言

> 在开发中，String 对象（字符串对象）的使用频率是非常高的。

注意：**字符串的所有方法，都不会改变原字符串**（字符串的不可变性），操作完成后会返回一个新的值。

字符串的常见方法如下。

## 查找字符串

### 1、indexOf()/lastIndexOf()：获取字符串中指定内容的索引


**语法 1**：

```js
索引值 = str.indexOf(想要查询的字符串)
```

备注：`indexOf()` 是从前向后查找字符串的位置。同理，`lastIndexOf()`是从后向前寻找。

**解释**：可以检索一个字符串中是否含有指定内容。如果字符串中含有该内容，则会返回其**第一次出现**的索引；如果没有找到指定的内容，则返回 -1。

-   **如果获取的索引值为 0，说明字符串是以查询的参数为开头的**。

-   如果获取的索引值为-1，说明这个字符串中没有指定的内容。

例 1：(查找单个字符)

```js
const str = 'abcdea'

//给字符查索引(索引值为0,说明字符串以查询的参数为开头)
console.log(str.indexOf('c'))
console.log(str.lastIndexOf('c'))

console.log(str.indexOf('a'))
console.log(str.lastIndexOf('a'))
```

例 2：（查找字符串）

```js
const name = 'sun'

console.log(name.indexOf('n')) // 结果：2
```

**语法 2**：

这个方法还可以指定第二个参数，用来指定查找的**起始位置**。语法如下：

```js
索引值 = str.indexOf(想要查询的字符串, [起始位置])
```

举例 3：（两个参数）

```js
var str = 'suntom'
result = str.indexOf('o', 3) // 从第三个位置开始查找 '0'这个字符

console.log(result) // 结果：4
```

上方代码中，`indexOf()`方法中携带了两个参数

### indexOf 例

**案例**：查找字符串"suntom"中，所有 `0` 出现的位置以及次数。

思路：

（1）先查找第一个 0 出现的位置。

（2）只要 indexOf 返回的结果不是 -1 就继续往后查找。

（3）因为 indexOf 只能查找到第一个，所以后面的查找，可以利用第二个参数，在当前索引加 1，从而继续查找。

```js
var str = 'satom'
var index = str.indexOf('a')
var num = 0
while (index !== -1) {
    console.log(index)
    num++ // 每打印一次，就计数一次
    index = str.indexOf('o', index + 1)
}

console.log('a 出现的次数是: ' + num)
```


### 2、search()：获取字符串中指定内容的索引（参数里一般是正则）


**语法**：

```js
索引值 = str.search(想要查找的字符串)
索引值 = str.search(正则表达式)

```

备注：`search()` 方法里的参数，既可以传字符串，也可以传正则表达式。

**解释**：可以检索一个字符串中是否含有指定内容。如果字符串中含有该内容，则会返回其**第一次出现**的索引；如果没有找到指定的内容，则返回 -1。


举例：

```js
const name = 'suntom'

console.log(name.search('sun'))
console.log(name.search(/\sun/i))
```


### 3、includes()：字符串中是否包含指定的内容

**语法**：

```js
布尔值 = str.includes(想要查找的字符串, [position])
```

**解释**：判断一个字符串中是否含有指定内容。如果字符串中含有该内容，则会返回 true；否则返回 false。

参数中的 `position`：如果不指定，则默认为0；如果指定，则规定了检索的起始位置。

```js
const name = 'suntom'

console.log(name.includes('sun')) // 打印结果：true
```

### 4、startsWith()：字符串是否以指定的内容开头

**语法**：

```js
布尔值 = str.startsWith(想要查找的内容, [position])
```

**解释**：判断一个字符串是否以指定的子字符串开头。如果是，则返回 true；否则返回 false。

**参数中的position**：

- 如果不指定，则默认为0。

- 如果指定，则规定了**检索的起始位置**。检索的范围包括：这个指定位置开始，直到字符串的末尾。即：[position, str.length)

例：

```js
const name = 'abcdefg'

console.log(name.startsWith('b')) // 打印结果：false

// 因为指定了起始位置为3，所以是在 defg 这个字符串中检索。
console.log(name.startsWith('d',3)) // 打印结果：true
```

### 5、endsWith()：字符串是否以指定的内容结尾

**语法**：

```js
布尔值 = str.endsWith(想要查找的内容, [position])
```

**解释**：判断一个字符串是否以指定的子字符串结尾。如果是，则返回 true；否则返回 false。

**参数中的position**：

- 如果不指定，则默认为 str.length。

- 如果指定，则规定了**检索的结束位置**。检索的范围包括：从第一个字符串开始，直到这个指定的位置。即：[0, position)

- 或者你可以这样简单理解：endsWith() 方法里的position，表示**检索的长度**。

注意：startsWith() 和 endsWith()这两个方法，他们的 position 的含义是不同的，请仔细区分。

举例：

```js
const name = 'abcdefg'

console.log(name.endsWith('g')) // 打印结果：true

// 因为指定了截止位置为3，所以是在 abc 这个长度为3字符串中检索
console.log(name.endsWith('c', 3)) // 打印结果：true
```

## 获取指定位置的字符

### 1、charAt(index)

语法：

```javascript
字符 = str.charAt(index)
```

解释：返回字符串指定位置的字符。这里的 `str.charAt(index)`和`str[index]`的效果是一样的。

注意：字符串中第一个字符的下标是 0。如果参数 index 不在 [0, string.length) 之间，该方法将返回一个空字符串。

**代码举例**：

```js
var str = new String('smyhvae')

for (var i = 0; i < str.length; i++) {
    console.log(str.charAt(i))
}
```

### 2、str[index]

`str.charAt(index)`和`str[index]`的效果是一样的，不再赘述。区别在于：`str[index]`是 H5 标准里新增的特性。

### 3、charCodeAt(index)

语法：

```js
字符 = str.charCodeAt(index)
```

解释：返回字符串指定位置的字符的 Unicode 编码。不会修改原字符串。

sort()方法其实底层也是用到了 charCodeAt()，因为用到了 Unicode 编码。（一个中文占两个字符位）

## 字符串截取


### 1、slice()


语法：

```js
新字符串 = str.slice(开始索引, 结束索引) //两个参数都是索引值。包左不包右。
```

解释：从字符串中截取指定的内容。不会修改原字符串，而是将及截取到的内容返回。

注意：上面的参数，包左不包右。参数举例如下：

- `(2, 5)` 截取时，包左不包右。

- `(2)` 表示**从指定的索引位置开始，截取到最后**。

- `(-3)` 表示从倒数第三个开始，截取到最后。

- `(1, -1)` 表示从第一个截取到倒数第一个。

- `(5, 2)` 表示前面的大，后面的小，返回值为空。

### 2、substring()

语法：

```js
新字符串 = str.substring(开始索引, 结束索引) //两个参数都是索引值。包左不包右。
```

解释：从字符串中截取指定的内容。和`slice()`类似。

`substring()`和`slice()`是类似的。但不同之处在于：

- `substring()`不能接受负值作为参数。如果传递了一个**负值**，则默认使用 0。

- `substring()`还会自动调整参数的位置，如果第二个参数小于第一个，则自动交换。比如说， `substring(1, 0)`相当于截取的是第一个字符。

### 3、substr()

语法：

```js
字符串 = str.substr(开始索引, 截取的长度)
```

解释：从字符串中截取指定的内容。不会修改原字符串，而是将及截取到的内容返回。

注意，这个方法的第二个参数**截取的长度**，不是结束索引。

参数举例：

- `(2,4)` 从索引值为 2 的字符开始，截取 4 个字符。

- `(1)` 从指定位置开始，截取到最后。

- `(-3)` 从倒数第几个开始，截取到最后.

备注：ECMAscript 没有对 `substr()` 方法进行标准化，因此不建议使用它。



## String.fromCharCode()

`String.fromCharCode()`：根据字符的 Unicode 编码获取字符。

代码举例：

```js
var result1 = String.fromCharCode(72)
var result2 = String.fromCharCode(20013)

console.log(result1) // 打印结果：H
console.log(result2) // 打印结果：中
```

## concat()

语法：

```js
    新字符串 = str1.concat(str2)； //连接两个字符串
```

解释：字符串的连接。


数组中也有`concat()`方法，用于数组的连接。这个方法在数组中用得挺多的。

例：

```js
var str1 = 'sun'
var str2 = 'tom'

var result = str1.concat(str2)
console.log(result) // suntom
```

## split()：字符串转换为数组

语法：

```js
新的数组 = str.split(分隔符)
```

解释：通过指定的分隔符，将一个字符串拆分成一个**数组**。不会改变原字符串。

备注：`split()`这个方法在实际开发中用得非常多。一般来说，从接口拿到的 json 数据中，经常会收到类似于`"s, u, n, n"`这样的字符串，前端需要将这个字符串拆分成`['s', 'u', 'n', 'n']`数组，这个时候`split()`方法就派上用场了。


## replace()

语法：

```js
新的字符串 = str.replace(被替换的字符，新的字符)
```

解释：将字符串中的指定内容，替换为新的内容并返回。不会修改原字符串。

注意：这个方法，默认只会替换第一个被匹配到的字符。如果要全局替换，需要使用正则。

代码举例：

```js
//replace()方法：替换
var str2 = 'Today is fine day,today is fine day !'
console.log(str2)

console.log(str2.replace('today', 'tomorrow')) //只能替换第一个today
console.log(str2.replace(/today/gi, 'tomorrow')) //这里用到了正则，才能替换所有的today
```

## repeat()：重复字符串

语法：

```js
newStr = str.repeat(重复的次数)
```

解释：将字符串重复指定的次数。会返回新的值，不会修改原字符串。

举例1：

```js
const name = 'sun'

console.log(name.repeat(2)) // sunsun
```

例：（模糊字符串的后四位）

```js
const telephone = '13088889999'
const mix_telephone = telephone.slice(0, -4) + '*'.repeat(4) // 模糊电话号码的后四位

console.log(telephone) // 13088889999
console.log(mix_telephone) // 1308888****
```


## trim()

`trim()`：去除字符串前后的空白。

代码举例：

```js
//去除字符串前后的空格，trim()
let str = '   a   b   c   '
console.log(str)
console.log(str.length)

console.log(str.trim())
console.log(str.trim().length)
```

## 大小写转换

举例：

```js
var str = 'abcdEFG'

//转换成小写
console.log(str.toLowerCase())

//转换成大写
console.log(str.toUpperCase())
```

## html 方法

- anchor() 创建 a 链接

- big()

- sub()

- sup()

- link()

- bold()

str.link() 返回值是字符串。

例：

```js
var str = '你好'

console.log(str.anchor())
console.log(str.big())
console.log(str.sub())
console.log(str.sup())
console.log(str.link('http://www.baidu.com'))
console.log(str.bold())
```


## Number 和 Math


## Number 常见方法


### Number.isInteger() 判断是否为整数

语法：

```
布尔值 = Number.isInteger(数字);
```


### toFixed() 小数点后面保留多少位

语法：

```js
字符串 = myNum.toFixed(num);
```

解释：将数字 myNum 的小数点后面保留 num 位小数（四舍五入），并返回。不会改变原数字。注意，**返回结果是字符串**。

参数 num：指定了小数点后面的位数。

例：

```js
let num = 3.456
let num2 = num.toFixed(2)

console.log(num) // 3.456
console.log(num2) // 3.47

console.log(typeof num) // number
console.log(typeof num2) // string
```

上方代码中，`num2`的结果是0.12，但是请注意，`num`的类型Number型，而`num`的类型却是String型。


## Math 常见方法

Math 和其他的对象不同，它不是一个构造函数，不需要创建对象。所以我们不需要 通过 new 来调用，而是直接使用里面的属性和方法即可。

Math属于一个工具类，里面封装了数学运算相关的属性和方法。如下：

| 方法 | 描述 | 备注 |
|:-------------|:-------------|:-------------|
| Math.PI | 圆周率 | Math对象的属性  |
| Math.abs() |  **返回绝对值** |  |
| Math.random() | 生成0-1之间的**随机浮点数** | 取值范围是 [0，1) |
| Math.floor() | **向下取整**（往小取值） |  |
| Math.ceil() | **向上取整**（往大取值） |  |
| Math.round() | 四舍五入取整（正数四舍五入，负数五舍六入） |  |
| Math.max(x, y, z)  | 返回多个数中的最大值 |  |
| Math.min(x, y, z)  | 返回多个数中的最小值 |  |
| Math.pow(x,y) | 乘方：返回 x 的 y 次幂 |  |
| Math.sqrt() | 开方：对一个数进行开方运算 |  |



**例**：

```javascript
    var num = -0.6;

    console.log(Math.abs(num));        //取绝对值 0.6

    console.log(Math.floor(num));      //向下取整，向小取 -1

    console.log(Math.ceil(num));       //向上取整，向大取 -0

    console.log(Math.round(num));      //四舍五入取整（正数四舍五入，负数五舍六入） -1

    console.log(Math.random());        //生成0-1之间的随机数 0.6453
```


##  Math.abs()：获绝对值

方法定义：返回绝对值。

注意：

- 参数中可以接收字符串类型的数字，此时会将字符串做隐式类型转换，然后再调用 Math.abs() 方法。

代码举例：

```js
    console.log(Math.abs(2)) // 2
    console.log(Math.abs(-2)) // 2

    // 先做隐式类型转换，将 '-2'转换为数字类型 -2，然后再调用 Math.abs()
    console.log(Math.abs('-2'))

    console.log(Math.abs('hello')) // NaN
```

## Math.random() 方法：生成随机数

方法定义：生成 [0, 1) 之间的**随机浮点数**。

### 生成 [0, x) 之间的随机数

```js
    Math.round(Math.random()*x)
```


### 生成 [x, y) 之间的随机数

```js
    Math.round(Math.random()*(y-x)+x)
```

### 生成 [x, y]之间的随机整数

也就是说：生成两个整数之间的随机整数，**并且要包含这两个整数**。

```js
    /*
    * 生成两个整数之间的随机整数，并且要包含这两个整数
    */
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    console.log(getRandom(1, 10))
```


## pow()：乘方

如果想计算 `a 的 b 次方`，可以使用如下函数：

```
	Math.pow(a, b);
```

Math的中文是“数学”，pow是“幂”。

## sqrt()：开方

如果想计算数值a的开二次方，可以使用如下函数：

```
	 Math.sqrt(a);
```

sqrt即“square 开方”。比如：

```
	var a = Math.sqrt(36);
```


## url 编码和解码

URI (Uniform ResourceIdentifiers,通用资源标识符)进行编码，以便发送给浏览器。有效的URI中不能包含某些字符，例如空格。而这URI编码方法就可以对URI进行编码，它们用特殊的UTF-8编码替换所有无效的字符，从而让浏览器能够接受和理解。

```js
    encodeURIComponent()   //把字符串作为 URI 组件进行编码
    decodeURIComponent()   //把字符串作为 URI 组件进行解码
```

例：

```js
    var url = "http://www.baidu.com"

    var str = encodeURIComponent(url)
    console.log(str)                          //打印url的编码
    console.log(decodeURIComponent(str))      //对url进行编码后，再解码，还原为url
```


## Date


## 内置对象：Date

> Date 对象在实际开发中，使用得很频繁。

内置对象 Date 用来处理日期和时间。

**需要注意的是**：与 Math 对象不同，Date 对象是一个**构造函数** ，需要**先实例化**后才能使用。

## 创建Date对象

创建Date对象有两种写法：

- 写法一：如果Date()不写参数，就返回当前时间对象

- 写法二：如果Date()里面写参数，就返回括号里输入的时间对象

### 写法一：不传递参数时，则获取系统的当前时间对象

例：

```js
var date1 = new Date()
console.log(date1) //Mon Feb 17 2021 21:57:22 GMT+0800 (中国标准时间)
console.log(typeof date1) // object
```

不传递参数时，表示的是获取系统的当前时间对象。也可以理解成是：获取当前代码执行的时间。


### 写法二：传递参数

传递参数时，表示获取指定时间的时间对象。参数中既可以传递字符串，也可以传递数字，也可以传递时间戳。

通过传参的这种写法，我们可以把时间字符串/时间数字/时间戳，按照指定的格式，转换为时间对象。

例1：（参数是字符串）

```js
const date11 = new Date('2021/02/17 21:00:00')
console.log(date11) // Mon Feb 17 2021 21:00:00 GMT+0800 (中国标准时间)

const date12 = new Date('2021/04/19') // 返回的就是四月
console.log(date12) // Sun Apr 19 2021 00:00:00 GMT+0800 (中国标准时间)

const date13 = new Date('2021-05-20')
console.log(date13) // Wed May 20 2021 08:00:00 GMT+0800 (中国标准时间)

const date14 = new Date('Wed Jan 16 2021 12:00:00 GMT+0800 (中国标准时间)')
console.log(date14) // Fri Jan 16 2021 12:00:00 GMT+0800 (中国标准时间)
```


例2：（参数是多个数字）

```js
const date21 = new Date(2020, 2, 18); // 注意，第二个参数返回的是三月，不是二月
console.log(date21); // Wed Mar 18 2020 00:00:00 GMT+0800 (中国标准时间)

const date22 = new Date(2020, 3, 18, 22, 59, 58);
console.log(date22); // Sat Apr 18 2020 22:59:58 GMT+0800 (中国标准时间)

const params = [2020, 06, 12, 16, 20, 59];
const date23 = new Date(...params);
console.log(date23); // Sun Jul 12 2020 16:20:59 GMT+0800 (中国标准时间)
```


例3：（参数是时间戳）

```js
const date31 = new Date(1591950413388);
console.log(date31); // Fri Jun 12 2020 16:26:53 GMT+0800 (中国标准时间)

// 先把时间对象转换成时间戳，然后把时间戳转换成时间对象
const timestamp = new Date().getTime();
const date32 = new Date(timestamp);
console.log(date32); // Fri Jun 12 2020 16:28:21 GMT+0800 (中国标准时间)
```



## 日期的格式化

如果我们需要获取日期的**指定部分**，就需要用到 Date对象自带的方法。

获取了日期指定的部分之后，我们就可以让日期按照指定的格式，进行展示（即日期的格式化）。比如说，我期望能以 `2020-02-02 19:30:59` 这种格式进行展示。

### Date对象的方法

Date对象 有如下方法，可以获取日期和时间的**指定部分**：

| 方法名        | 含义              | 备注      |
| ------------- | ----------------- | --------- |
| getFullYear() | 获取年份          |           |
| getMonth()    | **获取月： 0-11** | 0代表一月 |
| getDate()       | **获取日：1-31** | 获取的是几号 |
| getDay() | **获取星期：0-6** | 0代表周日，1代表周一 |
| getHours() | 获取小时：0-23 |  |
| getMinutes() | 获取分钟：0-59 |           |
| getSeconds() | 获取秒：0-59 |           |
| getMilliseconds() | 获取毫秒 | 1s = 1000ms |



**例**：

```js
	// 我在执行这行代码时，当前时间为 2019年2月4日，周一，13:23:52
	var myDate = new Date()

	console.log(myDate) // 打印结果：Mon Feb 04 2019 13:23:52 GMT+0800 (中国标准时间)

	console.log(myDate.getFullYear()) // 打印结果：2019
	console.log(myDate.getMonth() + 1) // 打印结果：2
	console.log(myDate.getDate()) // 打印结果：4

	var dayArr  = ['星期日', '星期一', '星期二', '星期三', '星期四','星期五', '星期六']
	console.log(myDate.getDay()) // 1
	console.log(dayArr[myDate.getDay()]) // 星期一

	console.log(myDate.getHours()) // 13
	console.log(myDate.getMinutes()) // 23
	console.log(myDate.getSeconds()) // 52
	console.log(myDate.getMilliseconds()) // 393

	console.log(myDate.getTime()) // 获取时间戳。1549257832393
```

获取了日期和时间的指定部分之后，我们把它们用字符串拼接起来，就可以按照自己想要的格式，来展示日期。

### 例：年月日的格式化

例：

```js
console.log(formatDate());

/*
    方法：日期格式化。
    格式要求：今年是：2020年02月02日 08:57:09 星期日
*/
function formatDate() {
    var date = new Date()

    var year = date.getFullYear() // 年
    var month = date.getMonth() + 1 // 月
    var day = date.getDate() // 日

    var week = date.getDay() // 星期几
    var weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

    var hour = date.getHours() // 时
    hour = hour < 10 ? '0' + hour : hour // 如果只有一位，则前面补零

    var minute = date.getMinutes() // 分
    minute = minute < 10 ? '0' + minute : minute // 如果只有一位，则前面补零

    var second = date.getSeconds() // 秒
    second = second < 10 ? '0' + second : second // 如果只有一位，则前面补零

    var result = '今天是：' + year + '年' + month + '月' + day + '日 ' + hour + ':' + minute + ':' + second + ' ' + weekArr[week]

    return result
}

```


## 获取时间戳

### 时间戳的定义和作用

**时间戳**：指的是从格林威治标准时间的`1970年1月1日，0时0分0秒`到当前日期所花费的**毫秒数**（1秒 = 1000毫秒）。

计算机底层在保存时间时，使用的都是时间戳。时间戳的存在，就是为了**统一**时间的单位。

我们经常会利用时间戳来计算时间，因为它更精确。而且，在实战开发中，接口返回给前端的日期数据，都是以时间戳的形式。

```js
	var myDate = new Date("1970/01/01 0:0:0")

	console.log(myDate.getTime()) // 获取时间戳  结果：-28800000
```


结果是`-28800000`，而不是`0`呢？这是因为，我们的当前代码，是在中文环境下运行的，与英文时间会存在**8个小时的时差**（中文时间比英文时间早了八个小时）。如果代码是在英文环境下运行，打印结果就是`0`。


### getTime()：获取时间戳

`getTime()`  获取日期对象的**时间戳**（单位：毫秒）。这个方法在实战开发中，用得比较多。但还有比它更常用的写法，我们往下看。


### 获取 Date 对象的时间戳

```js
// 方式一：获取 Date 对象的时间戳（最常用的写法）
const timestamp1 = +new Date()
console.log(timestamp1) // 结果举例：1589448165370

// 方式二：获取 Date 对象的时间戳（较常用的写法）
const timestamp2 = new Date().getTime()
console.log(timestamp2) // 结果举例：1589448165370

// 方式三：获取 Date 对象的时间戳
const timestamp3 = new Date().valueOf()
console.log(timestamp3) // 结果举例：1589448165370

// 方式4：获取 Date 对象的时间戳
const timestamp4 = new Date() * 1
console.log(timestamp4) // 结果举例：1589448165370

// 方式5：获取 Date 对象的时间戳
const timestamp5 = Number(new Date())
console.log(timestamp5) // 结果举例：1589448165370
```

上面这五种写法都可以获取任意 Date 对象的时间戳，最常见的写法是**方式一**，其次是方式二。

根据前面所讲的关于「时间戳」的概念，上方代码获取到的时间戳指的是：从 `1970年1月1日，0时0分0秒` 到现在所花费的总毫秒数。

### 获取当前时间的时间戳

如果我们要获取**当前时间**的时间戳，除了上面的三种方式之外，还有另一种方式。如：

```js
// 方式六：获取当前时间的时间戳（很常用的写法）
console.log(Date.now()) // 打印结果举例：1589448165370
```

上面这种方式六，用得也很多。只不过，`Date.now()`是H5标准中新增的特性，如果你的项目需要兼容低版本的IE浏览器，就不要用了。


### 利用时间戳检测代码的执行时间

我们可以在业务代码的前面定义 `时间戳1`，在业务代码的后面定义 `时间戳2`。把这两个时间戳相减，就能得出业务代码的执行时间。


### format()

将时间对象转换为指定格式。


## Moment.js

Moment.js 是一个轻量级的JavaScript时间库，我们可以利用它很方便地进行时间操作，提升开发效率。

使用举例：

```js
    // 按照指定的格式，格式化当前时间
    console.log(moment().format('YYYY-MM-DD HH:mm:ss')) // 结果举例：2020-06-12 16:38:38
    console.log(typeof moment().format('YYYY-MM-DD HH:mm:ss')) // 结果：string

    // 按照指定的格式，格式化指定的时间
    console.log(moment('2020/06/12 18:01:59').format('YYYY-MM-DD HH:mm:ss')) // 结果：2020-06-12 18:01:59

    // 按照指定的格式，获取七天后的时间
    console.log(moment().add(7, 'days').format('YYYY-MM-DD hh:mm:ss')) // 结果举例：2020-06-19 04:43:56

```


## 最后

如果喜欢或者有所收获，欢迎start，对作者也是一种鼓励。

如果错误或者不严谨的地方，请给予指正，十分感谢。
