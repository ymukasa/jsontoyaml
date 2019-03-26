const fs = require('fs');
const electron = require('electron');
const dialog = electron.remote.dialog;
const jsyaml = require('js-yaml');

/**
 * jsonファイルの読み込みとyamlファイルの出力を行う。
 * 画面のボタン操作から呼ばれる処理。
 */
function readJsonAndOutputYaml() {
  var dirPath = document.getElementById("dirpath").value;
  if (!dirPath.endsWith("/") && !dirPath.endsWith("\\")) {
    dirPath += "/";
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

/**
 * yamlファイル出力用のディレクトリを作成する。
 * 指定されたディレクトリパスの末尾にディレクトリ区切り文字がなければ勝手に付与します。
 * @param {string} orgDirPath 作成するディレクトリのパス
 */
function mkYamlDir(orgDirPath) {
  if (!orgDirPath.endsWith("/") && !orgDirPath.endsWith("\\")) {
    orgDirPath += "/";
  }
  targetDirPath = orgDirPath + "yaml/";
  if (!fs.existsSync(targetDirPath)) {
    fs.mkdirSync(targetDirPath);
  }
  return targetDirPath;
}

/**
 * json文字列をyamlに変換してファイルに出力する処理。
 * @param {string} jsonContents 変換元のjson文字列
 * @param {string} outputDirPath 出力先のディレクトリパス
 * @param {string} fileName 出力先のファイル名
 */
function outputYaml(jsonContents, outputDirPath, fileName) {
  var yaml = jtoy(jsonContents);
  if (!outputDirPath.endsWith("/") && !outputDirPath.endsWith("\\")) {
    outputDirPath += "/";
  }
  fs.writeFileSync(outputDirPath + fileName, yaml, "utf8");
}

/**
 * json文字列をyamlに変換する。
 * 変換には js-yaml を使用する。
 * @param {string} jsonContents 変換対象のjson文字列
 */
function jtoy(jsonContents){
  try{
      return jsyaml.dump(
          JSON.parse(
              jsonContents
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
