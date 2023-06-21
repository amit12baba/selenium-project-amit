const {By, Builder, Browser} = require('selenium-webdriver');
const {suite} = require('selenium-webdriver/testing');
const assert = require("assert");

suite(function (env) {
  describe('First test', function () {
    let driver;

    before(async function () {
      driver = await new Builder().forBrowser('chrome').build();
    });

    after(async () => await driver.quit());

    it('First Project test', async function () {
        this.timeout(5000); // Increase timeout to 5000ms (5 seconds)
      await driver.get('http://localhost:3000');

    //   let title = await driver.getTitle();
    //   assert.equal("Restaurant Finder", title);

      await driver.manage().setTimeouts({implicit: 500});

      let nameInput = await driver.findElement(By.id('name'));
      let locationInput = await driver.findElement(By.id('location'));
      let priceRangeInput = await driver.findElement(By.id('price_range'));
      let submitButton = await driver.findElement(By.css('button'));

      await nameInput.sendKeys('Name');
      await locationInput.sendKeys('Location');
      await priceRangeInput.sendKeys('$$'); 
      await submitButton.click();

    //   let message = await driver.findElement(By.id('message'));
    //   let value = await message.getText();
    //   assert.equal("Received!", value);
    });
  });
}, { browsers: [Browser.CHROME, Browser.FIREFOX]});