
// 冒泡排序 代码实现

function bubble_sort(A) {
    for(let i = A.length; i >= 1; i--) {
        for(let j = 1; j <= i; j++) {
            A[j - 1] > A[j] && swap(A, j - 1, j)
        }
    }
}

function swap(A, i, j) {
    const temp = A[i]
    A[i] = A[j]
    A[j] = temp
}

const A = [5, 8, 1, 3, 2, 4, 6]
bubble_sort(A)
console.log(A) // [1, 2, 3, 4, 5, 6, 8]