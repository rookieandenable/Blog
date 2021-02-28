# 二分查找

```js
    // 在一组已经排序好的数中查找，返回索引 未找到返回 -1
    function bSearch(A, x) {
        let l = 0,
            r = A.length - 1,
            guess
        while(l <= r) {
            if(a[guess] === x) return guess
            if(a[guess] < x) l = guess + 1
            else if(a[guess] > x) r = guess - 1
        }
        return -1    
    }

    let arr = [1, 2, 5, 11, 12, 16]
    console.log(bSearch(arr, 11)) // 结果是：3
```