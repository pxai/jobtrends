// If it doesn't work try from the project root
// export PATH=${PATH}:node_modules/.bin
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var browser = new webdriver.Builder()
//    .forBrowser('chrome')  // Works executed from project root
    .forBrowser('firefox') // https://github.com/mozilla/geckodriver/releases
    .build();

console.log('Soy cojonudo');

browser.get('http://www.infojobs.net/madrid/programador-asp-.net-con-devexpress-mysql-oracle/of-i4d67d2ba5b4bc2b2ee496e89e42553');
//driver.findElement(By.name('q')).sendKeys('webdriver');
//driver.findElement(By.name('btnG')).click();
// .findElement(By.tagName('form'))
//var offers = browser.wait(until.elementLocated(webdriver.By.css('h2.job-list-title')), 5000);
// The same
//var result = browser.wait(until.elementsLocated(webdriver.By.css('body')).getText());
//var result = browser.findElement(webdriver.By.tagName('body')).getText();
var result = browser.getPageSource();
var offer = browser.wait(until.elementLocated(webdriver.By.css('h1.prefijoPuesto')),20000);
//console.log(browser.page_source);

var titles = [];

offer.then(function (res) {
           console.log(result); 
});

browser.quit();

console.log('-------------------');

function log (element) {
  // Return a new promise.
  return element.getAttribute('href');  
}