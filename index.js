function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    return employees.map(function(employee) {
        return createEmployeeRecord(employee)
    })
}

function createTimeInEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(" ")
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })

    return employee
}

function createTimeOutEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(" ")
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return employee
}

function hoursWorkedOnDate(employee, formDate){
   let timeIn = employee.timeInEvents.find(function(e){
        return e.date === formDate
    })

    let timeOut = employee.timeOutEvents.find(function(e){
        return e.date === formDate
    })
    return (timeOut.hour - timeIn.hour) /100
}

function wagesEarnedOnDate(employee, date){
    let hoursWorked = hoursWorkedOnDate(employee, date) * employee.payPerHour
    return hoursWorked
}

function allWagesFor(employee){
    let allDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let totalPay = allDates.reduce(function(acc, dates){
        return acc + wagesEarnedOnDate(employee, dates)
    }, 0)
    
    return totalPay
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(function(e){
        return e.firstName === firstName
    })
}

function calculatePayroll(array){
    return array.reduce(function(acc, e){
        return acc + allWagesFor(e)
    }, 0)
}