'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var _s = require('underscore.string')

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Coder Camps') + ' generator!'
    ));

    var prompts = [{
      name: 'appName',
      message: 'What is the app\'s name?',
      type: 'input'
    }, {
      name: 'appDesc',
      message: 'How would you describe your application?'
    }, {
      name: 'bootstrapTemplate',
      message: 'Which bootstrap template would you like?',
      type: 'list',
      choices: ['None', 'slate', 'superhero', 'darkly', 'cyborg']
    }];

    this.prompt(prompts, function(props) {
      // To access props later use this.props.someOption;
      this.appName = _s.slugify(props.appName) || 'coder-camps-js';
      this.appDesc = props.appDesc || 'An application built using the basic JavaScript for the Fullstack JS course from Coder Camps.';
      this.bstemplate = props.bootstrapTemplate;
      done();
    }.bind(this));
  },

  projectfiles: function() {
    if (this.bstemplate !== 'None') {
      this.fs.copy(
        this.templatePath('/bootstrap_themes/_' + this.bstemplate + '.min.css'),
        this.destinationPath('/public/css/bootstrap_theme.min.css')
      );
    }
    else {
      this.fs.copy(
        this.templatePath('_empty_bootstrap_theme.css'),
        this.destinationPath('/public/css/bootstrap_theme.min.css')
      )
    }
    this.template('_index.html', './views/index.html');
    this.template('_package.json','package.json');
    this.fs.copy(
      this.templatePath('_server.js'),
      this.destinationPath('server.js')
    );
    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('_app.js'),
      this.destinationPath('/public/javascript/app.js')
    );
    this.fs.copy(
      this.templatePath('_site.css'),
      this.destinationPath('/public/css/site.css')
    );
    this.fs.copy(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json')
    );
  },

  install: function() {
    this.installDependencies();
  }
});
