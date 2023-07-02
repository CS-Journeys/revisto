# Revisto
[revisto.net](https://revisto.net) is a public, anonymous journaling website
## Table of contents
  * [Getting started](#getting-started)
    * [Pre-requisites](#pre-requisites)
    * [Running Revisto locally](#running-revisto-locally)
  * [Using Docker](#using-docker)
    * [Client](#client)
    * [Server](#server)
    * [Stopping](#stopping)
  * [Deploying to AWS](#deploying-to-aws)
  * [Helpful Resources](#helpful-resources)

## Getting started
### Pre-requisites
1. Install [Node.js](https://nodejs.org/en/) LTS
2. Set up your environment config (Contact the lead developers and ask them for the required .env files)

### Running Revisto locally
1. Open a command line and navigate to the "server" folder:

`cd C:/YOUR_PATH/revisto/server`

2. Launch the backend:

`npm start`

3. Open another command line and navigate to the "client" folder:

`cd C:/YOUR_PATH/revisto/server`

4. Launch the frontend:

`npm start`

## Using Docker
### Client
```bash
docker build -t revisto-client client
docker run -p 3000:3000 -d revisto-client
```

### Server
```bash
docker build -t revisto-server server --build-arg ATLAS_URI=$ATLAS_URI --build-arg TOKEN_SECRET=$TOKEN_SECRET
docker run -p 8080:8080 -d revisto-server
```

### Stopping
```bash
docker ps
docker stop <YOUR_CONTAINER>
docker stop $(docker ps -q)
```

## Deploying to AWS
1. Create an ECR repository for `revisto-client` and `revisto-server`
2. Get the ECR repository URI without repository name (e.g.: `000000000000.dkr.ecr.us-east-1.amazonaws.com`)
3. Login to ECR
```bash
aws ecr get-login-password | docker login --username AWS --password-stdin ${ECR_REPOSITORY}
```
4. Push the images to ECR
```bash
docker image tag revisto-client:latest ${ECR_REPOSITORY}/revisto-client:latest
docker image tag revisto-server:latest ${ECR_REPOSITORY}/revisto-server:latest
docker push ${ECR_REPOSITORY}/revisto-client:latest && docker push ${ECR_REPOSITORY}/revisto-server:latest
```

5. Deploy the application to AWS
```bash
eb deploy
```

## Helpful Resources
- [AWS Workshop for Multicontainer ELB Deployment](https://catalog.us-east-1.prod.workshops.aws/workshops/ffb2b90a-c99b-499d-a077-551cbf0dee84/en-US/api-setup-docker/api-db-setup)
- [Article on ELB with docker-compose.yml](https://medium.com/adessoturkey/aws-elastic-beanstalk-with-docker-compose-yml-file-ae5958569b2f)

## FAQ
Q: I'm trying to deploy but I get this error: "The ECR service failed to authenticate your private repository. The deployment failed." How do I fix this?
A: Refresh the credentials in the .dockercfg -- that file should be in an S3 bucket. If that still doesn't work, add the `AmazonEC2ContainerRegistryReadOnly` policy to your `aws-elasticbeanstalk-ec2-role`.