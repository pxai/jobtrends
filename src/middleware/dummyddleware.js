/**
* dummyddleware.js
* A dummy middleware just to see the order it is being called
*/

module.exports = function dummyddleware (req,res, next) {
	console.log('Dummy middleware');
	next();
}