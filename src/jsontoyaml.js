const fs = require('fs');
const electron = require('electron');
const dialog = electron.remote.dialog;
const jsyaml = require('js-yaml');

function readJsonAndOutputYaml() {
  var dirPath = document.getElementById("dirpath").value;
  if (!dirPath.endsWith("/") && !dirPath.endsWith("\\")) {
    dirPath += "\\";
  }
  fs.readdir(dirPath, function(err, fileNameList) {
    if (err) throw err;
    var yamlDirPath = mkYamlDir(dirPath);
    fileNameList.forEach(function(fileName){
      var filePath = dirPath + fileName;
      if (/.*\.json$/.test(fileName)){
        fs.accessSync(filePath, fs.constants.R_OK);
        if (err) throw err;
        var jsonContents = fs.readFileSync(filePath, "utf8");
        var yamlFileName = fileName.replace("\.json", ".yml");
        outputYaml(jsonContents, yamlDirPath, yamlFileName);
      }
    });
    dialog.showMessageBox(null, {message: '出力完了'});
  });
}

function mkYamlDir(orgDirPath) {
  if (!orgDirPath.endsWith("/") && !orgDirPath.endsWith("\\")) {
    orgDirPath += "\\";
  }
  targetDirPath = orgDirPath + "yaml\\";
  if (!fs.existsSync(targetDirPath)) {
    fs.mkdirSync(targetDirPath);
  }
  return targetDirPath;
}

function outputYaml(jsonContents, outputDirPath, fileName) {
  var yaml = jtoy(jsonContents);
  if (!outputDirPath.endsWith("/") && !outputDirPath.endsWith("\\")) {
    outputDirPath += "\\";
  }
  fs.writeFileSync(outputDirPath + fileName, yaml, "utf8");
}

function jtoy(val){
  try{
      return jsyaml.dump(
          JSON.parse(
              val
              .replace(/([^\\])\\t/g,"$1<<TAB>>")
              .replace(/([^\\])\\t/g,"$1<<TAB>>")
              .replace(/^\\t/g,"<<TAB>>")
          )
      ).replace(/<<TAB>>/g,"\t");
  }catch(e){
      alert(e.message);
  }
}

/**
 * ダイアログ表示して、処理するディレクトリを選択⇒設定する。
 */
function selectDirectory() {
  dialog.showOpenDialog(null, {
    properties: ['openDirectory'],
    title: 'フォルダ(単独選択)',
    defaultPath: '.'
  }, (folderNames) => {
    if (folderNames !== undefined && folderNames.length > 0) {
      document.getElementById("dirpath").value = folderNames[0];
    }
  });
}
