/**
 *
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi()
  ui.createMenu('🟢 Automation')
    .addItem('Copy Master Tabs to Programs', 'copyTemplateTabsToPrograms')
    .addToUi()
}

/**
 * Copy certain template tabs to the Programs spreadsheets.
 */
function copyTemplateTabsToPrograms() {
  const ss = SpreadsheetApp.getActive()
  const sheets = ss.getSheets()
  const masterSS = SpreadsheetApp.openById(
    '1wsu1Y81UfD5JGYMtIkc8_Ely436GYyW2vMuDyxOuF1I'
  )
  const programMap = getProgramNamesAndUrls(masterSS, 'Copy Master Sheets', 2)

  Object.entries(programMap).forEach(([programName, sheetUrl]) => {
    if (programName !== 'Template') {
      console.log('Copying master tabs to ' + programName)
      const programSS = SpreadsheetApp.openByUrl(sheetUrl)
      copyMasterSheets(programSS, sheets)
    }
  })
}

/**
 * Copy the master sheets to the program spreadsheet.
 */
function copyMasterSheets(programSS, sheets) {
  const sheetNamesToExclude = [
    'Dashboard',
    'Registered Patients',
    'RAW Treatment Data',
    'Product List',
    'Treatment Data',
  ]

  for (let i = 0; i < sheets.length; i++) {
    const sheet = sheets[i]
    const sheetName = sheet.getName()
    if (sheetNamesToExclude.includes(sheetName)) {
      console.log('Skipping ' + sheetName)
      continue
    }

    let programSheet = programSS.getSheetByName(sheetName)
    if (!programSheet) {
      programSheet = sheet.copyTo(programSS)
      programSheet.setName(sheetName)
      programSheet.activate()
      programSS.moveActiveSheet(i)
    }
  }
}
