# ES6 之 Generator 的自动执行

## 介绍

处理异步操作。

### 单个异步任务

```js
    var fetch = require('node-fetch')

    function* gen() {
      var url = 'https://api.github.com/users/github'
      var result = yield fetch(url)
      console.log(result.bio)
    }
```

为了获得最终的执行结果，需要：

```js
    var g = gen()
    var result = g.next()

    result.value.then((data) => {
      return data.json()
    }).then((data) => {
      g.next(data)
    })
```

首先执行 Generator 函数，获取遍历器对象

然后使用 next 方法，执行异步任务的第一阶段，即 fetch(url)

由于 fetch(url) 会返回一个 Promise 对象，所以 result 的值为：

```js
    { value: Promise { <pending> }, done: false }
```

最后我们为这个 Promise 对象添加一个 then 方法，先将其返回的数据格式化 **data.json()**，再调用 g.next，将获得的数据传进去，由此可以执行异步任务的第二阶段，代码执行完毕。


### 多个异步任务

之前我们只调用了一个接口，那如果我们调用了多个接口，使用了多个 yield，岂不是要在 then 函数中不断的嵌套下去，，，

执行多个异步任务的情况：

```js
    var fetch = require('node-fetch')

    function* gen() {
      var r1 = yield fetch('https://api.test1')
      var r2 = yield fetch('https://api.test2')
      var r3 = yield fetch('https://api.test3')

      console.log([r1.bio, r2[0].login, r3[0].name].join('\n'))
    }
```

为了获得最终的执行结果，你可能要这样写：

```js
    var g = gen()
    var result1 = g.next()

    result1.value.then((data) => {
      return data.json()
    }).then((data) => {
      return g.next(data).value
    }).then((data) => {
      return data.json()
    }).then((data) => {
      return g.next(data).value
    }).then((data) => {
      return data.json()
    }).then((data) => {
      g.next(data)
    })
```

其实，利用递归，我们可以这样写：

```js
    function run(gen) {
      var g = gen()

      function next(data) {
        var result = g.next(data)

        if (result.done) return

        result.value.then((data) => {
          return data.json()
        }).then((data) => {
          next(data)
        })
      }

      next()
    }
```

其中的关键就是 yield 的时候返回一个 Promise 对象，给这个 Promise 对象添加 then 方法，当异步操作成功时执行 then 中的 onFullfilled 函数， onFullfilled 函数中又去执行 g.next，从而让 Generator 继续执行，然后再返回一个 Promise，再在成功时执行 g.next，然后再返回...


### 启动器函数

在 run 这个启动器函数中，我们在 then 函数中将数据格式化 **data.json()**，但在更广泛的情况下，比如 yield 直接跟一个 Promise，而非一个 fetch 函数返回的 Promise，因为没有 json 方法，代码就会报错。所以为了更具备通用性，连同这个例子和启动器，我们修改为：

```js
    var fetch = require('node-fetch')

    function* gen() {
      var r1 = yield fetch('https://api.test1')
      var json1 = r1.json()
      var r2 = yield fetch('https://api.test2')
      var json2 = r2.json()
      var r3 = yield fetch('https://api.test3')
      var json3 = r3.json()

      console.log([json1.bio, json2[0].login, json3[0].name].join('\n'))
    }

    function run (gen) {
      var g = gen()
      
      function next(data) {
        var result = g.next(data)

        if (result.done) return

        result.value.then((data) => {
          next(data)
        })
      }

      next()
    }

    run(gen)
```

只要 yield 后跟着一个 Promise 对象，我们就可以利用这个 run 函数将 Generator 函数自动执行。


### 回调函数

yield 后一定要跟着一个 Promise 对象才能保证 Generator 的自动执行吗 如果只是一个回调函数呢

首先我们来模拟一个普通的异步请求：

```js
    function fetchData(url, cb) {
      setTimeout(function() {
        cb({ status: 200, data: url })
      }, 1000)
    }
```

我们将这种函数改造成：

```js
    function fetchData(url) {
      return function(cb) {
        setTimeout(function() {
          cb({ status: 200, data: url })
        }, 1000)
      }
    }
```

对于这样的 Generator 函数：

```js
    function* gen() {
      var r1 = yield fetchData('https://api.test1')
      var r2 = yield fetchData('https://api.test2')

      console.log([r1.data, r2.data].join('\n'))
    }
```

获得的最终结果：

```js
    var g = gen()

    var r1 = g.next()

    r1.value((data) => {
      var r2 = g.next(data)
      r2.value((data) => {
        g.next(data)
      })
    })
```

同样利用递归，将上面的代码，改造成：

```js
    function run(gen) {
      var g = gen()

      function next(data) {
        var result = g.next(data)

        if (result.done) return

        result.value(next)
      }

      next()
    }

    run(gen)
```


### run

由此可以看到 Generator 函数的自动执行需要一种机制，即当异步操作有了结果，能够自动交回执行权。

有两种方法可以做到这一点：

1. 回调函数。将异步操作进行包装，暴露出回调函数，在回调函数里面交回执行权。

2. Promise 对象。将异步操作包装成 Promise 对象，用 then 方法交回执行权。

在两种方法中，我们各写一个 run 启动器函数，那我们能不能将这两种方式结合在一起，写一个通用的 run 函数呢

```js
    function run(gen) {
      var g = gen()

      function next(data) {
        var result = g.next(data)

        if (result.done) return

        if(ifPromise(result.value)) {
          result.value.then(data)=> {
            next(data)
          }
        } else {
          result.value(next)
        }
      }

      next()
    }

    function isPromise(obj) {
      return 'function' === typeof obj.then
    }

    module.exports = run
```

其实实现很简单，判断 result.value 是否是 Promise，是就添加 then 函数，不是就直接执行。


### return Promise

我们已经写了一个不错的启动器函数，支持 yield 后跟回调函数或者 Promise 对象。

现在有一个问题需要思考，就是我们如何获得 Generator 函数的返回值呢 又如果 Generator 函数中出现了错误，就比如 fetch 了一个不存在的接口，这个错误该如何捕获呢

这很容易让人想到 Promise，如果这个启动器函数返回一个 Promise，我们就可以给这个 Promise 对象添加 then 函数，当所有的异步函数执行成功后，我们执行 onFullfilled 函数，如果有任何失败，就执行 onRejected 函数。

```js
   function run(gen) {
       var gen = gen()

       return new Promise(function(resolve, reject) {

           function next(data) {
               try {
                   var result = gen.next(data)
               } catch (e) {
                   return reject(e)
               }

               if (result.done) {
                   return resolve(result.value)
               }

               var value = toPromise(result.value)

               value.then(function(data) {
                   next(data)
               }, function(e) {
                   reject(e)
               })
           }

           next()
       })

   }

   function isPromise(obj) {
       return 'function' == typeof obj.then
   }

   function toPromise(obj) {
       if (isPromise(obj)) return obj
       if ('function' == typeof obj) return thunkToPromise(obj)
       return obj
   }

   function thunkToPromise(fn) {
       return new Promise(function(resolve, reject) {
           fn(function(err, res) {
               if (err) return reject(err)
               resolve(res)
           })
       })
   }

   module.exports = run
```

与之前的不同：

首先，我们返回了一个 Promise，当 result.done 为 true 的时候，我们将该值 resolve(result.value)，如果执行的过程中出现错误，被 catch 住，我们会将原因 reject(e)。

其次，我们会使用 thunkToPromise 将回调包装成一个 Promise，然后统一的添加 then 函数。在这里值得注意的是，在 thunkToPromise 函数中，我们遵循了 error first 原则，这意味着当我们处理回调函数的情况时：

```js
    // 模拟数据请求：
    function fetchS(url) {
      retrun function(url) {
        setTimeout(() => {
          cb(null, { status: 200, data: url })
        })
      }
    }
```

在成功时，第一个参数应该返回 null，表示没有错误原因。


### 优化

我们在之前的基础上，将代码写的更加简洁优雅一点：

```js
    function run(gen) {
      
      return new Promise((resolve, reject) => {
        if(typeof gen === 'function') gen  = gen()

        // 如果 gen 不是一个跌打器
        if(!gen || typeof gen.next !== 'function') return resolve(gen)

        onFulfilled()

        function onFulfilled(res) {
          var ret
          try {
            ret = gen.next(res)
          } catch (e) {
            return reject(e)
          }
          next(ret)
        }

        function onRejected(err) {
          var ret
          try {
            ret = gen.throw(err)
          } catch (e) {
            return reject(e)
          }
        }

        function next(ret) {
          if(ret.done) return resolve(ret.value)
          var value = toPromise(ret.value)
          if(value && isPromise(value)) return value.then(onFulfilled, onRejected)
          return onRejected(new TypeError('You may only yield a function, promise ' + 'but the following object was passed:' + String(ret.value)))
        }

        function isPromise(obj) {
          return 'function' === typeof obj.then
        }

        function toPromise(obj) {
          if(isPromise(obj)) return
          if('function' === typeof obj) return thunkToPromise(obj)
          return obj
        }

        function thunkToPromise(fn) {
          return new Promise((resole, reject) => {
            fn((err, res) => {
              if(err) return reject(err)
              resolve(res)
            })
          })
        }
      })
    }

    module.exports = run
```


### co

co 启动器函数，用于 Generator 函数的自动执行。

直接使用 co 模块：

```js
   // yield 后是一个 Promise
   var fetch = require('node-fetch')
   var co = require('co')

   function* gen() {
       var r1 = yield fetch('https://api.github.com/users/github')
       var json1 = yield r1.json()
       var r2 = yield fetch('https://api.github.com/users/github/followers')
       var json2 = yield r2.json()
       var r3 = yield fetch('https://api.github.com/users/github/repos')
       var json3 = yield r3.json()

       console.log([json1.bio, json2[0].login, json3[0].full_name].join('\n'))
   }

   co(gen)
```

```js
   // yield 后是一个回调函数
   var co = require('co')

   function fetchData(url) {
       return function(cb) {
           setTimeout(function() {
               cb(null, { status: 200, data: url })
           }, 1000)
       }
   }

   function* gen() {
       var r1 = yield fetchData('https://api.github.com/users/github')
       var r2 = yield fetchData('https://api.github.com/users/github/followers')

       console.log([r1.data, r2.data].join('\n'))
   }

   co(gen)
```