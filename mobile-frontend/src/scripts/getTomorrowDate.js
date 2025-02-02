const monthsArr = 
	['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const tomorrowDateObj = new Date();
tomorrowDateObj.setDate(tomorrowDateObj.getDate() + 1);
const tomorrowDate = tomorrowDateObj.getDate();
const currentMonth = monthsArr[tomorrowDateObj.getMonth()];
const currentYear = tomorrowDateObj.getFullYear();

output.getTomorrowDate = {
  spaceFormat: `${tomorrowDate} ${currentMonth} ${currentYear}`,
  commaFormat: `${currentMonth} ${tomorrowDate}, ${currentYear}`,
  dotFormat: `${tomorrowDate}. ${currentMonth} ${currentYear}`,
};