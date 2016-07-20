
# recetas-redux

recetas-redux is an app to search and create recipes but with this twist:  
All across spanish speaking countries the same ingredient has different name depending on the country, for example the word for 'Bell pepper' in Colombia is 'Pimentón' but in other countries is 'Morrón' or 'Ají Dulce'. *Recetas Redux* is an SPA to deal with this problem, so you tell the app which country you are in and the ingredients get localized for previously filled data by other users.

## Run from the web
The project is deployed on firebase, just type
https://recetas-redux.firebaseapp.com

## Setup and running 
To run, just type 
```bash
http-server
``` 
Or your favorite server

To install the dependencies
```bash
npm install
``` 
To watch for changes and rebuild using browserify and babelify, this also starts the liveserver in the port 8080
```bash
npm run start
``` 
liveserver will watch for changes in the dist/ folder

## Run using webpack
All the project should run fine using webpack, but the main method 
```bash
npm run startwp
```

## About the tecnology stack
Some of the tech used and the motivation to use it are listed here:

### React
- Uses a special superset of javascript called JSX that allows you to use your previously learned javascript tricks without having to learn a new template language.
- Its based on components (not to be confused with web components), this motivates you to write reusable components that are shared in various screens of your app. 
- It encourages unidirectional flow of data and stateless components. In this way there is only one source of truth in your app and all the relevant components read it from there. One challenge of this approach is that if one little component want to change the state of a parent component it must communicate its intention though event callbacks all the way up, to deal with this issue Facebook created a companion architecture called *Flux* that put a central bureaucrat called the *Store* in charge of modifying the state of the app, so all the components that want to update the state have to pass an *Action* to it and then the *Store* will update its self and notify its subscribers. 

### Firebase
Firebase is great for a couple of things:
- A nice object DB
- Has 'real-time' capabilities 
- Provides free hosting
- Has an implementation for authentication using multiple providers
What is not so great:
- The types of queries you can make are vastly limited, forget about 'LIKE', 'AND' and 'OR', maybe this is because of its 'real-time' nature.
- There are no views or complex queries that can run on the server, this can be alleviated if you write some server code that collects the complex views and passes the result to the US client.

### Redux
It follows the spirit of *Flux* but technically don't implement it. Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently and are easy to test, also provides a great developer experience, such as live code editing combined with a time traveling debugger. See [Hot Reloading with Time Travel](https://www.youtube.com/watch?v=xsSnOQynTHs).
Redux creates a new state like this: oldState + action = newState

### CSS using BEM
 BEM stands for Block, Element, Modifier, it is a methodology for naming css classes. The block is the parent element for example, ```recipe-form```, an element is child of the block for example ```recipe-form__title```, finally the modifier can style an element without clonflicting with other classes, for example ```recipe-form__title--red```. For more info look at [BEM 101](https://css-tricks.com/bem-101/)



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
- [x] Detail view for recipes with portions calculator
- [x] Delete ingQuant
- [x] Recipe form validation
- [x] Add some responsive styling
- [x] Test Firebase hosting
- [x] Implement redirect for login
- [x] Edit form for recipes
- [ ] Normalize ingredients name when saving, ie, remove tildes and lowercase
- [ ] Make a production bundle
- [ ] Make the recipes hub use the REST api 
- [ ] Usability: Fix the ingredient search UI a little, by making more clear why is showing those search results, ex: searching for 'b': also finds 'tocineta' because one of its locs is 'beicon' 
- [ ] Complete ingredient CRUD
- [ ] Complete recipe CRUD
- [ ] Implement logout
- [ ] Checkout material-ui with sass

## DREAM TODOS
- [ ] Implement it as a PWA (Progressive Web App)
- [ ] Given an ingredient, search recipes based on it
- [ ] Add i18n to the strings
