const {By, Builder, Browser} = require('selenium-webdriver');
const {suite} = require('selenium-webdriver/testing');
const assert = require("assert");

suite(function (env) {
  describe('Restaurant table', function () {
    let driver;

    before(async function () {
      driver = await new Builder().forBrowser('chrome').build();
    });

    after(async () => await driver.quit());

    it('Add restaurant', async function () {
        this.timeout(5000); // Increase timeout to 5000ms (5 seconds)
      await driver.get('http://localhost:3000');

    //   let title = await driver.getTitle();
    //   assert.equal("Restaurant Finder", title);

      await driver.manage().setTimeouts({implicit: 500});

      let nameInput = await driver.findElement(By.id('name'));
      let locationInput = await driver.findElement(By.id('location'));
      let priceRangeInput = await driver.findElement(By.id('price_range'));
      let addButton = await driver.findElement(By.name('add'));
      // let updateButton = await driver.findElement(By.name('update'));
      // let deleteButton = await driver.findElement(By.id('delete_restaurant'));


      await nameInput.sendKeys('Port Said');
      await locationInput.sendKeys('Tel Aviv');
      await priceRangeInput.sendKeys('$$'); 
      await addButton.click();
      // await updateButton.click();
      // await deleteButton.click();


    //   let message = await driver.findElement(By.id('message'));
    //   let value = await message.getText();
      // assert.equal("Received!", value);
    });
  });
}, { browsers: [Browser.CHROME, Browser.FIREFOX]});