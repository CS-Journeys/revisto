# Revisto
[www.revisto.live](https://revisto.live) is a public, anonymous journaling website
## Table of contents
  * [Getting started](#getting-started)
    * [Setting up Git](#i-setting-up-git)
    * [Setting up your IDE](#ii-setting-up-your-ide)
    * [Setting up Node](#iii-setting-up-node)
    * [Setting up your environment config](#iv-setting-up-your-environment-config)
  * [Running Revisto locally](#running-revisto-locally)
  * [Contributing to Revisto](#contributing-to-revisto)
    * [Solving issues](#solving-issues)
  * [How it works](#how-it-works)
    * [Server](#server)
    * [Client](#client)

## Getting started
### I. Setting up Git
1. Install [Git](https://git-scm.com/downloads)
2. Set up command line authentication for your GitHub account (follow [this](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) tutorial)
3. Set up your identity by typing into a command line:

`git config --global user.name "John Doe"`

`git config --global user.email johndoe@example.com`

(replace John Doe and the email address with your actual GitHub user name and email address)

4. Use the command line to navigate to the path where you want to store the repository: 

`cd C:/YOUR_PATH`

5. Clone the repository: 

`git clone git@github.com:CS-Journeys/revisto.git`

### II. Setting up your IDE
Install an IDE for web development ([VS Code](https://code.visualstudio.com/) is recommended)

### III. Setting up Node
1. Install [Node.js](https://nodejs.org/en/) LTS
2. Open a command line and navigate to the "server" folder:

`cd C:/YOUR_PATH/revisto/server`

3. Install the backend server's dependencies: 

`npm install`

4. Navigate to the "client" folder:

`cd ../client`

5.  Install the frontend server's dependencies:

`npm install`

### IV. Setting up your environment config
Contact the lead developers and ask them for the required .env files


## Running Revisto locally
1. Open a command line and navigate to the "server" folder:

`cd C:/YOUR_PATH/revisto/server`

2. Launch the backend:

`npm start`

3. Open another command line and navigate to the "client" folder:

`cd C:/YOUR_PATH/revisto/server`

4. Launch the frontend:

`npm start`


## Contributing to Revisto
### Solving issues

1. Identify the [issue](https://github.com/CS-Journeys/revisto/issues) you'd like to solve
2. Open a command line to the root of your local repository
3. Update your local repository:

`git pull`

4. Create a new branch:

`git checkout -b my-branch-name`

5. Make your changes
6. Add your modified files to the Git staging area:

`git add my-file.js` to add specific files one by one, or

`git add .` to add all modified files

7. Commit your changes with a descriptive message:

`git commit -m "Implement user authentication"`

8. Push your changes to GitHub:

`git push -u origin my-branch-name`

9. Create a pull request in GitHub via the green "Compare & pull request" button
10. In GitHub, link the pull request to the relevant issue
11. Notify your team leader of your newly created pull request or assign a reviewer via the "Reviewers" settings button
12. Wait for the reviewer to review your code. If everything looks good, they will merge your code into the master branch.
13. Return to the master branch:

`git switch master`
  

## How it works
### Server
The backend server runs on port 5000. It is configured to provide a set of HTTP requests including:
 - GET http://localhost:5000/api/posts (return all posts)
 - GET http://localhost:5000/api/posts/:id (return post of given id)
 - POST http://localhost:5000/api/posts (create a new post)

Try putting http://localhost:5000/api/posts or http://localhost:5000/api/posts/920 into your browser while the serving is running. When you do so, your browser will execute a GET request to the given route. 

It's a bit harder to try out POST requests, but you can use a tool like [Postman](https://www.postman.com/) to do so. 

### Client
The frontend server runs on port 3000. If you navigate to http://localhost:3000, the website's frontend code will get "served" or sent to the client (your web browser). The client will then run this code locally.

As soon as the "PostLists" component is mounted, it gets all post data from the server via the GET http://localhost:5000/api/posts request. Then, it renders the title data of each post received.
