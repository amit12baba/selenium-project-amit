const { By, Builder, Key, Browser } = require('selenium-webdriver');
// const { suite } = require('selenium-webdriver/testing');
const axios = require('axios');
// const { describe, before, after, afterEach, it } = require('mocha');
const assert = require('assert');


let driver;

beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
}, 20000);

afterAll(async () => {
    await driver.quit();
});



// describe('Restaurant table', function () {
//     this.timeout(20000);

//     before(async function () {
//         driver = await new Builder().forBrowser('chrome').build();
//     });

//     afterEach(async function () {
//     });

//     after(async function () { await driver.quit(); });

test('add restaurant', async function () {
    jest.setTimeout(5000); // Increase timeout to 5000ms (5 seconds)
    await driver.get('http://localhost:3000');


    // await driver.manage().setTimeouts({ implicit: 500 });

    let nameInput = await driver.findElement(By.id('name'));
    let locationInput = await driver.findElement(By.id('location'));
    let priceRangeInput = await driver.findElement(By.id('price_range'));
    let addButton = await driver.findElement(By.name('add'));
    // let updateButton = await driver.findElement(By.css('tr.button.btn.btn-warning'));
    // let deleteButton = await driver.findElement(By.className("btn btn-danger"));


    await nameInput.sendKeys('Port Said');
    await locationInput.sendKeys('Tel Aviv');
    await priceRangeInput.sendKeys('$$');
    await addButton.click();
    // await updateButton.click();
    // await deleteButton.click();
});


test('check the latest restaurant in the table', async function () {
    jest.setTimeout(5000);
    await driver.get('http://localhost:3000');

    const restaurantTable = await driver.findElement(By.css("table"));
    const html_1 = await restaurantTable.getAttribute("innerHTML");


    const tableBody = await restaurantTable.findElement(By.css("tbody"));
    const html = await tableBody.getAttribute("innerHTML");

    const tableRows = await tableBody.findElements(By.css("tr"));


    expect(tableRows.length).toBeGreaterThan(1);

    const lastRow = tableRows[tableRows.length - 1];


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

});

test('check if the restaurant is added to the database', async () => {
    const response = await axios.get('http://localhost:3010/api/restaurants');
    const restaurants = response.data;

    let newRestaurant;

    for (let i = 0; i < restaurants.length; i++) {
        if (restaurants[i].name === 'Port Said') {
            newRestaurant = restaurants[i];
            break;
    }}
    if (newRestaurant === undefined) {
        console.log('Restaurant not found');
        // You can throw an error here or perform other actions as needed
        throw new Error('Restaurant not found');
      }

    // expect(newRestaurant).toBeDefined();
    expect(newRestaurant.location).toEqual('Tel Aviv');
    expect(newRestaurant.price_range).toEqual('$$');
});

