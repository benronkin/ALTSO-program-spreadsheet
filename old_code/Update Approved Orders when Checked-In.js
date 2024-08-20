function handleOrderProductEdit(e) {
  var sheet = e.source.getActiveSheet();
  var editedCell = e.range;
  var row = editedCell.getRow();
  var column = editedCell.getColumn();

  Logger.log("Edited sheet: " + sheet.getName() + ", Row: " + row + ", Column: " + column);

  // Ensure we skip the header row
  if (row == 1) return;

  // Check if the edit is in column B (index 2)
  if (column == 2) {
    Logger.log("Column B updated. Adding timestamp and checking if unique identifier is needed.");
    addTimestamp(sheet, row, 10); // Add timestamp in column J (index 10)

    if (!sheet.getRange(row, 11).getValue()) { // Check if unique identifier is already set in column K (index 11)
      Logger.log("No unique identifier found. Generating unique identifier.");
      generateUniqueIdentifier(sheet, row); // Generate unique identifier if not set
    } else {
      Logger.log("Unique identifier already exists. No action needed.");
    }
  }

  // Check if the edit is in column N (index 14)
  if (column == 14 && sheet.getRange(row, 14).getValue() !== '') {
    Logger.log("Column N updated. Processing the row for transfer to Approved Orders.");
    processOrderProductSheet(sheet, row);
  }
}

function addTimestamp(sheet, row, column) {
  var cell = sheet.getRange(row, column);
  cell.setValue(new Date());
  Logger.log("Timestamp added to row " + row + ", column " + column);
}

function generateUniqueIdentifier(sheet, row) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var orderProductSheet = ss.getSheetByName("Order Product");
  var approvedOrdersSheet = ss.getSheetByName("Approved Orders");

  // Get existing identifiers from both sheets
  var orderProductData = orderProductSheet.getRange("K2:K").getValues();
  var approvedOrdersData = approvedOrdersSheet.getRange("R2:R").getValues();

  var existingIds = new Set();

  Logger.log("Checking existing identifiers in Order Product sheet");
  // Extract existing identifiers from Order Product
  for (var i = 0; i < orderProductData.length; i++) {
    var value = orderProductData[i][0];
    if (value) {
      existingIds.add(value);
      Logger.log("Existing ID from Order Product: " + value);
    }
  }

  Logger.log("Checking existing identifiers in Approved Orders sheet");
  // Extract existing identifiers from Approved Orders
  for (var i = 0; i < approvedOrdersData.length; i++) {
    var value = approvedOrdersData[i][0];
    if (value) {
      existingIds.add(value);
      Logger.log("Existing ID from Approved Orders: " + value);
    }
  }

  // Generate a new unique identifier
  var newId;
  var counter = 0;
  do {
    newId = 'temp' + ('000' + counter).slice(-3); // Format tempXXX
    counter++;
  } while (existingIds.has(newId));

  Logger.log("Generated unique ID: " + newId);

  // Set the new unique identifier in column K (index 11)
  sheet.getRange(row, 11).setValue(newId);
  Logger.log("Unique identifier " + newId + " added to row " + row + ", column K");
}
