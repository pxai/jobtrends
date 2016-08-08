var phantom = require('phantom');
var Xray = require('x-ray');
var x = Xray();

var sitepage = null;
var phInstance = null;
phantom.create()
    .then(instance => {
        phInstance = instance;
        return instance.createPage();
    })
    .then(page => {
        sitepage = page;
        return page.open('http://www.infojobs.net/ofertas-trabajo/1');
    })
    .then(status => {
        console.log(status);
        return sitepage.property('content');
    })
    .then(content => {
      //console.log(content);
      x(content, 'ul#offer-list li',  [{
              a: 'h2 a@href',
              title: 'h2 a@title'
        }])(function(err, obj) {
        console.log(obj);
        console.log(content.length);
      });
        sitepage.close();
        phInstance.exit();
    })
    .catch(error => {
        console.log(error);
        phInstance.exit();
    });
