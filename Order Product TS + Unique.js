/**
 * Add timestamp and unique identifier to the row
 * @param {*} e
 */
function handleOrderQuantityEdit(e) {
  var sheet = e.source.getActiveSheet()
  var editedCell = e.range
  var row = editedCell.getRow()
  addTimestamp(sheet, row, 10)
  if (!sheet.getRange(row, 11).getValue()) {
    console.log('No unique identifier found. Generating unique identifier.')
    sheet.getRange(row, 11).setValue(Utilities.getUuid())
  } else {
    console.log('Unique identifier already exists. No action needed.')
  }
}
