## Setup and running 
To run, just type 
```bash
http-server
``` 
Or your favorite server

To build from the sources
```bash
npm install
npm run build:dev
``` 
To watch for changes and rebuild
```bash
npm run start
``` 
And start the autoreloading browser:
```bash
npm run browser
``` 
This will look for changes in the dist folder and reload

## Description 
All across spanish speaking countries the ingredients for recipes have different names, for example the word for 'Bell pepper' in Colombia is Pimentón but in other countries is 'Morrón' or 'Ají Dulce'. *Recetas Redux* is an SPA to deal with this problem, so you tell the app which country you are in and the ingredients get translated automatically for previously filled data by other users.

## About the tecnology stack
Some of the tech used and the motivation to use it are listed here:

### React
- Uses a special superset of javascript called JSX that allows you to use your previously learned javascript tricks without having to learn a new template language.
- Its based on components (not to be confused with web components), this motivates you to write reusable components that are shared in various screens of your app. 
- It encourages unidirectional flow of data and stateless components. In this way there is only one source of truth in your app and all the relevant components read it from there. One challenge of this approach is that if one little component want to change the state of a parent component it must communicate its intention though event callbacks all the way up, to deal with this issue Facebook created a companion architecture called *Flux* that put a central bureaucrat called the *Store* in charge of modifying the state of the app, so all the components that want to update the state have to pass an *Action* to it and then the *Store* will update its self and notify its subscribers. 

## TODOS
- [x] Put some material-ui goodness
- [ ] Add redux-thunk to deal with the asynchronous data 
- [ ] Add some responsive styling
- [ ] Update the data model to deal with the ingredients
- [ ] Test Firebase hosting