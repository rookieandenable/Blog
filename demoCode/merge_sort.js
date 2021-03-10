// 归并(合并)排序 代码实现

function merge(A, p, q, r) {
    let A1 = A.slice(p, q)
    let A2 = A.slice(q, r)
    A1.push(Number.MAX_SAFE_INTEGER)
    A2.push(Number.MAX_SAFE_INTEGER)
    for(let k = p, i= 0, j = 0; k < r; k++) {
        A[k] = A1[i] < A2[j] ? A1[i++] : A2[j++]
    }
}

function merge_sort(A, p, r) {
    if(r - p < 2) return
    const q = Math.ceil( (p + r) / 2 )
    merge_sort(A, p, q)
    merge_sort(A, q, r)
    merge(A, p, q, r)
}

const A = [1, 8, 6, 23, 98, 12,16]
merge_sort(A, 0, A.length)
console.log(A)