/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
  // header elements
  this.harmonicHeader = element(by.css('.harmonic-head'));
  this.h1El = this.harmonicHeader.element(by.css('h1'));  
  this.p = this.harmonicHeader.element(by.css('.lead'));
  // buttons
  this.createBtn = element(by.buttonText('Create'));
  this.restartBtn = element(by.buttonText('Restart'));
  this.deleteBtn = element(by.buttonText('Delete'));
  this.addBtn = element(by.buttonText('Add'));
  this.cancelBtn = element(by.buttonText('Cancel'));
  this.editBtn = element(by.buttonText('Edit'));
  this.saveBtn = element(by.buttonText('Save'));
  this.resetBtn = element(by.buttonText('Reset'));
  this.updateVersionBtn = element(by.buttonText('Update version'));
  this.updateBtn = element(by.buttonText('Update'));

  this.filterSelectEl = element(by.model('main.filterValue'));
  this.listHeaders = element.all(by.css('#list-header div'));

  this.serversRows = element.all(by.repeater('server in main.servers'));
  this.firstServer = element(by.repeater('server in main.servers').row(0));
  this.firstServerIp = element(by.repeater('server in main.servers').row(0).column('server.ip'));
  this.firstServerName = element(by.repeater('server in main.servers').row(0).column('server.name'));
  this.firstServerCurrentVersion = element(by.repeater('server in main.servers').row(0).column('server.currentVersion'));

  this.listNewItem = element(by.id('list-new-item'));
  this.newIpInput = this.listNewItem.element(by.model('main.newItem.ip'));
  this.newNameInput = this.listNewItem.element(by.model('main.newItem.name'));
  this.newCurrentVersionInput = this.listNewItem.element(by.model('main.newItem.currentVersion'));

  this.editIpInput = element(by.model('server.ip'));
  this.editNameInput = element(by.model('server.name'));
  this.editCurrentVersionInput = element(by.model('server.currentVersion'));

  this.versionsOptions = element.all(by.css('select[ng-model="$ctrl.myVersion"] option'));
};

module.exports = new MainPage();

