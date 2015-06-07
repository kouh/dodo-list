"use strict";
let remote = require('remote');
let path = require('path');
let app = remote.require('app');
let shell = require('shell');
let mainWindow = remote.getCurrentWindow();

let dodoList = document.getElementById('dodo-list');

let timer = null;
document.getElementById('add-task').addEventListener('click', function(e){
  dodoList.add();
});


document.getElementById('start-task').addEventListener('click', function(e){
  timerStop();
  timerStart();
});


document.getElementById('pause-task').addEventListener('click', function(e){
  timerStop();
});

document.getElementById('stop-task').addEventListener('click', function(e){
  timerStop();
  document.getElementById('h').textContent = '00';
  document.getElementById('m').textContent = '00';
  document.getElementById('s').textContent = '00';
});

function timerStart(){
  let hour = document.getElementById('h');
  let min = document.getElementById('m');
  let sec = document.getElementById('s');
  timer = setInterval(function(){
    let h = hour.textContent >>0;
    let m = min.textContent >>0;
    let s = sec.textContent >>0;
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
