# Revisto
[revisto.live](https://revisto.live) is a public, anonymous journaling website

## Running Revisto locally
### Getting started
1. Install [Node.js](https://nodejs.org/en/) LTS
2. Install an IDE for web development ([VS Code](https://code.visualstudio.com/) is recommended)
3. Download the project's files to a path like `C:/YOUR_PATH` and extract the .zip
4. Open a command line (if using VS Code, you can use the command line built into the IDE) and navigate to the "server" folder: 

`cd C:/YOUR_PATH/revisto/server`

7. Install the backend server's dependencies: 

`npm install`

9. Launch the backend server:

`npm start`

10. Open another command line and navigate to the "client" folder:

`cd C:/YOUR_PATH/revisto/client`

11. Install the frontend server's dependencies:

`npm install`

12. Launch the frontend server:

`npm start`
  

### How it works
#### Server
The backend server runs on port 5000. It is configured to provide a set of HTTP requests including:
 - GET http://localhost:5000/posts (return all posts)
 - GET http://localhost:5000/posts/:id (return post of given id)
 - POST http://localhost:5000/posts (create a new post)

Try putting http://localhost:5000/posts or http://localhost:5000/posts/920 into your browser while the serving is running. When you do so, your browser will execute a GET request to the given route. 

It's a bit harder to try out POST requests, but you can use a tool like [Postman](https://www.postman.com/) to do so. 

#### Client
The frontend server runs on port 3000. If you navigate to http://localhost:3000, the website's frontend code will get "served" or sent to the client (your web browser). The client will then run this code locally.

As soon as the "PostLists" component is mounted, it gets all post data from the server via the GET http://localhost:5000/posts request. Then, it renders the title data of each post received.

## Wow, such a cool header
<-- Insert cool stuff here-->

## This is a test
