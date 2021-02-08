function createEmployeeRecord(arr) {
  let newObject = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return newObject;
}

function createEmployeeRecords(arr) {
  return arr.map((record) => {
    return createEmployeeRecord(record);
  });
}

function createTimeInEvent(dateStamp) {
  let splitTime = dateStamp.split(" ");
  let newObj = {
    type: "TimeIn",
    hour: parseInt(splitTime[1]),
    date: splitTime[0],
  };
  this.timeInEvents.push(newObj);
  return this;
}

function createTimeOutEvent(dateStamp) {
  let splitTime = dateStamp.split(" ");
  let newObj = {
    type: "TimeOut",
    hour: parseInt(splitTime[1]),
    date: splitTime[0],
  };
  this.timeOutEvents.push(newObj);
  return this;
}

function hoursWorkedOnDate(date) {
  let timeIn = this.timeInEvents.find((x) => {
    return x.date === date;
  });
  let timeOut = this.timeOutEvents.find((x) => {
    return x.date === date;
  });
  let hours = (timeOut.hour - timeIn.hour) / 100;
  return hours;
}

function wagesEarnedOnDate(date) {
  let hoursFn = hoursWorkedOnDate.bind(this);
  let hours = hoursFn(date);
  return hours * this.payPerHour;
}

function calculatePayroll(arr) {
  return arr.reduce((acc, employee) => {
    return (acc += allWagesFor.call(employee));
  }, 0);
}

function findEmployeeByFirstName(arr, name) {
  return arr.find((x) => {
    return x.firstName === name;
  });
}

// Break

let allWagesFor = function () {
  let eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  let payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};
