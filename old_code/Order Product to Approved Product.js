// function trackUpdates() {
//   Logger.log('trackUpdates triggered by time-driven trigger')

//   // var sourceSheetId = '1C4ud-RrCIhlFzc6cJbctyO_P9FKBg-yKDG35nUB28Cc';
//   var sourceSheetId = SpreadsheetApp.getActive().getId()
//   var sourceSheetName = 'Order Product'
//   var targetSheetName = 'Approved Orders'

//   try {
//     var sourceSS = SpreadsheetApp.openById(sourceSheetId)
//     var sourceSheet = sourceSS.getSheetByName(sourceSheetName)
//     Logger.log('Source sheet accessed successfully')
//   } catch (e) {
//     Logger.log('Error accessing source sheet: ' + e.message)
//     throw e
//   }

//   try {
//     var targetSheet = sourceSS.getSheetByName(targetSheetName)
//     Logger.log('Target sheet accessed successfully')
//   } catch (e) {
//     Logger.log('Error accessing target sheet: ' + e.message)
//     throw e
//   }

//   var sourceData = sourceSheet
//     .getRange(2, 1, sourceSheet.getLastRow() - 1, 14)
//     .getValues()
//   var rowsToMove = []

//   for (var i = 0; i < sourceData.length; i++) {
//     if (sourceData[i][13] !== '') {
//       rowsToMove.push(i + 2)
//     }
//   }

//   Logger.log('Rows to move: ' + JSON.stringify(rowsToMove))

//   for (var j = 0; j < rowsToMove.length; j++) {
//     var rowIndex = rowsToMove[j]
//     var rowValues = sourceSheet.getRange(rowIndex, 1, 1, 14).getValues()[0]

//     var newRow = [
//       rowValues[0], // Column A -> Column A
//       rowValues[1], // Column B -> Column B
//       rowValues[3], // Column D -> Column C
//       rowValues[5], // Column F -> Column D
//       rowValues[6], // Column G -> Column E
//       rowValues[7], // Column H -> Column F
//       '', // Column G in Approved Orders left blank
//       rowValues[8], // Column I -> Column H
//       rowValues[11], // Column L -> Column I
//       rowValues[12], // Column M -> Column J
//       '', // Placeholder for skipped column K
//       '', // Placeholder for skipped column L
//       rowValues[9], // Column J -> Column M
//       rowValues[13], // Column N -> Column N
//       '', // Placeholder for skipped column O
//       '', // Placeholder for skipped column P
//       rowValues[10], // Column K -> Column Q
//     ]

//     Logger.log('New Row: ' + JSON.stringify(newRow))

//     var lastRow = findNextAvailableRow(targetSheet, 1, 1, 12)
//     targetSheet.insertRowAfter(lastRow)
//     targetSheet.getRange(lastRow, 1, 1, newRow.length).setValues([newRow])

//     const client = g.tabs.approvedOrders.cols

//     targetSheet
//       .getRange(`${client.orderedTimestamp}${lastRow}`)
//       .setNumberFormat('MMM dd, yyyy HH:mm')
//     targetSheet
//       .getRange(`${client.approvedTimestamp}${lastRow}`)
//       .setNumberFormat('MMM dd, yyyy HH:mm')
//     targetSheet
//       .getRange(`${client.shippedTimestamp}${lastRow}`)
//       .setNumberFormat('MMM dd, yyyy HH:mm')
//     targetSheet
//       .getRange(`${client.checkedInTimestamp}${lastRow}`)
//       .setNumberFormat('MMM dd, yyyy HH:mm')

//     sourceSheet.getRange(rowIndex, 1, 1, 14).clearContent()
//     Logger.log('Cleared the copied row from Order Product')
//   }
// }
