function handleRegisteredPatientsEdit(e) {
  var range = e.range;
  var sheet = range.getSheet();
  var editedColumn = range.getColumn();
  var editedRow = range.getRow();
  
  if (editedColumn === 4 || editedColumn === 5) {
    var cell = sheet.getRange(editedRow, editedColumn);
    var value = cell.getValue();
    var properCaseValue = toProperCase(value);
    cell.setValue(properCaseValue);
  }
}

function toProperCase(str) {
  return str.toLowerCase().replace(/\b\w/g, function(l) { return l.toUpperCase(); });
}
