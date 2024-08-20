// Function to disable all triggers
function disableTriggers() {
  var triggers = ScriptApp.getProjectTriggers()
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i])
  }
  SpreadsheetApp.getActiveSpreadsheet().toast('Triggers disabled', 'Status')
}

// Function to enable triggers
function enableTriggers() {
  createTriggers()
  SpreadsheetApp.getActiveSpreadsheet().toast('Triggers enabled', 'Status')
}

// Function to create the triggers
function createTriggers() {
  // Clear existing triggers first
  disableTriggers()

  // Create onEdit trigger
  ScriptApp.newTrigger('onEdit')
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onEdit()
    .create()

  // Create onChange trigger
  ScriptApp.newTrigger('onChange')
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onChange()
    .create()

  // Create time-based triggers
  ScriptApp.newTrigger('trackUpdates').timeBased().everyMinutes(1).create()

  ScriptApp.newTrigger('copyNewOrderRows').timeBased().everyMinutes(1).create()

  ScriptApp.newTrigger('ArchiveCheckInProduct')
    .timeBased()
    .everyHours(12)
    .atHour(0)
    .create()

  ScriptApp.newTrigger('ArchiveCheckInProduct')
    .timeBased()
    .everyHours(12)
    .atHour(12)
    .create()

  ScriptApp.newTrigger('combineData').timeBased().everyHours(1).create()
}

// Function to set up the custom menu
// function onOpen() {
//   var ui = SpreadsheetApp.getUi();
//   ui.createMenu('Trigger Control')
//     .addItem('Enable Triggers', 'enableTriggers')
//     .addItem('Disable Triggers', 'disableTriggers')
//     .addToUi();
// }
