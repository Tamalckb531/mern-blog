# mern-blog

A full stack blog app with advance mern feature

<hr/>

## First init commit :-

Create the empty react client folder with tailwind configurations.

<hr/>

## Page Route commit : -

Create all the pages and routes

<hr/>

## Header commit (initial, dynamic, dark mode) : -

1. In flowbite react TextInput component we pass react-icon in rightIcon props to create the search bar UI

2. Theme toggle and signin button show after menu in large screen and before menu toggle in medium screen -> used md:order-2

3. Used useLocation to find out the path and mark down the active link with active props in Navbar.Link

_**Dynamic :**_ :

1. checking the currentUser exist or not :
   1. if exist: showing Avatar with dropdown.
   2. if not exist: showing the Sign In button.

_**Dark mode :**_ :

1. Redux dataFlow :
   1. Initial State has light theme
   2. themeSlice has toggleTheme reducer which toggle theme between dark and light on each dispatch.
2. App is wrapped in ThemeProvider
3. ThemeProvider has the theme state from themeSlice via useSelector().
4. Header component theme button trigger the dispatch of toggleTheme() each time it clicked and dynamically change the icons with it.

<hr/>

## Backend creation commit : -

1. Learn how to write script in package.json

2. Create a dotenv file and config it in server

<hr/>

## Model creation commit : -

created userSchema for users, our first model, which allow users to give only three information : username, password, profilePicture and email.

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

## Oauth commit (frontend part, backend part) : -

_**Frontend :**_

1. add firebase.js in src with .env api and export the app.
2. handleGoogleClick in Oauth :

   1. signin the user using there google account and save it into the resultsFromGoogle
   2. make post request and send name, email, googlePhotoUrl in /api/auth/google
   3. make json data out of post request data.
   4. on res.ok : dispatch(signInSuccess(data)); called and navigating into home

_**Backend :**_

1.  auth.route receive the google post request
2.  auth.controller :
    1. Find the user using findone() method
    2. On users existence:
    3. creating token and sending the info without password
    4. On users non-existence :
    5. generate password and hashing it for new user
    6. create new user with name, email, pass and picture
    7. creating token and sending the info without password
       _next function send the error in the global catch and errorHandler create an error_

<hr/>

## Redux commit (setup, persisted data) : -

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

   <br/>

   \*\* extra to know : to use the reducer => useDispatch()
   to use the states => useSelector()

6. In store.js :

   1. combineReducers used to combine all the reducer together
   2. persistReducer used to store all the data in local storage
   3. middleware in store is to prevent some error
   4. persistor is use to making the persisted data available on main.jsx
   5. main.jsx has PersistGate over the provider to provide all the persisted data.

<hr/>

## Private Component commit :-

1. Create a PrivateRoute which see the user is logged in or not.
   1. If logged then send the user in outlet (the component wrapped inside it).
   2. If not logged in then send the user in the signIn route
2. Wrapped the component that needs to private inside it with the browser router.

<hr/>

## Dashboard commit (Profile UI, Image Upload feature, Update Functionality, Delete Functionality, SignOut Functionality): -

_**Profile UI :**_

1. Dashboard component:
   1. Have an useEffect that gets the value of tab params in url and set it in the tab state.
   2. There is DashSidebar which have :
      1. Same as the one
      2. Have Profile and signOut. Make profile active according to tab
   3. Also there has DashProfile which render conditionally if the tab is profile which have :
      1. The whole User profile with image.

_**Image Upload feature :**_

1. Input file has handleImageChange function that save the image file inside imageFile state and creating an url and saving inside imageFileUrl state
2. useEffect -> check imageFile exist -> uploadImage()
3. uploadImage() -> storage and filename -> ref those in storageRef -> uploadTask by bytes resumable both storageRef and imageFile.
4. uploadTask.on()-> progress, error, download url.

_UI_

1. Circular Progressbar depends on imageFileUploadProgress state.
2. Alert depends on imageFileUploadError

_**Update Functionality Frontend :**_

1. Setting a object state formData for setting all the changes of data with key in that.
2. Setting handleChange Function on each TextInput field and inside function setting the formData change on each change.
3. Triggering a handleSubmit function when update button is clicked :
   1. return when no changes and image is still uploading (we made a state imageFileUploading for that and it tracks the whole handleImageChange function from start to complete)
   2. Three redux data flow works here : updateStart, updateSuccess (set the currentUser), updateFailure(set the error)
   3. In the try block :
      1. updateStart()
      2. fetch the put request in /api/user/update/${currentUser.\_id} with formData.
      3. make the response json
      4. see the response ok or not :
         1. Not okay -> updateFailure(data.message)
         2. okay -> updateSuccess(data)
   4. In catch block we set the failure.
   5. We have updateUserSuccess and updateUserError to determine the alert.

_**Update Functionality Backend :**_

1. Add cookieParser middleware to the index.js.
2. set the put route for /update/:userId with the verifyToken middleware
3. verifyToken -> take the token from req.cookies.access_token -> verify it with jwt.verify() -> set the user in req.user
4. updateUser function in the put route handle the rest operation :

   1. check the user.id and password, username length, username space in middle, lowercase, regex and throw error if something is wrong
   2. On password update, it makes it hashPass
   3. On try block :
      1. It find the document with findByIdAndUpdate() where id is req.params.userId
      2. Set method only change the specific field mentioned while maintaining the other field intact in database
      3. new:true returns the updated document in updateUser
      4. Extract the password and return the rest via json.
   4. catch block throw the error in global catch.

_**Delete Functionality Backend :**_

1. /delete/:userId capture the delete request in user.route -> verifyToken -> call deleteUser from user.controller
2. deleteUser in user.controller

   1. Match the userId with the Id in params and do not further process if the Id not matched
   2. Delete the user from database with findByIdAndDelete(req.params.userId) method

_**Delete Functionality Frontend :**_

1. Modal popup on "Delete Account" button.
2. handleDeleteUser run on "Yes, I'm sure" in modal.
3. handleDeleteUser :

   1. Redux dataflow uses : deleteUserStart(start loading), deleteUserFailure(state error),
      deleteUserSuccess(make currentUser null)
   2. deleteStart()
   3. make a DELETE fetch request on /api/user/delete/${currentUser.\_id}
   4. deleteSuccess(data) on res.ok

_**SignOut Functionality Backend :**_

1. /signout capture the signout request in user.route and call the signout function insider user.controller.
2. singout function -> .clearCookie the access_token

_**SignOut Functionality Frontend :**_

_same functionality for DashSidebar, Header, DashProfile_

1. Redux dataflow : singoutSuccess(makes the currentUser null)
2. Sign Out button triggers the handleSignOut function
3. handleSignOut:
   1. makes a post request inside /api/user/signout
   2. dispatch signoutSuccess() on res.ok

<hr/>

## Admin commit : -

add the isAdmin in user.model and creating token with isAdmin in google and signin function inside auth.controller

<hr/>

## Post Feature commit (Post Functionality, Upload Image Functionality, Publish Post Functionality, Showing post Functionality, Deleting post Functionality, Updating post Functionality) : -

_**Post Functionality Frontend :**_

1. Create Post button render in DashProfile if the currentUser is Admin. It redirect to the "/create-post" route.
2. "/create-post" route is protect by <OnlyAdminPrivateRoute/> which checks the user is admin or not. If yes then it render the <CreatePost/>.
3. <CreatePost/> : We are using <ReactQuill/> here which is a blog writer

_**Post Functionality Backend :**_

1. /api/post/create handle the create post request
2. post model data : userId, content, title(unique), image, category, slug(unique)
3. /create verify the token and redirect to the create function in the post controller.
4. create :
   1. Throw error if the user is not admin
   2. Throw error if no title and content in post
   3. Making the slug which is the title without any character except [^a-zA-Z0-9-].
   4. Creating a newPost with req.body, slug, and req.user.id as userId.
   5. Saving the post using .save() method.

_**Upload Image Functionality :**_

1. file state hold the first image select on the FileInput.
2. Clicking 'Upload Image' button :
   1. Trigger the handleUploadImage :
      1. Throw error if file state is empty.
      2. Get the storage from firebase and set a fileName for the file. Than makes a storageRef out of them.
      3. Then set a uploadTask with storageRef and file with uploadBytesResumable().
      4. uploadTask.on() :
         1. snapshot callback : set the progress
         2. error callback : set the error
         3. main callback : getDownloadUrl call with snapshot.ref and we setFormData with previous formData and image:downloadUrl.
3. Show the circularProgressBar with imageUploadProgress state while uploading.
4. Show the image after formData has image.

_**Publish Post Functionality :**_

1. On writing in TextInput, Select, ReactQuill we set formData. <br/>
   TextInput : title, Select: category, ReactQuill: content.
   2.Clicking Publish trigger the handleSubmit.
2. handleSubmit :
   1. fetch formData in body of /api/post/create
   2. On res.ok -> navigate to /post/${data.slug}

_**Showing post Functionality Backend:**_

1. /api/post/getposts handle the showing post functionality.
2. It don't verify the token cause anyone can see the post and run the getposts funciton of post.controller.
3. getposts function (it will use in both search, dashboard, home route) :

   1. It find the data with multiple queries using .find() method of mongoose :

      1. ... use to conditionally check the query and using multiple query.
      2. userId, slug, postId, category are normal query to get the post.
      3. On searchTerm we are using regex so that any word written on title 'or' content can be given in the search box and it will find the relevant blog.

   2. Then sort them according to the update date, skip will do pagination( like on 2nd page it will skip the startIndex\*limit means 9 post), limit will limit the blog post number.
   3. We will count totalPosts and lastMonthPosts to show them in dashboard.

_**Showing post Functionality Frontend:**_

1. Posts section in Dashboard sidebar will only show for the admin.
2. It will render the DashPosts as per the tab
3. DashPosts :
   1. It get the post with the current_User.\_id
   2. Render the post with Table component of Flowbite.
4. Show more button in the end of DashPosts will fetch more data in table by triggering the handleShowMore function.
5. handleShowMore :
   1. Get the data with userId and userPosts length as startIndex
   2. Set the data in userPosts with previous ones.
   3. Remove the showMore button if data.post length is <9 as per the limit.

_**Deleting post Functionality Backend:**_

1. api/post//deletepost/:postId/:userId trigger the deletepost function.
2. deletepost :
   1. check user isAdmin and the userId is matched with the userId in params. Work next if all ok.
   2. find the postId and delete it with findByIdAndDelete method in mongoose.

_**Deleting post Functionality Frontend:**_

1. Delete Button :
   1. Open the model.
   2. set the postIdToDelete.

2.Modal :

      1.  Yes, I'm sure trigger the handleDeletePost :
         1.  close the modal
         2.  call the delete api with postIdToDelete and currentUser.\_id
         3.  If res.ok than filter the delete post and set the other post in UserPosts.

_**Updating post Functionality Backend:**_

1. api/post/updatepost/:postId/:userId trigger the updatepost function.
2. updatepost :
   1. Get the postId from param.
   2. set title, content, category, image with the new one came in req.body.
   3. {new:true} set the new info in the updatedPost and this send as response.

_**Updating post Functionality Frontend:**_

1. Create UpdatePost page protected private with OnlyAdminPrivateRoute with path /update-post/:postId
2. UpdatePost (works almost like CreatePost page)
   1. Here handleSubmit works with the api /api/post/updatepost/${formData._id}/${currentUser.\_id} .
   2. Each time the postId change, it re-fetch the post from /api/post/getposts?postId.
   3. The 0th index data of posts store in the formData as the post is sorted with updatedTime and just updated post is store in the update section.

## User rendering Feature commit:

_**Backend:**_

1. api/user/getusers trigger the getUsers function.
2. getUsers :
   1. Get all the users with pagination limit.
   2. Remove the password of the users from user.\_doc.
   3. Get the totalCount and monthlyTotalCount of users to show it on the blog.

_**Frontend:**_

1. Users section in Dashboard sidebar will only show for the admin.
2. It will render the DashUsers as per the tab
3. DashUsers :
   1. fetch the data of Users in the table from /api/users/getusers.
   2. Clicking show more data trigger handleShowMore which render more data with the previous data
4. Delete User Modal:
   1. Clicking Delete button trigger it.
   2. Clicking "Yes! I'm sure" trigger the handleDeleteUser function.
   3. It call the /api/user/delete/:userId route with a delete method.
   4. On res.ok it filter the user state and set new users in the user state.

<hr/>
