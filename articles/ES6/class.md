# ES6 之 class 实现


## 介绍

ES6 的 class 和 ES5 的构造函数是如何对应的。毕竟，ES6 的 class 可以看作一个语法糖，它的绝大部分功能，ES5 都可以做到，新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。


### constructor

ES6 中：

```js
    class Person {
      constructor(name) {
        this.name = name
      }

      sayHello() {
        return 'I am ' + this.name
      }
    }

    var ts = new Person('tom')
    ts.sayHello()
```

对应到 ES5 中：

```js
    function Person(name) {
      this.name = name
    }

    Person.prototype.sayHello = function() {
      return 'I am ' + this.name
    }

    var ts = new Person('tom')
    ts.sayHello()
```

可以看到 ES5 的构造函数 Person，对应 ES6 的 Person 类的 constructor 方法。

注意： **类的内部所有定义的方法，都是不可枚举的（non-enumerable）**

```js
    // ES6
    Object.keys(Person.prototype) // []
    Object.getOwnPropertyNames(Person.prototype) // ['constructor', 'sayHello']
```

```js
    // ES6
    Object.keys(Person.prototype) // ['sayHello']
    Object.getOwnPropertyNames(Person.prototype) // ['constructor', 'sayHello']
```


### 实例属性

```js
    // ES6
    class Person {
      constructor() {
        this.state = {
          count: 0
        }
      }
    }
```

```js
    // ES6 提案的新写法
    class Person {
      state = {
        count: 0
      }
    }
```

```js
    // ES5
    class Person {
      this.state = {
        count: 0
      }
    }
```


### 静态方法

所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上 static 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为 ‘静态方法’。


```js
    // ES6
    class Person {
      static sayHello() {
        return 'hello'
      }
    }

    Person.sayHello() // hello

    const ts = new Person()
    ts.sayHello() // TypeError: ts.sayHello is not a function
```

```js
    // 对应的 ES5 写法
    function Person { }

    Person.sayHello = function() {
      return 'hello'
    }

    Person.sayHello() // hello

    const ts = new Person()
    ts.sayHello() // TypeError: ts.sayHello is not a function
```


### 静态属性

静态属性指的是 Class 本身的属性，即 Class.propName，而不是定义在实例对象（this）上的属性。

```js
    // ES6
    class Person { }
    Person.name = 'tom'
```

```js
    // ES6 提案的新写法
    class Person {
      static name = 'tom'
    }
```

```js
    // ES5
    function Person { }
    Person.name = 'tom'
```


### new 调用

值得注意的是：类必须使用 new 调用，否则会报错。这是它跟普通构造函数的一个主要的区别，后者不用 new 也可以执行。

```js
    class Person { }
    Person() // TypeError: class constructor cannot be invoked without 'new'
```


### getter 和 setter

与 ES5 一样，在 ‘类’ 的内部可以使用 get 和 set 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

```js
    // ES6
    class Person {
      get name() {
        return 'sun'
      }

      set name(nval) {
        console.log('nval is ' + nval)
      }
    }

    const ts = new Person()
    
    ts.name = 'tom' // nval is tom

    console.log(ts.name) // sun
```

```js
    // ES5 写法
    function Person { }

    Person.prototype = {
      get name() {
        return 'sun'
      }

      set name(nval) {
        console.log('nval is' + nval)
      }
    }

    const ts = new Person()
    
    ts.name = 'tom' // nval is tom

    console.log(ts.name) // sun
```



## 继承的实现


```js
    // ES5 的寄生组合式继承
    function Parent(name) {
      this.name = name
    }

    Parent.prototype.getName = function() {
      console.log(this.name)
    }

    function Child(name, age) {
      Parent.call(this, name)
      this.age = age
    }

    Child.prototype = Object.create(Parent.prototype)

    var child1 = new Child('tom', 24)
```

寄生组合继承 优点：

这种方式的高效率体现它只调用了一次 Parent 构造函数，并且因此避免了在 Parent.prototype 上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf。开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。


### ES6 extend

Class 通过 extends 关键字实现继承，这比 ES5 的通过修改原型实现继承，要清晰和方便很多。

```js
    class Parent {
      constructor(name) {
        this.name = name
      }
    }

    class Child extends Parent {
      constructor(name, age) {
        super(name) // 调用父类的 constructor(name)
        this.age = age
      }
    }

    const ts = new Child('tom', 24)
```

值得注意的是：

super 关键字表示父类的构造函数，相当于 ES5 的 Parent.call(this)。

子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错。这是因为子类没有自己的 this 对象，而是继承父类的 this 对象，然后对其进行加工。如果不调用 super 方法，子类就得不到 this 对象。

也正是因为这个原因，在子类的构造函数中，只有调用 super 之后，才可以使用 this 关键字，否则会报错。


### 子类的 __proto__

在 ES6 中，父类的静态方法，可以被子类继承。

```js
class Foo {
  static classMethod() {
    return 'hello'
  }
}

class Bar extends Foo { }

Bar.classMethod() // 'hello'
```

这是因为 Class 作为构造函数的语法糖，同时有 prototype 属性和 __proto__ 属性，因此同时存在两条继承链。

（1）子类的 __proto__ 属性，表示构造函数的继承，总是指向父类。

（2）子类 prototype 属性的 __proto__ 属性，表示方法的继承，总是指向父类的 prototype 属性。


```js
class Parent { }

class Child extends Parent { }

console.log(Child.__proto__ === Parent) // true
console.log(Child.prototype.__proto__ === Parent.prototype) // true
```

我们会发现，相比寄生组合式继承，ES6 的 class 多了一个 Object.setPrototypeOf(Child, Parent) 的步骤。


### 继承目标

extends 关键字后面可以跟多种类型的值。

```js
class B extends A { }
```

上面代码的 A，只要是一个有 prototype 属性的函数，就能被 B 继承。由于函数都有 prototype 属性（除了 Function.prototype 函数），因此 A 可以是任意函数。

除了函数之外，A 的值还可以是 null，当 extend null 的时候：

```js
class A extends null { }

console.log(A.__proto__ === Function.prototype) // true
console.log(A.prototype.__proto__ === undefined) // true
```