function onEdit(e) {
  if (e) {
    console.log('onEdit triggered')
    const editType = getEditType(e)
    console.log('Edit type:', editType)

    if (e.range.getRow() === 1) {
      return
    }

    switch (editType) {
      case 'Order Quantity':
        handleOrderQuantityEdit(e)
        return
      case 'Approved Timestamp': {
        if (e.value.toString().trim().length > 0) {
          processOrderProductSheet(e.source.getActiveSheet(), e.range.getRow())
        }
        return
      }
      case 'Check-In Product':
        handleCheckInProductEdit()
        return
      case 'Product Selection':
        handleProductSelectionEdit(e)
        return
    }
  }
}

/**
 * Determine which sheet and columns were edited in order to run the correct functions
 * @returns {string} The name of the edit made
 */
function getEditType(e) {
  const sheet = e.source.getActiveSheet()
  const sheetName = sheet.getName()
  const column = e.range.getColumn()
  const columnName = sheet.getRange(1, column).getValue()
  switch (sheetName) {
    case 'Order Product':
      if (columnName === 'Product Code // Item Name') {
        return 'Product Selection'
      }
      if (columnName.includes('Order Quantity')) {
        return 'Order Quantity'
      }
      if (columnName === 'Approved Timestamp') {
        return 'Approved Timestamp'
      }
    case 'Check-In Product':
      if (columnName === 'Product Code // Item Name') {
        return 'Product Selection'
      }
      return 'Check-In Product'
    default:
      return `Unrecognized edit type. Sheet:  "${sheetName}" - Column: "${column}"`
  }
}
