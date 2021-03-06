
// 插入排序 代码实现
function insert(A, i, x) {
    let p = i - 1
    while(A[p] > x) {
        A[p + 1] = A[p]
        p--
    }
    A[p + 1] = x
}

function insertion_sort(A) {
    for(let i = 1; i < A.length; i++) {
        insert(A, i, A[i])
    }
}

const A = [5, 8, 1, 3, 2, 4, 9]
insertion_sort(A)
console.log(A)