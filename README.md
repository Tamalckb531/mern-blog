# mern-blog

A full stack blog app with advance mern feature

<hr/>

## First init commit :-

Create the empty react client folder with tailwind configurations.

<hr/>

## Page Route commit : -

Create all the pages and routes

<hr/>

## Header commit : -

1. In flowbite react TextInput component we pass react-icon in rightIcon props to create the search bar UI

2. Theme toggle and signin button show after menu in large screen and before menu toggle in medium screen -> used md:order-2

3. Used useLocation to find out the path and mark down the active link with active props in Navbar.Link

<hr/>

## Backend creation commit : -

1. Learn how to write script in package.json

2. Create a dotenv file and config it in server

<hr/>

## Model creation commit : -

created userSchema for users, our first model, which allow users to give only three information : username, password and email.

<hr/>

## Test Api commit : -

We created our api structure which goes by this :

controller -> routes -> index.js

1. controller have the function that would run in certain route
2. routes run the controller function in that particular route ( "/test" )
3. index.js holds the router with a group route ("/api/user") by using .use() middleware.

<hr/>

## Sign Up commit (api route, middleware for handling error, layout design, full stack feature) : -

This contain the full stack sign-up feature

_**Backend :**_

1.  auth.route receive the signup post request
2.  auth.controller :
    1. edge cases: to check null info
    2. hash password: hashing password using bcrypt.hashSync(p,s);
    3. data modelling: to create a data according to model
    4. data saving: saving data inside database using .save();
       _1 and 4 has next function which sends the response in global catch middleware also 1 use errorHandler function which can create error_

_**Frontend :**_

1. complete the sign up page layout design.
2. set the proxy in vite.config.js for port 3000.
3. setFormData in input change via handleChange function.
4. Fetch data in /api/auth/signup via handleSubmit function.
5. receiving res.ok and navigating in the sign-in route.

_**Full stack dataflow :**_

input change -> handleChange -> setFormData -> handleSubmit -> fetch in /auth/api/signup -> index.js auth middleware -> auth.route -> signup controller -> data retrieve from req.body -> null, empty check -> password hash -> data model -> data save in database -> send res.ok in client -> navigate to './signin'

<hr/>

## Footer commit : -

Footer added -> add dynamic date in the copyright section

<hr />

## Sign In commit (api route, frontend part, redux dataflow) : -

This contain the full stack sign-up feature

_**Backend :**_

1.  auth.route receive the signin post request
2.  auth.controller :
    1. edge cases: to check null info (email and password)
    2. validate email & password: find with email and compare password with bcrypt.
    3. Token generation: create token with id using jwt.
    4. sending token: separate password and send the rest info in response with token in the cookie
       _next function send the error in the global catch and errorHandler create an error_

_**Frontend :**_

same as the sign-up

_**Redux dataflow :**_

*Data: currentUser, error, loading
*Reducers: signInStart(loading = true), signInSuccess(currentUser = action.payload, loading = false), singInFailure(error = action.payload, loading = false)

1. using loading and error state of redux store via useSelector
2. handleSubmit triggering signInStart()
3. res.ok triggering signInSuccess(data as action.payload)
4. all errors triggering singInFailure(err.message)
5. using loading and error with useSelector(state => state.user) for loading and error alert.

<hr/>

## Redux commit : -

_**setup :**_

1. Create the store inside redux/store.js.
2. Wrap the root App component with the redux context Provider.
3. Slice: states and functions for a particular dataflow :
   1. initialState: store the initial data just like useState(init);
   2. userSlice: reducer that can manipulate state with functions :
      1. name:
      2. initialState
      3. reducers: all the the functions with there state and action as parameter
4. export the reducer functions.
5. export the reducer itself as default to set in the reducer in store.
   \*\* extra to know : to use the reducer => useDispatch()
   to use the states => useSelector()
