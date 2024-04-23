// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyDz7surFmHfXQuftIm62k-28vkNI7oEn0M',
    authDomain: 'gambling-goof-prod.firebaseapp.com',
    databaseURL: 'https://gambling-goof-prod.firebaseio.com',
    projectId: 'gambling-goof-prod',
    storageBucket: 'gambling-goof-prod.appspot.com',
    messagingSenderId: '483023253127'
  }
};
