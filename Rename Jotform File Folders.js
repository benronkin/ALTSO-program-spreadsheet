function renameFolder() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RAW Treatment Data'); 
  var range = sheet.getRange('BB2:BD'); 
  var data = range.getValues();
  
  for (var i = 0; i < data.length; i++) {
    var folderId = data[i][0];
    var newName = data[i][1];
    var processed = data[i][2];

    if (folderId && newName && !processed) {
      try {
        var folder = DriveApp.getFolderById(folderId);
        folder.setName(newName);
        sheet.getRange(i + 2, 56).setValue('Processed');
      } catch (e) {
        Logger.log('Error: ' + e.message);
      }
    }
  }
}
