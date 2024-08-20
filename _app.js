/**
 * ----------------------------------------------------------------------------------
 * Instructions:
 * 1. Copy _app-file-ids.txt and _app.js to the root of your project.
 * 2. Update the project's .claspignore file to ignore _app-file-ids.txt and _app.js.
 * 3. Run the script by executing the following command in the terminal: node _app.js
 * ----------------------------------------------------------------------------------
 */
const fs = require('fs')
const { exec } = require('child_process')

let gasFileIds

/**
 * Pushes the content of a file to multiple Google Apps Script files.
 */
function pushToMultipleGasFiles() {
  console.log('Starting push...')
  gasFileIds = getGasIds()
  pushSingleGasFile(0)
}

/**
 * Get the list of Google Apps Script ids from the file.
 */
function getGasIds() {
  const gasFileName = '_app-file-ids.txt'
  const gasFileContent = fs.readFileSync(gasFileName, 'utf8')
  const gasFiles = gasFileContent.split('\n')
  return gasFiles
}

/**
 *
 */
function pushSingleGasFile(idNumber) {
  if (idNumber >= gasFileIds.length) {
    console.log('Push complete')
    return
  }

  const gasId = gasFileIds[idNumber]
  if (!gasId || gasId.toString().trim() === '') {
    return pushSingleGasFile(idNumber + 1)
  }

  console.log('Pushing to Google Apps Script file number: ', idNumber + 1)
  updateClaspJson(gasId)
  runNpmPush(gasId, idNumber)
}

/**
 * Update .clasp.json with the new scriptId.
 */
function updateClaspJson(gasId) {
  const claspJson = fs.readFileSync('.clasp.json', 'utf8')
  const claspObj = JSON.parse(claspJson)
  claspObj.scriptId = gasId
  fs.writeFileSync('.clasp.json', JSON.stringify(claspObj, null, 2))
}

/**
 * Run npm push command.
 */
function runNpmPush(gasId, idNumber) {
  exec('npx clasp push --force', (err, stdout, stderr) => {
    if (err) {
      console.error(err)
      return
    }
    if (stderr) {
      console.error(stderr)
    }
    console.log(`Pushed to Google Apps Script file with id: ${gasId}`)
    console.log(stdout)
    pushSingleGasFile(idNumber + 1)
  })
}

pushToMultipleGasFiles()
