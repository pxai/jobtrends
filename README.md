Steps to start your project
===========================
npm config set init.author.name 'Pello Altadill'
npm init

After that, 
npm install --save-dev grunt-cli

Create Grunfile.js

npm install --save express
npm install --save mocha 
...

Don't forget to
===============

Restore

cd dump
/opt/mongodb/bin/mongorestore -d jobtrends jobtrends/

Dump
/opt/mongodb/bin/mongodump -d jobtrends

Git issues
===========
##Things that I tend to forget

# non-fast-forward errors

git push origin master
 To https://github.com/USERNAME/REPOSITORY.git
  ! [rejected]        master -> master (non-fast-forward)
 error: failed to push some refs to 'https://github.com/USERNAME/REPOSITORY.git'
 To prevent you from losing history, non-fast-forward updates were rejected
Fix with:

$ git fetch origin
$ git merge origin BRANCH_NAME



or

git pull origin BRANCH_NAME

BRANCH_NAME may be master

# You are in the middle of a conflicted merge

To be up-to-date
================
git pull
In the simplest terms, git pull does a git fetch followed by a git merge

Scripts
=======
Grab urls
src/scripts/selenium/promiseMongo.js

Grab details
src/scripts/detail.js
with infojobsFields.js selectors

