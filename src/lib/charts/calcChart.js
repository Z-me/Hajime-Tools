
export default class CalcChart {
  checkObjectValueExist (arr, key, val) {
    return arr.some(function (arrVal) {
      return val === arrVal[key]
    })
  }

  setDayObj (data) {
    let obj = {}
    for (let key in data) {
      let dates = data[key].date
      let date = dates.split('-')
      if (date[0] in obj) {
        if (!(this.checkObjectValueExist(obj[date[0]], 'date', date[1]))) {
          obj[date[0]].push({
            date: date[1],
            value: date[0] + '-' + date[1]
          })
        }
      } else {
        obj[date[0]] = [{
          date: date[1],
          value: date[0] + '-' + date[1]
        }]
      }
    }
    return obj
  }

  sortFunc (arr) {
    arr.sort(function (a, b) {
      if (a < b) return -1
      if (a > b) return 1
      return 0
    })
    return arr
  }

  validDate (y, m, d) {
    let dt = new Date(y, m - 1, d)
    return (dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d)
  }

  getAllDay (startDay, endDay) {
    let result = []
    let start = startDay.slice(0, 7) + '-01'
    let endDate = [
      endDay.slice(0, 4),
      endDay.slice(5, 7)
    ]
    let end = null
    if (this.validDate(Number(endDate[0]), Number(endDate[1]), 31)) {
      end = endDay.slice(0, 7) + '-31'
    } else if (this.validDate(Number(endDate[0]), Number(endDate[1]), 30)) {
      end = endDay.slice(0, 7) + '-30'
    } else if (this.validDate(Number(endDate[0]), Number(endDate[1]), 29)) {
      end = endDay.slice(0, 7) + '-29'
    } else {
      end = endDay.slice(0, 7) + '-28'
    }
    let inputObj = {
      year: Number(start.slice(0, 4)),
      month: Number(start.slice(5, 7)),
      day: Number(start.slice(8, 10))
    }
    let endObj = {
      year: Number(end.slice(0, 4)),
      month: Number(end.slice(5, 7)),
      day: Number(end.slice(8, 10))
    }
    let dateFlag = true
    while (dateFlag) {
      if (this.validDate(inputObj.year, inputObj.month, inputObj.day)) {
        result.push(this.getDateString(inputObj.year, inputObj.month, inputObj.day))
        inputObj.day++
      } else {
        if (this.validDate(inputObj.year, inputObj.month + 1, 1)) {
          result.push(this.getDateString(inputObj.year, inputObj.month + 1, 1))
          inputObj.month++
          inputObj.day = 2
        } else if (this.validDate(inputObj.year + 1, 1, 1)) {
          result.push(this.getDateString(inputObj.year + 1, 1, 1))
          inputObj.year++
          inputObj.month = 1
          inputObj.day = 2
        }
      }
      let input = new Date(inputObj.year, inputObj.month, inputObj.day)
      let end = new Date(endObj.year, endObj.month, endObj.day)
      if (input > end) {
        dateFlag = false
      }
    }
    return result
  }

  getDateString (year, month, day) {
    return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)
  }
}
