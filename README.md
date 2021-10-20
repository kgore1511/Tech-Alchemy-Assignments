# Tech-Alchemy-Assignments
Steps to run the project ->

1. Firstly download the zip file of the project.
2. Run "npm install" command in assignment2 folder forn installing packages.
3. run "npm test" command in assignment2 folder for unit testing.
now start the server using "npm start" command in assignment2 folder.




--------------------API------------------------------

1. Post type Api -> "/user/register" for registration with data={name,email,password} and password should be unique.
2. post type Api -> "/user/login" for login with data={email,password}
3. get type Api-> "/news" or "/news?search=bitcoin"for fetching news based on search keyword and only logged in user can access this Api.
4. get type Api-> "/weather" for getting 5days weather this api doesn't require authentication.
5 post api-> "/user/logout" for log out user.

.env file -> all the keys, url's, port numbers and all other confidentials details are stored in .env file
I have used redis cache for third part api
and mocha and chai for unit testing.


-----------------------Description About the project---------------------------

user can register by calling 1 api by sending essentials details.
i have userd mocha and chai for unit testing .
for user authentication i used json web token.
and auth middleware is present which checks the authentication of user.




