/**
 * helpers/sanitize.js
 * This helper is intended to apply sanitization to data
 * In this case I'm just cleaning html, but I could add
 * other kind of cleaning procedures as well
 * Pello Altadill - http://pello.info
 */

var sanitizeHtml = require('sanitize-html');

module.exports = function sanitize (input, tags, attributes) {
  var clean = '';
  if (!tags) { tags = []; }
  if (!attributes) { attributes = []; }

  clean = sanitizeHtml(input, {allowedTags: tags, allowedAttributes: attributes});
  // TODO: add other sanitizations

  return clean;
};
