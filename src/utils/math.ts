export const toSafeFixed = (amount: string | number, digits: number = 18): string => {
  if (amount === '' || amount === 'undefined' || amount === 'null') {
    return ''
  }
  if (amount === '0' || amount === 0) {
    return '0'
  }

  const strAmount = String(amount)
  const strArr = strAmount.split('.')
  if (strArr[1] === undefined) {
    return strArr[0]
  }
  if (digits === 0) {
    return strArr[0]
  }
  if (strArr[1].length > digits) {
    strArr[1] = strArr[1].substr(0, digits)
  }
  return `${strArr[0]}.${strArr[1]}`
}
