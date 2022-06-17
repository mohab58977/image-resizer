### Scripts
- Install: ```npm install```
- Build: ```npm run build```
- Lint: ```npm run lint```
- Prettify: ```npm run format```
- Run unit tests: ```npm run test```
- Start server: ```npm run dev```

# Udacity-Image-Processing-API


## Overview
This is an API that can be used in two different ways. The first, as a simple placeholder API that allows us to place images into our frontend with the size set via url parameters. The second use case is as a library to serve properly scaled versions of our images to the frontend to reduce page load size. 

## Requirement
Here, I will list all the dependencies used in this project and how to install them.

#### 1. TypeScript
`npm i -D typescript ts-node`

#### 2. express and type express(Typescript support for express)
```
npm i -S express
npm i -D @types/express
```

#### 3. nodemon
`npm i -D nodemon`

#### 4. eslint
`npx eslint --init`

#### 5. prettier 
`npm install --save-dev prettier`

#### 6. set up prettier and eslint
`npm install --save-dev eslint-config-prettier eslint-plugin-prettier`


#### 8. SuperTest with type definition
`npm i -D supertest @types/supertest`

#### 10. morgan and types
`npm i -P morgan @types/morgan`

#### 11. sharp and types
`npm i -P sharp @types/sharp`


## How to build and start the server
The project can be built and run in the following ways
### 1. Install all dependencies 
`npm install`

### 2. Build
`npm run build`

!['build ts to js']

This command will build the typeScript code into JavaScript and save them in the `./build` folder.

### 3. Start the Server
`npm run dev`

This command will start the server running on port `9090`. And the front end homepage will be accessible at `http://localhost:9090`

## Testing and Linting
Here, I will show you how to run the test and also how to check that our code respects all the eslint rules.

### 1. Linting
`npm run lint`


### 2. Testing
`npm run test`



## Endpoints and Functionality. 
This project defines two endpoint. 

### 1. Homepage endpoint
`http://localhost:9090`

it serves the readme file as introduction to projet

### 2. Resize endpoint
`http://localhost:9090/resize?filename=<filename>&width=<width>&height=<height>`

Using the endpoint above, we can provide our filename, width and height value that we want our images to be resized , if you dont provide a width and height parameters the server will just provide the normal image without resizing.
`http://localhost:9090/resize?filename=fjord&w=500&h=400` 
`http://localhost:9090/resize?filename=fjord` 

This endpoint is used to resize all images found in the `./imageset/images` directory and saving them in the `./imageset/resized` directory. Then, it will serve these images to the frontend to be viewed. 

If a dimension is given that has all images already resized to that dimension, no futher resizing will take place. Instead, the already resized images with the appropriate dimensions will be pushed to the frontend. 



## Middlewwares to be aware of
I included two middlewares in this project. 
### 1. Logger Middleware 
This is for development purposes. It logs  information about the endpoints that is been accessed to the console. 

### 2. Page Not Found Middleware
This endpoint handles any unknown endpoints. For now, only two endpoints are recognized

```
http://localhost:9090/resize
http://localhost:9090/
```

If you try to access an enpoint order than these, this middleware will redirect to a page not found


## Handling Other Uncertainties
This API handles situations where there are no images to resize or parameters are not provided to resize the images.

### please visit docs folder to get the examples and understand the functionality
`./docs/images`