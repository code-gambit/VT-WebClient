const moment = require('moment');
const getDate = (dateString) =>{    
    var gmtDateTime = moment.utc(dateString, "YYYY-MM-DD-hh-mm")
    var local = gmtDateTime.local().format('YYYY-MMM-DD h:mm A');    
    return local;
}
export default getDate;