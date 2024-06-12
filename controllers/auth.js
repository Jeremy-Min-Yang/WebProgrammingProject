const authController = {};
import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config({ path: './.env'});

const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

authController.register = (req, res) => {
    console.log(req.body);

    const {fName, lName, email, password} = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async(error, results) => {
        if(error) {
            console.log(error)
        }

        if(results && results.length > 0) {
            console.log("Email not found");
            return res.redirect('/signup.html?message=Email Already in use');
        }

        db.query('INSERT INTO users SET ?', {firstName: fName, lastName: lName, email, password: password}, (error, results) =>{
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                return res.redirect('/main.html');
            }
        })

    });

};

authController.login = (req, res) => {
    console.log("Login attempt:", req.body);

    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.log("Database query error:", error);
            return res.status(500).send("An error occurred.");
        }

        if (!results || results.length === 0) {
            console.log("Email not found");
            return res.redirect('/signup.html?message=Incorrect email or password');
        }

        const user = results[0];
        console.log("User found:", user);

        // Compare plain text passwords
        if (password !== user.password) {
            console.log("Password does not match");
            return res.redirect('/signup.html?message=Incorrect email or password');
        }

        console.log("Login successful");
        res.status(200).redirect('/main.html');
    });
};

export default authController;