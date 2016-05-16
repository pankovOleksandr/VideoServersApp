/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
  this.harmonicHeader = element(by.css('.harmonic-head'));
  this.h1El = this.harmonicHeader.element(by.css('h1'));
  this.imgEl = this.harmonicHeader.element(by.css('img'));
  this.p = this.harmonicHeader.element(by.css('.lead'));

  this.createBtn = element(by.buttonText('Create'));
  this.restartBtn = element(by.buttonText('Restart'));
  this.filterSelectEl = element(by.model('main.filterValue'));

};

module.exports = new MainPage();

