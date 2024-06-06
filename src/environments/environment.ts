// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBh6LcLLwKN1q60uk7PMZ2vnWF0o6vQ6BU",
    authDomain: "gambling-goof.firebaseapp.com",
    databaseURL: "https://gambling-goof.firebaseio.com",
    projectId: "gambling-goof",
    storageBucket: "gambling-goof.appspot.com",
    messagingSenderId: "762455269995"
  }
};
