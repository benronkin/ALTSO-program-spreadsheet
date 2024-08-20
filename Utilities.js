const g = {
  tabs: {
    approvedOrders: {
      name: 'Approved Orders',
      cols: {
        orderedTimestamp: 'M',
        approvedTimestamp: 'N',
        shippedTimestamp: 'O',
        checkedInTimestamp: 'P',
      },
    },
    checkInProduct: {
      name: 'Check-In Product',
      cols: {
        productCode: 'A',
        quantity: 'B',
        category: 'C',
        manufacturer: 'D',
        checkInTimestamp: 'E',
      },
    },
  },
}

/**
 *
 */
function addTimestamp(sheet, row, column) {
  const cell = sheet.getRange(row, column)
  cell.setValue(new Date())
  cell.setNumberFormat('MMM dd, yyyy HH:mm')
  SpreadsheetApp.flush()
  console.log('Timestamp added to row ' + row + ', column ' + column)
}

/**
 *
 */
/**
 * Create a map of program names to their Google Sheet URLs
 * @returns {Object} programMap
 */
function getProgramNamesAndUrls(ss, tabName, headerRows = 1) {
  const programMap = {}

  const sh = ss.getSheetByName(tabName)
  const data = sh.getDataRange().getValues()
  data.splice(0, headerRows) // Remove header rows

  data.forEach((row) => {
    const [programName, sheetUrl] = row
    if (programName && sheetUrl) {
      programMap[programName] = sheetUrl
    }
  })
  return programMap
}

/**
 *
 */
function generateUniqueIdentifier(sheet, row) {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var orderProductSheet = ss.getSheetByName('Order Product')
  var approvedOrdersSheet = ss.getSheetByName('Approved Orders')

  var orderProductData = orderProductSheet.getRange('K2:K').getValues()
  var approvedOrdersData = approvedOrdersSheet.getRange('R2:R').getValues()

  var existingIds = new Set()

  Logger.log('Checking existing identifiers in Order Product sheet')
  for (var i = 0; i < orderProductData.length; i++) {
    var value = orderProductData[i][0]
    if (value) {
      existingIds.add(value)
      Logger.log('Existing ID from Order Product: ' + value)
    }
  }

  Logger.log('Checking existing identifiers in Approved Orders sheet')
  for (var i = 0; i < approvedOrdersData.length; i++) {
    var value = approvedOrdersData[i][0]
    if (value) {
      existingIds.add(value)
      Logger.log('Existing ID from Approved Orders: ' + value)
    }
  }

  var newId
  var counter = 0
  do {
    newId = 'temp' + ('000' + counter).slice(-3)
    counter++
  } while (existingIds.has(newId))

  Logger.log('Generated unique ID: ' + newId)
  sheet.getRange(row, 11).setValue(newId)
  Logger.log(
    'Unique identifier ' + newId + ' added to row ' + row + ', column K'
  )
}

/**
 *
 */
function findNextAvailableRow(sheet, startRow, startCol, endCol) {
  var data = sheet
    .getRange(
      startRow,
      startCol,
      sheet.getLastRow() - startRow + 1,
      endCol - startCol + 1
    )
    .getValues()
  for (var row = 0; row < data.length; row++) {
    var isEmpty = data[row].every(function (cell) {
      return cell === '' || cell === null
    })
    if (isEmpty) {
      return row + startRow
    }
  }
  return startRow
}

/**
 * Convert Google Sheet column letters to a number
 * @param {String} letter The column letter
 * @returns {Number} The column number
 */
function columnLetterToNumber(letter) {
  let num = 0,
    length = letter.length
  for (var i = 0; i < length; i++) {
    num += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1)
  }
  return num
}
