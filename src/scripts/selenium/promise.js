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

browser.get('http://www.infojobs.net/ofertas-trabajo/1');
//driver.findElement(By.name('q')).sendKeys('webdriver');
//driver.findElement(By.name('btnG')).click();

//var offers = browser.wait(until.elementLocated(webdriver.By.css('h2.job-list-title')), 5000);
// The same
var result = browser.wait(until.elementsLocated(webdriver.By.css('h2.job-list-title a')));
//var offer = driver.findElement(webdriver.By.css('li#of_c8560c8b6247c981456e13e33bf3e4')).getText();



/*Promise.resolve(offers).then(function (res) {
   console.log('Ok, mesg is: ');
   console.log(res); 
}, function (error) {
    console.log(error);
});*/

/*result.then(function (res) {
   console.log(res); 
   console.log('Ok, result is: ' + res.length);
   //res[0].then(function (val) { console.log(val);});
  return Promise.all(res.map(log));
}, function (error) {
    console.log(error);
}).then(function (elements) {
    console.log('Elements are here');
    console.log(elements);
});*/
var titles = [];

result.then(function (res) {
    return Promise.all(res.map(log)).then(element => {
        console.log(element)
    });
});

//browser.wait(until.titleIs('Ofertas de trabajo, Buscar trabajo, Bolsa de trabajo - Infojobs'), 1000);
browser.quit();
//console.log(title);
console.log('-------------------');

function log (element) {
  // Return a new promise.
  return element.getAttribute('href');  
}