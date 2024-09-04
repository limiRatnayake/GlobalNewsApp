import moment from 'moment';
 
export const getDifferenceFromNow = date => {
  const now = moment(); 
  const endDate = moment(date); 
  const duration = moment.duration(endDate.diff(now));

  const days = Math.abs(duration.asDays()); 
  const hours = Math.abs(duration.asHours()) % 24;  

 
  const daysDisplay = `${Math.floor(days)} days`;
  const hoursDisplay = `${Math.floor(hours)} hours`;
  return `${daysDisplay}, ${hoursDisplay}`;
};
 
export const formatDate = (date, format = 'HH:mm:ss') => {
  return moment(date).format(format);
};
