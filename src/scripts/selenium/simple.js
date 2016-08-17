// If it doesn't work try from the project root
// export PATH=${PATH}:node_modules/.bin
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
//    .forBrowser('chrome')  // Works executed from project root
    .forBrowser('firefox') // https://github.com/mozilla/geckodriver/releases
    .build();

console.log('Soy cojonudo');

driver.get('http://www.infojobs.net/ofertas-trabajo/1');
//driver.findElement(By.name('q')).sendKeys('webdriver');
//driver.findElement(By.name('btnG')).click();
var offers = driver.wait(until.elementLocated(webdriver.By.css('h2.job-list-title')), 5000);
driver.findElements(webdriver.By.css('h2.job-list-title'));
//var offer = driver.findElement(webdriver.By.css('li#of_c8560c8b6247c981456e13e33bf3e4')).getText();
driver.wait(until.titleIs('Ofertas de trabajo, Buscar trabajo, Bolsa de trabajo - Infojobs'), 1000);
driver.quit();
//console.log(title);
console.log('-------------------');
console.log(offers);
