
export const formatDate = new Intl.DateTimeFormat('en-GB', {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
})

export const formatDateDetailed = new Intl.DateTimeFormat('en-GB', {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
})
