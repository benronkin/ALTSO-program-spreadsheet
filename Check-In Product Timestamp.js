/**
 * Adds a timestamp to the check-in timestamp column if the product name and quantity are filled out
 */
function handleCheckInProductEdit() {
  const ss = SpreadsheetApp.getActive()
  const sh = ss.getSheetByName(g.tabs.checkInProduct.name)
  const data = sh.getDataRange().getValues()

  const num = columnLetterToNumber

  for (let i = 1; i < data.length; i++) {
    const row = data[i]
    const productCodeCol = num(g.tabs.checkInProduct.cols.productCode) - 1
    const quantityCol = num(g.tabs.checkInProduct.cols.quantity) - 1
    const checkInTimestampCol =
      num(g.tabs.checkInProduct.cols.checkInTimestamp) - 1

    const productCode = row[productCodeCol]
    const quantity = row[quantityCol]
    const checkInTimestamp = row[checkInTimestampCol]

    if (productCode && quantity && !checkInTimestamp) {
      addTimestamp(sh, i + 1, checkInTimestampCol + 1)
    }
  }
  SpreadsheetApp.flush()
}
