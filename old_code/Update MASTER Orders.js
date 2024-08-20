function updateMasterOrders() {
  var approvedOrdersSheetName = 'Approved Orders';
  var approvedOrdersSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(approvedOrdersSheetName);
  var approvedOrdersData = approvedOrdersSheet.getDataRange().getValues();
  
  var destinationSpreadsheetId = '1wsu1Y81UfD5JGYMtIkc8_Ely436GYyW2vMuDyxOuF1I';
  var masterApprovedSheetName = 'Master Approved';
  var destinationSS = SpreadsheetApp.openById(destinationSpreadsheetId);
  var masterApprovedSheet = destinationSS.getSheetByName(masterApprovedSheetName);
  var masterApprovedData = masterApprovedSheet.getDataRange().getValues();

  for (var i = 1; i < approvedOrdersData.length; i++) {
    if (approvedOrdersData[i][11] !== '') { // Check if column L (index 11) is not blank
      var uniqueId = approvedOrdersData[i][16]; // Unique identifier from column Q (index 16)
      Logger.log('Processing Approved Orders Row: ' + (i + 1) + ', Unique ID: ' + uniqueId);
      
      for (var j = 1; j < masterApprovedData.length; j++) {
        Logger.log('Checking Master Approved Row: ' + (j + 1) + ', Unique ID: ' + masterApprovedData[j][10]);
        if (masterApprovedData[j][10] === uniqueId) { // Matching unique identifier in column K (index 10)
          masterApprovedSheet.getRange(j + 1, 16).setValue(approvedOrdersData[i][11]); // Column P
          masterApprovedSheet.getRange(j + 1, 20).setValue(approvedOrdersData[i][15]); // Column T
          Logger.log('Updated Master Approved Row: ' + (j + 1) + ' with data from Approved Orders for Unique ID: ' + uniqueId);
          break;
        }
      }
    }
  }
}
