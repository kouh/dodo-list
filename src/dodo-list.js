"use strict";
let remote = require('remote');
let ipc = require('ipc');
let path = require('path');
let app = remote.require('app');
let shell = require('shell');
let mainWindow = remote.getCurrentWindow();

var dodoList = document.getElementById('dodo-list');
let share = remote.getGlobal('share');
let timer = null;

ipc.on('createTask', function(task){
  dodoList.add(task);
});

dodoList.add();

document.getElementById('start-task').addEventListener('click', function(e){
  if(timer === null){
    timerStart();
    this.textContent = 'Pause';
  }else{
    timerStop();
    this.textContent = 'Start';
  }
});

document.getElementById('stop-task').addEventListener('click', function(e){
  timerStop();
  document.getElementById('h').textContent = '00';
  document.getElementById('m').textContent = '00';
  document.getElementById('s').textContent = '00';
});

function timerStart(){
  document.getElementById('task-name').textContent = dodoList.selected.name;
  console.log(dodoList.selected);
  let hour = document.getElementById('h');
  let min = document.getElementById('m');
  let sec = document.getElementById('s');
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
}
