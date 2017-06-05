const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'Protocol\ recorder-win32-x64/'),
    authors: 'Lee wang',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer-64'),
    exe: 'Protocol\ recorder.exe',
    setupExe: 'Protocol\ recorder-64.exe',
    setupIcon: path.join(rootPath, 'assets', 'icons', 'win', 'icon.ico')
  })
}
