var app = require('app');
var ipc = require('ipc');
var BrowserWindow = require('browser-window');

var globalShortcut = require('global-shortcut');
var Tray = require('tray');
var Menu = require('menu');
var MenuItem = require('menu-item');
var mainWindow = null;

var contextMenu = null;
var trayIcon = null;
app.on('window-all-closed', function(){
  if (process.platform != 'darwin')
    app.quit();
});

// main.js
var template = [
{
  label: 'DoDoList',
  submenu: [
  {
    label: 'About DoDoList',
    selector: 'orderFrontStandardAboutPanel:'
  },
  {
    type: 'separator'
  },
  {
    label: 'Services',
    submenu: []
  },
  {
    type: 'separator'
  },
  {
    label: 'Hide Chatoon',
    accelerator: 'Command+H',
    selector: 'hide:'
  },
  {
    label: 'Hide Others',
    accelerator: 'Command+Shift+H',
    selector: 'hideOtherApplications:'
  },
  {
    label: 'Show All',
    selector: 'unhideAllApplications:'
  },
  {
    type: 'separator'
  },
  {
    label: 'Quit',
    accelerator: 'Command+Q',
    click: function() { app.quit(); }
  },
  ]
},
{
  label: 'Edit',
  submenu: [
  {
    label: 'Undo',
    accelerator: 'Command+Z',
    selector: 'undo:'
  },
  {
    label: 'Redo',
    accelerator: 'Shift+Command+Z',
    selector: 'redo:'
  },
  {
    type: 'separator'
  },
  {
    label: 'Cut',
    accelerator: 'Command+X',
    selector: 'cut:'
  },
  {
    label: 'Copy',
    accelerator: 'Command+C',
    selector: 'copy:'
  },
  {
    label: 'Paste',
    accelerator: 'Command+V',
    selector: 'paste:'
  },
  {
    label: 'Select All',
    accelerator: 'Command+A',
    selector: 'selectAll:'
  },
  ]
},
{
  label: 'View',
  submenu: [
  {
    label: 'Reload',
    accelerator: 'Command+R',
    click: function() { 
      // BrowserWindow.getFocusedWindow().reloadIgnoringCache();
      mainWindow.loadUrl('file://' + __dirname + '/main.html');
    }
  },
  {
    label: 'Toggle DevTools',
    accelerator: 'Alt+Command+I',
    click: function() { BrowserWindow.getFocusedWindow().toggleDevTools(); }
  },
  ]
},
{
  label: 'Window',
  submenu: [
  {
    label: 'Minimize',
    accelerator: 'Command+M',
    selector: 'performMiniaturize:'
  },
  {
    label: 'Close',
    accelerator: 'Command+W',
    selector: 'performClose:'
  },
  {
    type: 'separator'
  },
  {
    label: 'Bring All to Front',
    selector: 'arrangeInFront:'
  },
  ]
},
{
  label: 'Help',
  submenu: []
},
  ];

app.on('ready', function(){
  createWindow();
  menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  ipc.on('createTask', function(event, msg){
    mainWindow.webContents.send('createTask', msg);
  });

  // trayIcon = new Tray(__dirname + '/asset/icon.png');
  //
  // trayIcon.on('clicked', function() {
  //   if(mainWindow.isVisible()){
  //     mainWindow.close();
  //   }else{
  //     mainWindow.show();
  //   }
  // });

  //ショートカット
  var ret = globalShortcut.register('ctrl+t', function() { 
    console.log('ctrl+t is pressed'); 

    var w = new BrowserWindow({
      width: 500,
      height: 30,
      'use-content-size': true,
      frame: false,
      transparent: false,
      'always-on-top': true,
      'show': true,
      // 'skip-taskbar': true,
    });
    w.loadUrl('file://' + __dirname + '/create-task.html');
  });
});

app.on('before-quit', function(){
  console.log('before-quit');
});
function createWindow() {

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    frame: false,
    transparent: false,
    'always-on-top': false,
    // 'skip-taskbar': true,
  });
  mainWindow.loadUrl('file://' + __dirname + '/main.html');
  mainWindow.on('focus', function(){
    console.log('focus.');
  });
  mainWindow.on('close', function() {
    console.log('close.');
  });
  mainWindow.on('closed', function(){
    console.log('closed.');
    mainWindow = null;
  });
}
