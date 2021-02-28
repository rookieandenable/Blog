# JavaScript基础篇之流程控制语句

## 选择结构（if 和 switch）

用`{}`包围起来的代码，就是代码块。

在 ES5 语法中，代码块，只具有**分组**的作用，没有其他的用途。代码块中的内容，在外部是完全可见的。例：

```js
{
    var a = 2;
}

console.log('a = ' + a) // a = 2
```

## 流程控制语句

在一个程序执行的过程中，各条语句的执行顺序对程序的结果是有直接影响的。所以，我们必须清楚每条语句的执行流程。而且，很多时候我们要通过控制语句的执行顺序来实现我们要完成的功能。

### 流程控制语句分类

- 顺序结构

- 选择结构：if 语句、switch 语句

- 循环结构：while 语句、for 语句

## 顺序结构

按照代码的先后顺序，依次执行。

## if 语句

if 语句有以下三种。

### 1、条件判断语句

> 条件成立才执行。如果条件不成立，那就什么都不做。

```js
if (条件表达式) {
    // 条件为真时，做的事情
}
```

### 2、条件分支语句

```js
if (条件表达式) {
    // 条件为真时，做的事情

} else {
    // 条件为假时，做的事情

}
```

格式 2：（多分支的 if 语句）

```js
if (条件表达式1) {
    // 条件1为真时，做的事情

} else if (条件表达式2) {
    // 条件1不满足，条件2满足时，做的事情

} else if (条件表达式3) {
    // 条件1、2不满足，条件3满足时，做的事情

} else {
    // 条件1、2、3都不满足时，做的事情
}
```

以上所有的语句体中，只执行其中一个。

## switch 语句（条件分支语句）

switch 语句也叫条件分支语句。

```js
switch(表达式) {
	case 值1：
		语句体1;
		break;

	case 值2：
		语句体2;
		break;

	...
	...

	default：
		语句体 n+1;
		break;
}
```

**解释**：switch 可以理解为“开关、转换” 。case 可以理解为“案例、选项”。

### switch 语句的执行流程

执行流程如下：

（1）首先，计算出表达式的值，和 case 依次比较，一旦有对应的值，就会执行相应的语句，在执行的过程中，遇到 break 就会结束。

（2）然后，如果所有的 case 都和表达式的值不匹配，就会执行 default 语句体部分。

### switch 和 case 后面的值

switch 后面的**括号里**可以是**表达式**或者**值**， 通常是一个**变量**（通常做法是：先把表达式或者值存放到变量中）。

JS 是属于弱类型语言，case 后面的`值1`、`值2`可以是 `'a'`、`6`、`true` 等任意数据类型的值，也可以是**表达式**。注意，在这里，**字符串`'6'`和 数字 `6` 是不一样的**。

例1：

```js
let msg = 'notice';

switch (msg) {
    case 'notice':
        console.log('提示')
        break;
    case 'warning':
        console.log('警告')
        break;
    case 'error':
        console.log('错误')
        break;
    default:
        console.log('默认文案')
        break;
}
```

举例2：（case 后面的是表达式）

```js
let age = 28

switch (true) {
    case age < 18:
        console.log('未成年人')
        break;
    case age >= 18 && age <= 65:
        console.log('还能干活儿')
        break;
    case age > 65:
        console.log('该退休了')
        break;
    default:
        console.log('默认文案')
        break;
}

```

代码解释：由于 switch 里的值是 true，所以，在众多的 case 语句中，会去匹配第一个符合 `case true`的语句，然后命中这条语句。



### switch 语句的结束条件

- 情况 a：遇到 break 就结束，而不是遇到 default 就结束。（因为 break 在此处的作用就是退出 switch 语句）

- 情况 b：执行到程序的末尾就结束。

我们来看下面的两个例子就明白了。

### case 穿透

switch 语句中的`break`可以省略，但一般不建议。否则结果可能不是你想要的，会出现一个现象：**case 穿透**。

当然，如果你能利用好 case 穿透，会让代码写得十分优雅。

**举例 1**：（case 穿透的情况）

```js
var num = 4;

//switch判断语句
switch (num) {
    case 1:
        console.log('星期一')
        break;
    case 2:
        console.log('星期二')
        break;
    case 3:
        console.log('星期三')
        break;
    case 4:
        console.log('星期四')
    //break;
    case 5:
        console.log('星期五')
    //break;
    case 6:
        console.log('星期六')
        break;
    case 7:
        console.log('星期日')
        break;
    default:
        console.log('你输入的数据有误')
        break;
}
```

上方代码的运行结果：

```
星期四
星期五
星期六
```

上方代码：因为在 case 4 和 case 5 中都没有 break，那语句走到 case 6 的 break 才会停止。

**举例 2**：

```js
//switch判断语句
var number = 5

switch (number) {
    default:
        console.log('我是defaul语句')
    // break;
    case 2:
        console.log('第二个呵呵:' + number)
    //break;
    case 3:
        console.log('第三个呵呵:' + number)
        break;
    case 4:
        console.log('第四个呵呵:' + number)
        break;
}
```

上方代码

```
我是defaul语句
第二个呵呵:5
第三个呵呵:5
```

上方代码的解释：代码走到 default 时，因为没有遇到 break，所以会继续往下走，直到遇见 break 或者走到程序的末尾。 从这个例子可以看出：switch 语句的结束与 default 的顺序无关。

## switch 语句的实战举例：替换 if 语句

开发中，经常需要根据接口的返回码 retCode ，来让前端做不同的展示。

```js
let retCode = 1003; // 返回码 retCode 的值可能有很多种情况

switch (retCode) {
    case 0:
        alert('接口联调成功')
        break;
    case 101:
        alert('活动不存在')
        break;

    case 103:
        alert('活动未开始')
        break;

    case 104:
        alert('活动已结束')
        break;

    case 1001:
        alert('参数错误')
        break;

    case 1002:
        alert('接口频率限制')
        break;

    case 1003:
        alert('未登录')
        break;

    case 1004:
        alert('（风控用户）提示 活动太火爆啦~军万马都在挤，请稍后再试')
        break;

    // 其他异常返回码
    default:
        alert('系统君失联了，请稍候再试')
        break;
}
```

### switch 语句可以适时地去掉 break

```js
let day = 2;

switch (day) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
        console.log('work')
        break; // 在这里放一个 break

    case 6:
    case 7:
        console.log('relax')
        break; // 在这里放一个 break

    default:
        break;
}
}
```


## 循环结构 for 和 while

循环语句：通过循环语句可以反复的执行一段代码多次。

## for 循环

```
for(①初始化表达式; ②条件表达式; ④更新表达式){
	③语句...
}
```
其中：

```
①执行初始化表达式，初始化变量（初始化表达式只会执行一次）

②执行条件表达式，判断是否执行循环：
	如果为true，则执行循环③
	如果为false，终止循环

④执行更新表达式，更新表达式执行完毕继续重复②
```

for 例：

```js
for (var i = 1; i <= 100; i++) {
    console.log(i)
}
```

### for 例

```js
for (var i = 1; i < 13; i = i + 4) {
    console.log(i)
}
```

遍历步骤：

```
程序一运行，将执行var i = 1;这条语句， 所以i的值是1。
然后程序会验证一下i < 13是否满足，1<13是真，所以执行一次循环体（就是大括号里面的语句）。
执行完循环体之后，会执行i=i+4这条语句，所以i的值，是5。

程序会会验证一下i < 13是否满足，5<13是真，所以执行一次循环体（就是大括号里面的语句）。
执行完循环体之后，会执行i=i+4这条语句，所以i的值，是9。

程序会会验证一下i < 13是否满足，9<13是真，所以执行一次循环体（就是大括号里面的语句）。
执行完循环体之后，会执行i=i+4这条语句，所以i的值，是13。

程序会会验证一下i < 13是否满足，13<13是假，所以不执行循环体了，将退出循环。

最终输出输出结果为：1、5、9
```

## while 循环语句

### while 循环

```js
while(条件表达式){
	语句...
}
```

执行流程：

```
while语句在执行时，先对条件表达式进行求值判断：

	如果值为true，则执行循环体：
		循环体执行完毕以后，继续对表达式进行判断
		如果为true，则继续执行循环体，以此类推

	如果值为false，则终止循环
```

**可以使用 break 来终止循环**。

### do...while 循环

语法：

```js
do{
	语句...
}while(条件表达式)

```

执行流程：

```
do...while语句在执行时，会先执行循环体：

	循环体执行完毕以后，在对while后的条件表达式进行判断：
		如果结果为true，则继续执行循环体，执行完毕继续判断以此类推
		如果结果为false，则终止循环

```

### while 循环和 do...while 循环的区别

这两个语句的功能类似，不同的是：

-   while 是先判断后执行，而 do...while 是先执行后判断。

也就是说，do...while 可以保证循环体至少执行一次，而 while 不能。

## break 和 continue

### break

- break 可以用来退出 switch 语句或退出**整个**循环语句（循环语句包括 for 循环、while 循环。不包括 if。if 里不能用 break 和 continue，否则会报错）。

- break 会立即终止离它**最近**的那个循环语句。

- 可以为循环语句创建一个 label，来标识当前的循环（格式：label:循环语句）。使用 break 语句时，可以在 break 后跟着一个 label，这样 break 将会结束指定的循环，而不是最近的。

**例**：通过 break 终止循环语句

```js
for (var i = 0; i < 5; i++) {
    console.log('i的值:' + i)
    if (i == 2) {
        break; // 注意，虽然在 if 里 使用了 break，但这里的 break 是服务于外面的 for 循环。
    }
}
```

结果：

```
i的值:0
i的值:1
i的值:2
```

**例**：label 的使用

```js
outer: for (var i = 0; i < 5; i++) {
    console.log('外层循环 i 的值：' + i)
    for (var j = 0; j < 5; j++) {
        break outer; // 直接跳出outer所在的外层循环（这个outer是我自定义的label）
        console.log('内层循环 j 的值:' + j)
    }
}
```

结果：

```
外层循环 i 的值：0
```

### continue

- continue 可以用来跳过**当次**循环，继续下一次循环。

- 同样，continue 默认只会离他**最近**的循环起作用。

- 同样，如果需要跳过指定的当次循环，可以使用 label 标签。

举例：

```js
for (var i = 0; i < 10; i++) {
    if (i % 2 == 0) {
        continue;
    }
    console.log('i的值:' + i)
}
```

结果：

```
i的值:1

i的值:3

i的值:5

i的值:7

i的值:9
```

## 最后

如果喜欢或者有所收获，欢迎start，对作者也是一种鼓励。

如果错误或者不严谨的地方，请给予指正，十分感谢。