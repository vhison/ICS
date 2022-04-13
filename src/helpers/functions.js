export const upperCase = (value) => {
    var res = value.toUpperCase();
    return res;
};
export const dateMonthOfTimestamp = (value) => {
    var arr = value.split("-");    
    var date = parseInt(arr[2],10);
    var months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
    var month_index =  parseInt(arr[1],10) - 1;
    return date + ' ' +months[month_index];
};