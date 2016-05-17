'use strict';

var config = browser.params;

describe('Main View', function() {
  var page;

  beforeEach(function() {
    browser.get(config.baseUrl + '/');
    page = require('./main.po');
  });

  xdescribe('Initial view', function () {

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
    });

    it('should include correct list\'s headers', function() {
      page.listHeaders.then(function (items) {
        expect(items.length).toBe(5);
        expect(items[0].getText()).toBe('#');
        expect(items[1].getText()).toBe('IP');
        expect(items[2].getText()).toBe('NAME');
        expect(items[3].getText()).toBe('CURRENT VERSION');
        expect(items[4].getText()).toBe('ACTIONS');
      });
    });

    it('souldn\'t include block for creating item', function () {
      expect(page.listNewItem.isPresent()).toBeFalsy();
    })

  });

  xdescribe('Creating item', function() {

    it('should show block with correct data', function () {
      page.createBtn.click();
      expect(page.listNewItem.isPresent()).toBeTruthy();
      expect(page.newIpInput.getText()).toBe('');
      expect(page.newNameInput.getText()).toBe('');
      expect(page.newCurrentVersionInput.getText()).toBe('');
    });

    it('should create a new item', function () {
      createTestItem();
      expect(page.firstServerIp.getText()).toBe('111.11.111.111');
      expect(page.firstServerName.getText()).toBe('Test');
      expect(page.firstServerCurrentVersion.getText()).toBe('111.11.11.11');
    });

    it('should cancel creating process', function () {
      var ip = page.firstServerIp.getText();
      var name = page.firstServerName.getText();
      var currentVersion = page.firstServerCurrentVersion.getText();

      page.createBtn.click();
      page.newIpInput.sendKeys("111.11.111.111");
      page.newNameInput.sendKeys("Test");
      page.newCurrentVersionInput.sendKeys("111.11.11.11");
      page.cancelBtn.click();

      expect(page.listNewItem.isPresent()).toBeFalsy();
      expect(page.firstServerIp.getText()).toBe(ip);
      expect(page.firstServerName.getText()).toBe(name);
      expect(page.firstServerCurrentVersion.getText()).toBe(currentVersion);

    });

  });

  xdescribe('Deleting items', function() {
    var count;

    beforeEach(function() {
      count  = page.serversRows.count();
      createTestItem();
    });

    it('should delete item in uneditable view', function() {
      page.deleteBtn.click();
      expect(page.serversRows.count()).toBe(count);
    });

    it('should delete item in editable view', function() {
      page.editBtn.click();
      page.deleteBtn.click();
      expect(page.serversRows.count()).toBe(count);
    });

  });

  xdescribe('Editing items', function() {
    var ip, name, currentVersion;

    beforeEach(function() {
      createTestItem();
      page.firstServerIp.getText().then(function(value) {
        ip = value;
      });
      page.firstServerName.getText().then(function(value) {
        name = value;
      });
      page.firstServerCurrentVersion.getText().then(function(value) {
        currentVersion = value;
      });

    });

    it('should edit and save item', function(){

      editItem();
      page.saveBtn.click();
      ip += '222';
      name += 'lala';
      currentVersion += '333';
      expect(page.firstServerIp.getText()).toBe(ip);
      expect(page.firstServerName.getText()).toBe(name);
      expect(page.firstServerCurrentVersion.getText()).toBe(currentVersion);
    });

    it('should edit and reset to default item', function() {
      editItem();
      page.resetBtn.click();
      expect(page.firstServerIp.getText()).toBe(ip);
      expect(page.firstServerName.getText()).toBe(name);
      expect(page.firstServerCurrentVersion.getText()).toBe(currentVersion);
    });

    function editItem() {
      page.editBtn.click();
      page.editIpInput.sendKeys('222');
      page.editNameInput.sendKeys('lala');
      page.editCurrentVersionInput.sendKeys('333');
    }


  });

  function createTestItem() {
    page.createBtn.click();
    page.newIpInput.sendKeys("111.11.111.111");
    page.newNameInput.sendKeys("Test");
    page.newCurrentVersionInput.sendKeys("111.11.11.11");
    page.addBtn.click();
  }


});
