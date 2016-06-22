var assert = require('chai').assert;
var xr = require('../xraysamplePromises');

describe('X-Ray with promises', function () {
    it('makes request properly', function() {
    return xr.scrapPage(1)
        .then(function(data) {
            assert(data != null, 'Data exists : ' + data.length);
        });
    });
});

