# Revisto
[revisto.live](https://revisto.live) is a public, anonymous journaling website

## Running Revisto locally
### Getting started
1. Install [Node.js](https://nodejs.org/en/) LTS
2. Use the command line to navigate to the server directory 

`cd revisto/server`

3. Install the backend server's dependencies

`npm install`

4. Launch the backend server

`npm start`

5. Navigate to the client directory

`cd ../client`

6. Install the client's dependencies

`npm install`

7. Launch the frontend server

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
