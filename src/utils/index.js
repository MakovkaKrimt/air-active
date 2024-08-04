export const roundFloatValue = (calcVal) => {
    const fractionDigits = 10000
    return (Math.round(calcVal * fractionDigits)) / fractionDigits
}
