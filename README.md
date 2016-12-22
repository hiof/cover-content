# Hiof cover-content plugin

## About

A plugin with the required files for the Cover content functionality.

## Required knowledge

This package require knowledge of the following technologies, technics and modules:

- [Javascript](https://en.wikipedia.org/wiki/JavaScript)
    - [ES2015](https://en.wikipedia.org/wiki/ECMAScript#6th_Edition)
    - [Babel](https://babeljs.io)
    - [jQuery](https://jquery.com)
    - [JSON](http://jsonapi.org)
- [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
    - [Sass](http://sass-lang.com)
- [HTML](https://en.wikipedia.org/wiki/HTML)
    - [Handlebars](http://handlebarsjs.com)
- [Bootstrap](http://getbootstrap.com)
- [Node.js](https://nodejs.org)
    - [NPM](https://www.npmjs.com)
- [Grunt](http://gruntjs.com) and Grunt tasks (see `Gruntfile.js` for details)
- [Bower](http://bower.io)
- [SSH](https://en.wikipedia.org/wiki/Secure_Shell)
- [Git](https://git-scm.com)
    - [Github](https://github.com)

## Copyright

This project is distributed under a GNU General Public License v3 - Take a look at the COPYING file for details.

## Install

Install [Git](http://git-scm.com) if it's not already installed on your computer. Then run (this will download this project to the folder the shell has open):

```
$ git clone https://github.com/hiof/cover-content.git
```

Install [io.js](https://iojs.org) (or [Node.js](http://nodejs.org)) if it's not already installed on your computer. Then run (this will install the project dependencies):

```
$ sudo npm install -g grunt-cli
$ npm install
$ bower install
```

## Build

`$ grunt build`: Compiles and builds the cover-content plugin

## Deploy

1. Rename secret-template.json to secret.json and add your credentials.
2. Deploy and test your code on the staging server `$ grunt deploy-stage`
3. Deploy to production `$ grunt deploy-prod`

## Dependency

- Needs to run on neted3.hiof.no in a regular template

## Required

- Required for hiof.no to work as expected

## Releases


- [x] v1.0.0
  - [x] Initial cover-content
- [x] v1.1.0
  - [x] Added and changed photo array

[Github releases](https://github.com/hiof/cover-content/releases)

### Roadmap

- [ ] v1.X.0
  - [ ] Inline JSON
- [ ] v1.X.0
  - [ ] More colors
  - [ ] More pictures
  - [ ] Remove old pictures
