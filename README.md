# Express template

## Use

### 1. Download the template

### 2. Enter the terminal
```
npm install
```
### 3.
**Rename the .env.example file to .env .**
<br/>
**Enter a base link .**

### 4. Run seeder
```
npm run seed
```

### 5. Run developer mode
```
npm run dev
```

**The template runs on port 5000 at http://localhost**
### http://localhost:5000


## Packages
+ bcryptjs         2.4.3
+ express         4.19.2
+ joi         17.12.3
+ jsonwebtoken         9.0.2
+ mongoose         8.3.2
+ nodemon         3.1.0


## File structure

```
express-template
.
├── app
│   ├── controllers
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middlwares
│   │   └── authMiddlwares.js
│   ├── models
│   │   └── userModel.js
│   ├── requests
│   │   └── authRequst.js
│   └── resources
│       └── userResource.js
├── config
│   └── dbConfig.js
├── routes
│   ├── authRoute.js
│   └── userRoute.js
├── seeders
│   ├── index.js
│   └── userSeeder.js
├── uilts
│   └── response.js
├── .env.example
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
└── README.md
```
