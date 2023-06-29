
export default function (currentPage: number, pageBreak: number, array: Array<any>) {
    let leftover: number = 0
    let end: number = 0
    let start: number = 0

    if (currentPage - pageBreak < 0) {
        leftover = Math.abs(currentPage - pageBreak)
        start = 0
        end += leftover
    } else {
        start = currentPage - pageBreak
    }

    if (currentPage + pageBreak > array.length) {
        leftover = Math.abs(currentPage + pageBreak - array.length)
        start -= leftover
        end = array.length
    } else {
        end += currentPage + pageBreak
    }

    return array.slice(start, end)
}