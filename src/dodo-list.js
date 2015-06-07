"use strict";
let remote = require('remote');
let path = require('path');
let app = remote.require('app');
let shell = require('shell');
let mainWindow = remote.getCurrentWindow();

let dodoList = document.getElementById('dodo-list');

document.getElementById('add-task').addEventListener('click', function(e){
 dodoList.add(); 
});
