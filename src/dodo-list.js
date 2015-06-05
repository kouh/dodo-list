"use strict";
let remote = require('remote');
let path = require('path');
let app = remote.require('app');
let shell = require('shell');
let mainWindow = remote.getCurrentWindow();

class DoDoList{
  constructor(){
    this._list = [];
    this._$ul = document.getElementById('dodo-list');
    this.add('task');
  }

  add(task){
    let li = document.createElement('li');
    li.textContent = task;
    this._$ul.appendChild(li);
  }
}


let dodoList = new DoDoList();
