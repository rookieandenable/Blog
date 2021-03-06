# JavaScript基础篇之事件




## 事件简介

事件：就是文档或浏览器窗口中发生的一些特定的交互瞬间。对于 Web 应用来说，有下面这些代表性的事件：点击某个元素、将鼠标移动至某个元素上方、关闭弹窗等等。

JavaScript 是以**事件驱动为核心**的一门语言。JavaScript 与 HTML 之间的交互是通过事件实现的。

### 事件的三要素

**事件的三要素：事件源、事件、事件驱动程序**。

**总结：**

- 事件源：引发后续事件的html标签。

- 事件：js已经定义好了。

- 事件驱动程序：对样式和html的操作。也就是DOM。

也就是说，我们可以在时间对应的属性中写一些js代码，当事件被触发时，这些代码将会执行。

**代码书写步骤如下：**

- （1）获取事件源：document.getElementById(“box”);

- （2）绑定事件： 事件源box.事件onclick = function(){ 事件驱动程序 };

- （3）书写事件驱动程序：关于DOM的操作。

例：（点击box1，然后弹框）

```html
<body>
<div id="box1"></div>

<script type="text/javascript">
    // 1、获取事件源
    var div = document.getElementById("box1");
    // 2、绑定事件
    div.onclick = function () {
        // 3、书写事件驱动程序
        alert("我是弹出的内容");
    }
</script>

</body>
```


### 1、获取事件源的方式（DOM节点的获取）

获取事件源的常见方式如下：

```js
var div1 = document.getElementById("box1");      //方式一：通过id获取单个标签

var arr1 = document.getElementsByTagName("div");     //方式二：通过 标签名 获得 标签数组，所以有s

var arr2 = document.getElementsByClassName("hehe");  //方式三：通过 类名 获得 标签数组，所以有s
```

### 2、绑定事件的方式

方式一：直接绑定匿名函数

```html
<div id="box1" ></div>

<script type="text/javascript">
    var div1 = document.getElementById("box1");
    //绑定事件的第一种方式
    div1.onclick = function () {
        alert("我是弹出的内容");
    }
</script>
```

方式二：先单独定义函数，再绑定

```html
 <div id="box1" ></div>

<script type="text/javascript">
    var div1 = document.getElementById("box1");
    //绑定事件的第二种方式
    div1.onclick = fn;   //注意，这里是fn，不是fn()。fn()指的是返回值。
    //单独定义函数
    function fn() {
        alert("我是弹出的内容");
    }
</script>
```

**绑定的时候，是写fn，不是写fn()**。fn代表的是整个函数，而fn()代表的是返回值。

方式三：行内绑定

```html
<!--行内绑定-->
<div id="box1" onclick="fn()"></div>

<script type="text/javascript">

    function fn() {
        alert("我是弹出的内容");
    }

</script>
```

注意第一行代码，绑定时，是写的`"fn()"`，不是写的`"fn"`。因为绑定的这段代码不是写在js代码里的，而是被识别成了**字符串**。

### 3、事件驱动程序

我们在上面是拿alert举例，不仅如此，我们还可以操作标签的属性和样式。例：

点击鼠标时，原本粉色的div变大了，背景变红：

```html
    <style>
        #box1 {
            width: 100px;
            height: 100px;
            background-color: pink;
            cursor: pointer;
        }
    </style>
</head>

<body>

<div id="box1" ></div>

<script type="text/javascript">
    var div1 = document.getElementById("box1");
    //点击鼠标时，原本粉色的div变大了，背景变红了
    div1.onclick = function () {
        div1.style.width = "200px";   //属性值要写引号
        div1.style.height = "200px";
        div1.style.backgroundColor = "red";   //属性名是backgroundColor，不是background-color
    }
</script>
```

注意：

- 在js里写属性值时，要用引号

- 在js里写属性名时，是`backgroundColor`，不是CSS里面的`background-color`。


### onload事件

**当页面加载（文本和图片）完毕的时候，触发onload事件。**

举例：

```html
<script type="text/javascript">
    window.onload = function () {
        console.log("smyhvae");  //等页面加载完毕时，打印字符串
    }
</script>
```

有一点我们要知道：**js的加载是和html同步加载的**。因此，如果使用元素在定义元素之前，容易报错。这个时候，onload事件就能派上用场了，我们可以把使用元素的代码放在onload里，就能保证这段代码是最后执行。

整个页面上所有元素加载完毕再执行js内容。所以，window.onload可以预防使用标签在定义标签之前。


## 最后

如果喜欢或者有所收获，欢迎start，对作者也是一种鼓励。

如果错误或者不严谨的地方，请给予指正，十分感谢。
