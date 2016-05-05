'use strict';

var config = browser.params;

describe('Main View', function() {
  var page;

  beforeEach(function() {
    browser.get(config.baseUrl + '/');
    page = require('./main.po');
  });

  it('should include jumbotron with correct data', function() {
    expect(page.h1El.getText()).toBe('Hello, I\'m glad to see you!');
    expect(page.p.getText()).toBe('Hello, I\'m glad to see you!');    
    expect(page.imgEl.getAttribute('src')).toMatch(/harmonic-logo-2.png$/);
    expect(page.imgEl.getAttribute('alt')).toBe('It\'s a simple AngularJS CRUD application "Spectrum Video Servers"');
  });
});
