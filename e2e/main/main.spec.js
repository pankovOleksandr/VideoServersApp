'use strict';

var config = browser.params;

describe('Main View', function() {
  var page;

  beforeEach(function() {
    browser.get(config.baseUrl + '/');
    page = require('./main.po');
  });

  it('should include jumbotron with correct data', function() {
    expect(page.h1El.getText()).toBe('Spectrum Video Servers');
    expect(page.p.getText()).toBe('It\'s a simple AngularJS CRUD application');
  });

  it('should include create and restart buttons', function() {
    expect(page.createBtn.isPresent()).toBeTruthy();
    expect(page.restartBtn.isPresent()).toBeTruthy();
  });

  it('should include filter select element', function() {
    expect(page.filterSelectEl.isPresent()).toBeTruthy();
    expect(page.filterSelectEl.getText()).toContain('All');
  })
});
