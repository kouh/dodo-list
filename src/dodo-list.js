"use strict";
let remote = require('remote');
let ipc = require('ipc');
let path = require('path');
let app = remote.require('app');
let shell = require('shell');
let fs = require('fs');
let mainWindow = remote.getCurrentWindow();
var startTime;
var stopTime;
var dodoList = document.getElementById('dodo-list');
let share = remote.getGlobal('share');
let timer = null;
const DATA_FILE = __dirname + '/settings.json';

ipc.on('createTask', function(task){
  dodoList.add(task);
});

try{
  let tasks = require(DATA_FILE);
  if(tasks instanceof Array){
    dodoList.factoryImpl(tasks);
  }else{
    dodoList.add();
  }
}catch(e){
  console.log(e);
  dodoList.add();
}

document.getElementById('start-task').addEventListener('click', function(e){
  if(timer === null){
    timerStart();
  }else{
    timerStop();
  }
});

document.getElementById('stop-task').addEventListener('click', function(e){
  timerStop();
  startTime = undefined;
  stopTime = undefined;
  document.getElementById('time').textContent = '00:00:00';
});

window.onbeforeunload = function(){
  fs.writeFileSync(DATA_FILE, JSON.stringify(dodoList.tasks, null, '  '));
};

function timerStart(){
  document.getElementById('task-name').textContent = dodoList.selected.name;
  console.log(dodoList.selected);
  let time = document.getElementById('time');
  document.getElementById('start-task').textContent = 'Pause';
  if(stopTime){
    startTime = startTime + new Date().getTime() - stopTime;
  }
  if(!startTime){
    startTime = new Date().getTime();
  }
  timer = setInterval(function(){
    // console.time('All');
    let diff = (new Date().getTime() - startTime) /1000;
    let h = (diff / 3600)>>0;
    let m = ((diff % 3600) / 60)>>0;
    let s = ((diff % 3600) % 60)>>0;
    
    if(h < 10) h = '0' + h;
    if(m < 10) m = '0' + m;
    if(s < 10) s = '0' + s;
    
    time.textContent = `${h}:${m}:${s}`;

    // console.timeEnd('All');
    
  },100);
}

function timerStop(){
  if(timer === null) return;
  stopTime = new Date().getTime();
  clearInterval(timer);
  timer = null;
  document.getElementById('start-task').textContent = 'Start';
}
