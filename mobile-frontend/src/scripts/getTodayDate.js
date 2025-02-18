const monthsArr = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const currentDateObj = new Date();
const currentDate = currentDateObj.getDate();
const currentMonth = monthsArr[currentDateObj.getMonth()];
const currentYear = currentDateObj.getFullYear();

output.getTodayDate = {
  spaceFormat: `${currentDate} ${currentMonth} ${currentYear}`,
  commaFormat: `${currentMonth} ${currentDate}, ${currentYear}`,
  dotFormat: `${currentDate}. ${currentMonth} ${currentYear}`,
};
