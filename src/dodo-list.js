"use strict";
let remote = require('remote');
let path = require('path');
let app = remote.require('app');
let shell = require('shell');
let mainWindow = remote.getCurrentWindow();

let dodoList = document.getElementById('dodo-list');
console.log(dodolist.tasks);

var t = new dodolist(['aaa','bbb']);
document.getelementbyid('wrapper').appendchild(t);
