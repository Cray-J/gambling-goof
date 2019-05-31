# GamblingGoof

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


### Deploy commands
* npm install -g firebase-tools
* firebase init (set public directory to dist & do not overwrite index.html)
* ng build --prod
* firebase deploy
* Error might be due to expired token, (do Firebase logout and Firebase login)



### Animations

angular animations:
npm install --save @angular/animations
enable polyfills om polyfills.ts

void is a state where the element is not attached to the dom

Wildcard state

transition from void to * has the alias ':enter'
transition from * to void has the alias ':leave'


translate only works on block elements, not inline elements
