export const calculatePosition = (value, minValue, maxValue) => {
    const percentage = (parseFloat(value) / (parseFloat(maxValue) + parseFloat(minValue) + parseFloat(maxValue)) * 100 );
    if (percentage > 100 ) return 100
    if (percentage < 0 ) return 0
    return percentage
};