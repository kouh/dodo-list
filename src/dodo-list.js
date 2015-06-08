"use strict";
let remote = require('remote');
let ipc = require('ipc');
let path = require('path');
let app = remote.require('app');
let shell = require('shell');
let fs = require('fs');
let mainWindow = remote.getCurrentWindow();

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
  document.getElementById('h').textContent = '00';
  document.getElementById('m').textContent = '00';
  document.getElementById('s').textContent = '00';
});

window.onbeforeunload = function(){
  fs.writeFileSync(DATA_FILE, JSON.stringify(dodoList.tasks, null, '  '));
};

function timerStart(){
  document.getElementById('task-name').textContent = dodoList.selected.name;
  console.log(dodoList.selected);
  let hour = document.getElementById('h');
  let min = document.getElementById('m');
  let sec = document.getElementById('s');
  document.getElementById('start-task').textContent = 'Pause';
  timer = setInterval(function(){
    let h = hour.textContent >> 0;
    let m = min.textContent >> 0;
    let s = sec.textContent >> 0;
    s++;
    if(s === 60){
      m++;
      s = 0;
      if(m === 60){
        h++;
        m = 0;
      }
    }

    if(h < 10) h = '0' + h;
    if(m < 10) m = '0' + m;
    if(s < 10) s = '0' + s;
    
    hour.textContent = h;
    min.textContent = m;
    sec.textContent = s;

  }, 1000);
}

function timerStop(){
  if(timer === null) return;

  clearInterval(timer);
  timer = null;
  document.getElementById('start-task').textContent = 'Start';
}
