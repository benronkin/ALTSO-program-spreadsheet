// formatDates.js
function formatDates() {
  var sheetsToFormat = [
    { name: 'Registered Patients', dateTimeColumns: ['N'], dateColumns: ['O'], referenceColumn: 'A' },
    { name: 'Treatment Reports', dateTimeColumns: ['A'], dateColumns: ['D', 'F'], referenceColumn: 'A' },
    { name: 'Check-In Product', dateTimeColumns: ['E'], dateColumns: [], referenceColumn: 'A' },
    { name: 'Order Product', dateTimeColumns: ['J', 'N'], dateColumns: [], referenceColumn: 'A' },
    { name: 'Approved Orders', dateTimeColumns: ['N', 'O', 'M', 'P'], dateColumns: [], referenceColumn: 'A' },
    { name: 'Check-In Archive', dateTimeColumns: ['E'], dateColumns: [], referenceColumn: 'A' }
  ];

  sheetsToFormat.forEach(function(sheetInfo) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetInfo.name);
    if (sheet) {
      var lastRow = sheet.getLastRow();
      Logger.log("Processing sheet: " + sheetInfo.name + " with lastRow: " + lastRow);

      sheetInfo.dateTimeColumns.forEach(function(col) {
        var range = sheet.getRange(col + '2:' + col + lastRow);
        Logger.log("Formatting dateTimeColumn: " + col + " with range: " + range.getA1Notation());
        range.setNumberFormat('MMM dd, yyyy HH:mm');
      });

      sheetInfo.dateColumns.forEach(function(col) {
        var range = sheet.getRange(col + '2:' + col + lastRow);
        Logger.log("Formatting dateColumn: " + col + " with range: " + range.getA1Notation());
        range.setNumberFormat('MMM dd, yyyy');
      });
    } else {
      Logger.log("Sheet not found: " + sheetInfo.name);
    }
  });
}
// hardcodeValuesInRawTreatmentData.js
function hardcodeValuesInRawTreatmentData() {
  var sheetName = 'RAW Treatment Data';
  var numInstances = 10; // Number of instances
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    Logger.log("Sheet not found: " + sheetName);
    return;
  }

  // Define the pattern of columns (J, N, R, ...)
  var columns = [10, 14, 18]; // J, N, R correspond to columns 10, 14, and 18
  var hardcodedValues = [
    'Hardcoded Value 1',
    'Hardcoded Value 2',
    'Hardcoded Value 3',
    'Hardcoded Value 4',
    'Hardcoded Value 5',
    'Hardcoded Value 6',
    'Hardcoded Value 7',
    'Hardcoded Value 8',
    'Hardcoded Value 9',
    'Hardcoded Value 10'
  ];

  for (var i = 0; i < numInstances; i++) {
    var column = columns[i % columns.length];
    var row = Math.floor(i / columns.length) + 1;
    var value = hardcodedValues[i];
    
    sheet.getRange(row, column).setValue(value);
    Logger.log("Set value '" + value + "' in cell " + sheet.getRange(row, column).getA1Notation());
  }

  Logger.log("Hardcoded values set for " + numInstances + " instances in columns J, N, R, and so on.");
}
