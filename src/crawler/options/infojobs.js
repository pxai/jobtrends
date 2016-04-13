var infojobsOptions = {
  hostname: 'www.infojobs.net',
  port: 80,
  path: '/jobsearch/search-results/list.xhtml',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': 0
  }
};

module.exports = infojobsOptions;