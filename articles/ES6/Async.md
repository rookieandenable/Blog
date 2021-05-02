# ES6 之 Async


## 介绍

ES7 标准引入了 async 函数，使得异步操作变得更加方便。

在异步处理上， async 函数就是 Generator 函数的语法糖。

```js
  // 使用 generator
  var fetch = require('node-fetch')
  var co = require('co')

  function* gen() {
      var r1 = yield fetch('https://api.github.com/users/github')
      var json1 = yield r1.json()
      console.log(json1.bio)
  }

  co(gen)
```

使用 async 时：

```js
  // 使用 async
  var fetch = require('node-fetch')

  var fetchData = async function () {
      var r1 = await fetch('https://api.github.com/users/github')
      var json1 = await r1.json()
      console.log(json1.bio)
  };

  fetchData()
```

其实 async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。

```js
  async function fn(args) {
    // ...
  }

  // 等同于

  function fn(args) {
    return spawn(function* () {
      // ...
    })
  }
```

spawn 函数指的是自动执行器，就比如说 co。

再加上 async 函数返回一个 Promise 对象，你也可以理解为 async 函数是基于 Promise 和 
Generator 的一层封装。


### async 与 Promise

严谨的说，async 是一种语法，Promise 是一个内置对象，两者并不具备可比性，更何况 async 函数也返回一个 Promise 对象

使用 async 会比使用 Promise 更优雅的处理异步流程。

**1. 代码更加简洁**

```js
  // 示例一
  function fetch() {
    return (
      fetchData()
      .then(() => {
        return "done"
      })
    )
  }

  async function fetch() {
    await fetchData()
    return "done"
  }
```

```js
// 示例二
function fetch() {
  return (
    fetchData()
    .then(value1 => {
      return fetchMoreData(value1)
    })
    .then(value2 => {
      return fetchMoreData2(value2)
    })
  )
}

async function fetch() {
  const value1 = await fetchData()
  const value2 = await fetchMoreData(value1)
  return fetchMoreData2(value2)
}
```


**2.错误处理**

```js
  function fetch() {
    try {
      fetchData()
        .then(result => {
          const data = JSON.parse(result)
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (err) {
      console.log(err)
    }
  }
```

在这段代码中，try/catch 能捕获 fetchData() 中的一些 Promise 构造错误，但是不能捕获 JSON.parse 抛出的异常，如果要处理 JSON.parse 抛出的异常，需要添加 catch 函数重复一遍异常处理的逻辑。

在实际项目中，错误处理逻辑可能会很复杂，这会导致冗余的代码。

```js
  async function fetch() {
    try {
      const data = JSON.parse(await fetchData())
    } catch (err) {
      console.log(err)
    }
  }
```

async/await 的出现使得 try/catch 就可以捕获同步和异步的错误。

### async 地狱

async 地狱主要是指开发者贪图语法上的简洁而让原本可以并行执行的内容变成了顺序执行，从而影响了性能

```js
  (async () => {
    const getList = await getList()
    const getAnotherList = await getAnotherList()
  })()
```

getList() 和 getAnotherList() 其实并没有依赖关系，但是现在的这种写法，虽然简洁，却导致了 getAnotherList() 只能在 getList() 返回后才会执行，从而导致了多一倍的请求时间。

为了解决这个问题，我们可以改成这样：

```js
  (async () => {
    const listPromise = getList()
    const anotherListPromise = getAnotherList()
    await listPromise
    await anotherListPromise
  })()
```

也可以使用 Promise.all()：

```js
  (async () => {
    Promise.all([getList(), getAnotherList()]).then(...)
  })()
```

### 继发与并发

**问题：给定一个 URL 数组，如何实现接口的继发和并发？**

async 继发实现：

```js
  // 继发一
  async function loadData() {
    var res1 = await fetch(url1)
    var res2 = await fetch(url2)
    var res3 = await fetch(url3)
    return "whew all done"
  }
```

```js
  // 继发二
  async function loadData(urls) {
    for (const url of urls) {
      const response = await fetch(url)
      console.log(await response.text())
    }
  }
```

async 并发实现：

```js
  // 并发一
  async function loadData() {
    var res = await Promise.all([fetch(url1), fetch(url2), fetch(url3)])
    return "whew all done"
  }
```

```js
  // 并发二
  async function loadData(urls) {
    // 并发读取 url
    const textPromises = urls.map(async url => {
      const response = await fetch(url)
      return response.text()
    })

    // 按次序输出
    for (const textPromise of textPromises) {
      console.log(await textPromise)
    }
  }
```


### async 错误捕获

尽管我们可以使用 try catch 捕获错误，但是当我们需要捕获多个错误并做不同的处理时，很快 try catch 就会导致代码杂乱

为了简化这种错误的捕获，我们可以给 await 后的 promise 对象添加 catch 函数，为此我们需要写一个 helper:

```js
  // to.js
  export default function to(promise) {
    return promise.then(data => {
        return [null, data]
    })
    .catch(err => [err])
  }
```

错误捕获的代码可以简化为：

```js
  import to from './to.js';

  async function asyncTask() {
      let err, user, savedTask

      [err, user] = await to(UserModel.findById(1))
      if(!user) throw new CustomerError('No user found')

      [err, savedTask] = await to(TaskModel({userId: user.id, name: 'Demo Task'}))
      if(err) throw new CustomError('Error occurred while saving task')

      if(user.notificationsEnabled) {
        const [err] = await to(NotificationService.sendNotification(user.id, 'Task Created'))
        if (err) console.error('Just log the error and continue flow')
      }
  }
```

**async 会取代 Generator 吗？**

Generator 本来是用作生成器，使用 Generator 处理异步请求只是一个比较 hack 的用法，在异步方面，async 可以取代 Generator，但是 async 和 Generator 两个语法本身是用来解决不同的问题的。


**async 会取代 Promise 吗？**

1. sync 函数返回一个 Promise 对象

2. 面对复杂的异步流程，Promise 提供的 all 和 race 会更加好用

3. Promise 本身是一个对象，所以可以在代码中任意传递

4. async 的支持率还很低，即使有 Babel，编译后也要增加 1000 行左右。