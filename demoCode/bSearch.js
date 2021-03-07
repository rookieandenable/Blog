
// 二分查找 代码实现


function bsearch(A, x) {
    let l = 0,
        r = A.length - 1,
        guess

    while(l <= r) {
        guess = Math.floor((l + r)/2)

        if(A[guess] === x) return guess
        else if(A[guess] < x) l = guess + 1
        else r = guess - 1
    }
    return -1
}

const A = [1, 3, 5, 6, 7, 12, 18]
console.log(bsearch(A, 22)) // 结果：-1
console.log(bsearch(A, 12)) // 结果：5