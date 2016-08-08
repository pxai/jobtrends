var path = require('path')
var read = require('fs').readFileSync
var html = read(path.resolve(__dirname, 'simple.html'))
var Xray = require('x-ray');
var x = Xray()

x(html, '.item-list', [{
  title: 'h2',
  tags: x('.tags', ['li'])
}])(console.log)
