'use strict';

// Electronのモジュール
const {app, Menu, BrowserWindow} = require("electron");

// メインウィンドウはGCされないようにグローバル宣言
let mainWindow;

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on('ready', function() {

  Menu.setApplicationMenu(null);

  // メイン画面の表示。ウィンドウの幅、高さを指定できる
  mainWindow = new BrowserWindow({width: 800, height: 500, resizable: true});
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // 開発者ツールの表示
  // mainWindow.webContents.openDevTools();

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});