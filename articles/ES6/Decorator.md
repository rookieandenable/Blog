# ES6 之 装饰器


## 介绍

装饰器主要用于：

- 装饰类

- 装饰方法或属性


1. 装饰类

```js
    @annotation
    calss MyClass { }

    function annotation(target) {
      target.annotated = true
    }
```


2. 装饰方法或属性

```js
    class MyClass {
      @readonly
      method() { }
    }

    function readonly(target, name, descriptor) {
      descriptor.writable = false
      return descriptor
    }
```