const { By, Builder, Browser, until } = require('selenium-webdriver');
const { describe, before, after, afterEach, it } = require('mocha');
const assert = require('assert');


describe('Restaurant table', function () {
    this.timeout(10000);
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    afterEach(async function () {
        // Add cleanup tasks here if needed after each test case
    });

    after(async function () { await driver.quit(); });

    it('check the latest restaurant in the table', async function (done) {
        this.timeout(5000);
        await driver.get('http://localhost:3000');

        await driver.wait(until.elementLocated(By.className('table')));


        // Access the last row (latest restaurant)
        const lastRow = await driver.findElement(By.xpath('//table[@class="table"]/tbody/tr[last()-1]'));


        // Get the cells within the row
        const cells = await lastRow.findElements(By.css('td'));

        // Get the text values of the cells in the last row
        let name = await cells[0].getText();
        let location = await cells[1].getText();
        let priceRange = await cells[2].getText();
        let rating = await cells[3].getText();

        // Assert the values of the last restaurant
        assert.equal(name, 'Port Said');
        assert.equal(location, 'Tel Aviv');
        assert.equal(priceRange, '$$');
        done()
    });
});

