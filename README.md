# Password Keeper using Node.Js Express and MySQL

REST API implementation of provided API doc with validation of schema (using ajv), common error handler, authentication (using JWT - written for demonstration purpose under /secureAPI route. Not used since API doc doesn't state) and bcrypt module for encrypting password using salt and hash.

Followed Model, Service, Route architecture.

API is connected with MySQL DB, it contains authentication of API endpoint with JWT Token and Validation of request and response of each route. It has bcrypt module encrypts passwords. It contains Artillery for load testing.

# Structure

### config
/api-config - ensures all dependencies met and sets up environment
/database - MySQL server connection info
...

### common
common error codes and ivalidator 

### models
authentic - user login and auth
site - websites `(userId, website, username, password)`

### schema
validation schemas

### routes 
routes for authentic and site


# API Calls 

### The following calls are implemented as per API doc and are fully working (with password encryption)

### 1. User Account Registration

```
[POST] /app/user

Request Data: {
'username': str,
'password': str
}

Response Data: {
'status': 'account created'
}
```


![Alt text](https://github.com/agranya99/password-keeper/tree/master/screenshots/ss1.PNG)


### 2. User account login

```
[POST] /app/user/auth

Request Data: {
'username': str,
'password': str
}

Response Data: {
'status': 'success',
'userId': int
}
```


![Alt text](https://github.com/agranya99/password-keeper/tree/master/screenshots/ss2.PNG)


### 3. List of saved usernames and passwords for different websites

```
[GET] /app/sites/list/?user={userId}

Request Data: None

Response Data: [List of stored website username & passwords]
```


![Alt text](https://github.com/agranya99/password-keeper/tree/master/screenshots/ss3.PNG)


### 4. Save new username and password for a website

```
[POST] /app/sites?user={userId}

Request Data: {
'website': str,
'username': str,
'password': str
}

Response Data: {
'status': 'success'
}
```


![Alt text](https://github.com/agranya99/password-keeper/tree/master/screenshots/ss4.PNG)



### MySQL sites table


![Alt text](https://github.com/agranya99/password-keeper/tree/master/screenshots/mysqlEx.PNG)



# Used Packages 

### 1. MYSQL
```
 npm install mysql 
```
* Used to get mysql function and modules to perform DB operation  [know more about package](https://www.npmjs.com/package/mysql)

---

### 2. Express
```
npm install express 
```
* Platform built over it [know more about express](https://www.npmjs.com/package/express)

---

### 3. Ajv
```
npm install ajv 
```
* ajv used for validation of schema [know more about ajv](https://www.npmjs.com/package/ajv)

---

### 4. JWT
```
npm install jsonwebtoken 
```
* jsonwebtoken is used for authentication of api through Token [know more about jwt](https://www.npmjs.com/package/jsonwebtoken)

---

### 5. Nodemon
```
npm install nodemon 
```
* Nodemon will watch the files in the directory and if file changes automatically restart application  [know more about nodemon](https://www.npmjs.com/package/nodemon)

---

### 6. bcrypt
```
npm install bcrypt  
```
* bcrypt will encrypt your password throughing hashing so your password won't store as plain text .[know more about bcrypt](https://www.npmjs.com/package/bcrypt)

---

### Artillery (load testing) and pm2 (management tool) are present but not used

# Get Started

1. `$ git clone https://github.com/agranya99/password-keeper`
2. `$ npm install`
3. Launch Enviornment:
    * `$ node app.js or nodemon app.js`
4. In Cluster mode with the help of pm2 [optional step]:
    * `$ pm2 start app.js or pm2 start app.js -i <no of instances>`
5. Open in browser:
    * open `http://localhost:9890`



# API Usage 

 Follow documents
