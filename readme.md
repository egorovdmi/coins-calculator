Coins Calculator Angular 4 Application
==========================================================

Project is developed using Visual Studio Code.
I have developed responsive solution. So, it could be used on iPhone 5+ and desktop browsers (tested on Mac OS and Windows 10).

If you want just to start the project jump to section "IMPORTANT!!! QUICK START".


Here's a list of technologies that have been used:

- JavaScript (ECMAScript 6) as a main programming language

- Redux Data Architecture:

Why is Redux? Data state managing in small apps could be done using services directly, but as soon as your app become huge, it turns out that it is extremely hard to manage the data state in tons of components, becouse you have to pass all the data from a service through out the hierarhy of components. 
In order to show a good application design, I have decided to implement this approach in this small app using NgRx framework.

- Splitting components into two types Pure Components(also known as Presentation Compoments) and Container Components.

Pure Components are the components that are predictable and do not have any dependencies with data layer. Container Components are the components that connect data layer with presentation layer. This splitting approach gives us ability easily write unit tests for Pure Components, which is resposible only for displaying UI. 

- RxJs. Very impressive framework that halps working witn asyncronous code. Also, used by NgRx framework above.

- Bootstrap framework. Used for creating components markups and implement responsive UI.

- SRP. Single Responsibility Principle I have implemented by splitting components and classes into small ones that only have their own responsibilty. For example, sterling-coin.component, coins-parser.service, coin.factory. Implementing SRP a project becomes more maintainable.

- DI. Dependancy Injection is everywhere. This approach increase tastability and maintainability.


CONTENTS
--------

Files and directories:

      app/actions                              Redux actions.
      app/components                           Pure Presentation Components.
      app/containers                           Container Components.
      app/utils                                Unilities, helpers.
      app/effects                              Effects - asyncronous actions handlers.
      app/models                               Data models, classes.
      app/reducers                             Reducers(Classes that handle actions and change app state) and Selectors (Data providers).
      app/services                             Services responsible for getting data from somewhere.
      app/app.entry.js                         App entry point.
      app/app.module.js                        App module definition.
      styles                                   Folder with styles.
      resources                                Folder with image files.
      .babelrc                                 Babel transpiler settings.
      index.html                               Main HTML file that app uses.
      karma.conf.js                            Karma test runner config.
      package.json                             Contains dependancy dininitions and packages to be installed.
      README.md                                This file
      webpack.config.js                        WebPack setting (does build process).


REQUIREMENTS
------------

- Mac OS or Windows (I have tested only on these operating systems). Also, should work on Linux, but I have not tested it.
- Node.js, at least v7.6.0 version.
- Chrome browser in order to run unit tests.
- Internet access for packages downloading.


IMPORTANT!!! QUICK START
------------------------

To run the project you need:

- Ensure that you system is satisfied the requirements.
- Open command prompt in the project root directory, where package.json is located.

Execute commads:

    // First of all, you need to install all packages. Execute:
    npm i

    // after packages installation, run the project using command below. Browser will be opened automatically.
    npm start

    // to run unit tests
    npm test
