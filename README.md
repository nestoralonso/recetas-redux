
# recetas-redux

recetas-redux is an app to search and create recipes but with this twist:  
All across spanish speaking countries the same ingredient has different name depending on the country, for example the word for 'Bell pepper' in Colombia is 'Pimentón' but in other countries is 'Morrón' or 'Ají Dulce'. *Recetas Redux* is an SPA to deal with this problem, so you tell the app which country you are in and the ingredients get localized for previously filled data by other users.

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

## About the tecnology stack
Some of the tech used and the motivation to use it are listed here:

### React
- Uses a special superset of javascript called JSX that allows you to use your previously learned javascript tricks without having to learn a new template language.
- Its based on components (not to be confused with web components), this motivates you to write reusable components that are shared in various screens of your app. 
- It encourages unidirectional flow of data and stateless components. In this way there is only one source of truth in your app and all the relevant components read it from there. One challenge of this approach is that if one little component want to change the state of a parent component it must communicate its intention though event callbacks all the way up, to deal with this issue Facebook created a companion architecture called *Flux* that put a central bureaucrat called the *Store* in charge of modifying the state of the app, so all the components that want to update the state have to pass an *Action* to it and then the *Store* will update its self and notify its subscribers. 

### Redux
It follows the spirit of *Flux* but technically don't implement it. Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently and are easy to test, also provides a great developer experience, such as live code editing combined with a time traveling debugger. See [Hot Reloading with Time Travel](https://www.youtube.com/watch?v=xsSnOQynTHs)

## TODOS
- [x] Put some material-ui goodness
- [x] Add redux-thunk to deal with the asynchronous data
- [x] Put a firebase backend
- [x] Put some webpack on it, pending: doesn't make hot reloading always
- [x] Check the unit selection for ingQ, ait this moment it doesn't change
- [x] Serialize the ingredient units in IngQua
- [x] Make a fake backend for rapid testing
- [x] Test [react-transform-boilerplate](https://github.com/gaearon/react-transform-boilerplate), the hot loader b3 did the work
- [x] Implement a fb index to search ingredients by words, ex: ```{'panceta': '0xavad', 'tocineta': '0xavad'}```
- [x] split by word and normalize word before putting them in the index
- [x] Update the data model to deal with the ingredients
- [x] Implement cancel for create form
- [x] Country selector implement, for anonymous users too
- [x] Search Recipe Page 
- [ ] Detail view for recipes with portions calculator
- [ ] Delete ingQuant
- [ ] Explain better why is getting those search results, ex: searching for 'b': also finds 'tocineta' because one of its locs is 'beicon' 
- [ ] Complete ingredient CRUD
- [ ] Complete recipe CRUD
- [ ] Recipe form validation
- [ ] Implement logout
- [ ] Search recipes by ingredient
- [ ] Add some responsive styling
- [ ] Test Firebase hosting
- [ ] Edit form for recipes
- [ ] Implement redirect for login
- [ ] Checkout material-ui with sass

## DREAM TODOS
- [ ] Implement it as a PWA (Progressive Web App)
- [ ] Given an ingredient, search recipes based on it
- [ ] Add i18n to the strings