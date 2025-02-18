const currentDateObj = new Date();
const currentHour = currentDateObj.getHours();
const nextHour = currentDateObj.setHours(currentDateObj.getHours() + 1);

output.getHours = {
  currentHour: currentHour.toFixed(),
  nextHour: nextHour.toFixed(),
};
