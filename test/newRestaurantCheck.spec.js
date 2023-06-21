const { By, Builder, Browser } = require('selenium-webdriver');
const { suite } = require('selenium-webdriver/testing');
const assert = require('assert');

suite(async function (env) {
  describe('Restaurant table', function () {
    let driver;

    before(async function () {
      driver = await new Builder().forBrowser('chrome').build();
    });

    after(async () => await driver.quit());

    it('check the latest restaurant in the table', async function () {
      await driver.get('http://localhost:3000'); 

      // Locate the table element
      let table = await driver.findElement(By.css('.table'));

      // Get all rows in the table
      let rows = await table.findElements(By.css('tbody tr'));

      // Access the last row (latest restaurant)
      let latestRow = rows[rows.length - 1];

      // Get the cells within the row
      let cells = await latestRow.findElements(By.css('td'));

      // Extract the restaurant information from the cells
      let name = await cells[0].getText();
      let location = await cells[1].getText();
      let priceRange = await cells[2].getText();
      let rating = await cells[3].getText();

      // Perform assertions on the latest restaurant information
      assert.equal(name, 'Port Said');
      assert.equal(location, 'Tel Aviv');
      assert.equal(priceRange, '$$');
      // ... perform additional assertions for rating or other properties

      // Output the latest restaurant information
      console.log('Latest Restaurant Information:');
      console.log('Name:', name);
      console.log('Location:', location);
      console.log('Price Range:', priceRange);
      console.log('Rating:', rating);
    });
  });
});
