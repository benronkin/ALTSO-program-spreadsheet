function handleRawTreatmentDataEdit(e) {
  var sheetName = e.source.getActiveSheet().getName();
  if (sheetName === "RAW Treatment Data") {
    formatColumnDAsPlainText();
  }
}
