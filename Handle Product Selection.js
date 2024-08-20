/**
 * Prevent duplicate product selection
 */
function handleProductSelectionEdit(e) {
  const sheet = e.source.getActiveSheet()
  const column = e.range.getColumn()
  const row = e.range.getRow()
  const selectedProduct = e.value

  const productCodes = sheet
    .getRange(2, column, sheet.getLastRow() - 1, 1)
    .getValues()
    .flat()
  const totalRowsWithSelectedProduct = productCodes.filter(
    (productCode) => productCode === selectedProduct
  ).length
  if (totalRowsWithSelectedProduct > 1) {
    sheet.getRange(row, column).setValue('')
    SpreadsheetApp.flush()
    SpreadsheetApp.getUi().alert(
      'This product has already been selected. Please choose a different product.'
    )
  }
}
