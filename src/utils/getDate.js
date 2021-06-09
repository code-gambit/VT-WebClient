import date from "date-and-time";
const getDate = (id) =>{
    var now=date.parse(id,'YYYY-MM-DD-hh-mm-ss');
    now=date.format(now, 'ddd, MMM DD, YYYY H:mm');
    return now;
}
export default getDate;