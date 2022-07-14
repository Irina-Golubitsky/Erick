module.exports = (
  date) => {
    if (date!==null){
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
      date
    ).getFullYear()}`;}
    else return null
  }