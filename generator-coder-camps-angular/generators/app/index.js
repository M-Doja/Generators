'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var _s = require('underscore.string');
var inquirer = require('inquirer');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Angular') + ' generator!'
    ));
    var prompts = [{
      name: 'appName',
      message: 'What is the app\'s name?',
      type: 'input',
      default: 'coder-camps-js'
    }, {
      name: 'appDesc',
      message: 'How would you describe your application?',
      default: 'A MEAN stack application.'
    }, {
      name: 'unitTesting',
      message: 'Would you like to have unit testing?',
      type: 'list',
      choices: ['Yes', 'No']
    }, {
      name: 'nodeVersion',
      message: 'Which version of Node are you using?',
      type: 'list',
      choices: ['0.12.7', '4.0+', '4.0+ Jackie Version (using function)']
    }, {
      name: 'cssChoice',
      message: 'Would you like to use Angular-Material or Bootstrap?',
      type: 'list',
      choices: ['None', 'Angular-Material', 'Bootstrap']
    }, {
      when: function(res) {
        return res.cssChoice === 'Bootstrap';
      },
      name: 'bootstrapTemplate',
      message: 'Which bootstrap template would you like?',
      type: 'list',
      choices: ['None', 'slate', 'superhero', 'darkly', 'cyborg']
    }];

    inquirer.prompt(prompts, function(props) {
      this.appName = _s.slugify(props.appName) || 'coder-camps-js';
      this.appDesc = props.appDesc || 'A MEAN stack application.';
      this.cssChoice = props.cssChoice;
      this.bstemplate = props.bootstrapTemplate || 'None';
      done();
    }.bind(this));
  },
  cssChoice: function() {
    if (this.cssChoice === 'Bootstrap') {
      this.fs.copy(
        this.templatePath('/bower_files/_bower_bootstrap.json'),
        this.destinationPath('bower.json')
      );
      if (this.bstemplate !== 'None') {
        this.fs.copy(
          this.templatePath('/bootstrap_themes/_' + this.bstemplate + '.min.css'),
          this.destinationPath('/public/css/bootstrap_theme.min.css')
        );
      }
    }
    if (this.cssChoice === 'Angular-Material') {
      this.fs.copy(
        this.templatePath('/bower_files/_bower_angular.json'),
        this.destinationPath('bower.json')
      );
    }
    if (this.cssChoice === 'None') {
      this.fs.copy(
        this.templatePath('/bower_files/_bower_none.json'),
        this.destinationPath('bower.json')
      );
    }
  },
  serverFile: function() {
    if (this.nodeVersion === '0.12.7') {
      this.fs.copy(
        this.templatePath('_server_0.12.7.js'),
        this.destinationPath('server.js')
      );
      if (this.unitTesting) {
        this.fs.copy(
          this.templatePath('_test.spec.js'),
          this.destinationPath('./test/test.spec.js')
        );
      }
    } else if (this.nodeVersion === '4.0+') {
      this.fs.copy(
        this.templatePath('_server_es6.js'),
        this.destinationPath('server.js')
      );
      if (this.unitTesting) {
        this.fs.copy(
          this.templatePath('_test_es6.spec.js'),
          this.destinationPath('./test/test.spec.js')
        );
      }
    } else {
      this.fs.copy(
        this.templatePath('_server_es6_jackie.js'),
        this.destinationPath('server.js')
      );
      if (this.unitTesting) {
        this.fs.copy(
          this.templatePath('_test_es6.spec.js'),
          this.destinationPath('./test/test.spec.js')
        );
      }
    }
  },
  projectfiles: function() {
    this.template('_package.json', 'package.json');
    this.template('_index.html', './views/index.html');

    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );

    if (this.cssChoice === 'Angular-Material') {
      this.fs.copy(
        this.templatePath('_app.material.js'),
        this.destinationPath('/public/javascript/app.js')
      );
    } else {
      this.fs.copy(
        this.templatePath('_app.js'),
        this.destinationPath('/public/javascript/app.js')
      );
    }
    this.fs.copy(
      this.templatePath('_HomeController.js'),
      this.destinationPath('/public/javascript/controllers/HomeController.js')
    );
    this.fs.copy(
      this.templatePath('_HomeFactory.js'),
      this.destinationPath('/public/javascript/services/HomeFactory.js')
    );
    this.fs.copy(
      this.templatePath('_site.css'),
      this.destinationPath('/public/css/site.css')
    );
    this.fs.copy(
      this.templatePath('_homepage.html'),
      this.destinationPath('/public/templates/home.html')
    );
  },
  install: function() {
    this.installDependencies();
  }
});
