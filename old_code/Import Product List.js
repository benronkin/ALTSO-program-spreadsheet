// function combineData() {
//   var ss = SpreadsheetApp.getActiveSpreadsheet();

//   // Sheet ID and sheet names
//   var sheetId = "1wsu1Y81UfD5JGYMtIkc8_Ely436GYyW2vMuDyxOuF1I";
//   var masterProductAccessSheetName = "Master Product Access";
//   var masterProductListSheetName = "Master Product List";
//   var tempProductListSheetName = "Product List from Master"; // New sheet name in the TEMP document

//   Logger.log("Opening sheets...");
//   // Import data from "Master Product Access" and "Master Product List"
//   var masterProductAccessSheet = SpreadsheetApp.openById(sheetId).getSheetByName(masterProductAccessSheetName);
//   var masterProductListSheet = SpreadsheetApp.openById(sheetId).getSheetByName(masterProductListSheetName);
//   var tempProductListSheet = ss.getSheetByName(tempProductListSheetName);

//   if (!masterProductAccessSheet || !masterProductListSheet || !tempProductListSheet) {
//     Logger.log("Error: Could not find one or more of the sheets.");
//     return;
//   }

//   Logger.log("Fetching data...");
//   var accessData = masterProductAccessSheet.getRange("A3:F" + masterProductAccessSheet.getLastRow()).getValues();
//   var productListData = masterProductListSheet.getRange("A2:P" + masterProductListSheet.getLastRow()).getValues();

//   Logger.log("Clearing the result sheet except for headers...");
//   tempProductListSheet.getRange(2, 1, tempProductListSheet.getMaxRows() - 1, tempProductListSheet.getMaxColumns()).clearContent();

//   // Prepare headers
//   var headers = ["Ordered", "Checked-In", "Reported", "Issues"].concat(masterProductListSheet.getRange("A1:P1").getValues()[0]);
//   tempProductListSheet.getRange(1, 1, 1, headers.length).setValues([headers]);

//   // Process and combine data
//   var combinedData = [];
//   for (var i = 0; i < accessData.length; i++) {
//     var accessRow = accessData[i];
//     var accessA = accessRow[0]; // Value from column A in "Master Product Access"

//     if (accessRow.slice(2).some(cell => cell)) { // Check if any cell in C, D, E, F is not empty
//       var matchingRow = productListData.find(productRow => productRow[3] === accessA);

//       if (matchingRow) {
//         combinedData.push(accessRow.slice(2).concat(matchingRow));
//       }
//     }
//   }

//   Logger.log("Combined data length: " + combinedData.length);

//   // Output combined data to the "Product List from Master" sheet in the TEMP document
//   if (combinedData.length > 0) {
//     tempProductListSheet.getRange(2, 1, combinedData.length, combinedData[0].length).setValues(combinedData);
//     Logger.log("Data written to Product List from Master in TEMP document.");
//   } else {
//     Logger.log("No matching data found or no data to process.");
//   }
// }
