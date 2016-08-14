// If it doesn't work try from the project root
// export PATH=${PATH}:node_modules/.bin
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
//    .forBrowser('chrome')  // Works executed from project root
    .forBrowser('firefox') // https://github.com/mozilla/geckodriver/releases
    .build();

driver.get('http://www.infojobs.net');
//driver.findElement(By.name('q')).sendKeys('webdriver');
//driver.findElement(By.name('btnG')).click();
driver.wait(until.titleIs('InfoJobs - Bolsa de trabajo, ofertas de empleo'), 1000);
driver.quit();
