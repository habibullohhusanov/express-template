# Express template 2.3.0

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

Code : *userSeeder.js*
```
const userSeeder = async () => {
    try {
        await User.deleteMany({});
        var user = new User({
            name: "Super Admin",
            username: "superadmin",
            role: "superAdmin",
            email: "superadmin@gmail.com",
            password: "1234",
        });
        await user.save();
        var user = new User({
            name: "Admin",
            username: "admin",
            role: "admin",
            email: "admin@gmail.com",
            password: "1234",
        });
        await user.save();
    } catch (error) {
        console.error("User seeder don\'t work:", error);
    }
}
```

### 5. Run developer mode
```
npm run dev
```

**The template runs on port 5000 at http://localhost**
### http://localhost:5000


## Packages
+ bcryptjs - 2.4.3
+ express - 4.19.2
+ joi - 17.13.3
+ jsonwebtoken - 9.0.2
+ mongoose - 8.5.1
+ nodemon - 3.1.4


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
