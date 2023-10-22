const express = require('express')
const app = express()
const mySQL = require('mysql')
const db = mySQL.createPool(
    {
        //live server db path

        host:'b8wgnc8p68h4vv00f6op-mysql.services.clever-cloud.com',
        user:'uiad2grjjmqw9ha1',
        password:'5JbV5stn5dpgz83DNelU',
        database:'b8wgnc8p68h4vv00f6op'
    
        // // local db server path
       
        // host:process.env.REACT_DBSERVER ,
        // user: 'root',
        // password: '',
        // database: 'pos'
    }
)
const BodyParser = require('body-parser')
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(BodyParser.urlencoded({ extended: true }))

app.post("/api/NonQuery", (req, res) => {
   let mySQL = req.body.mySQL
   db.query(mySQL, (err, result) => {
    console.log(err)
    if (err == null)
        res.send('Record Saved')
    else 
        res.send('Error')
  })
});

app.get ("/api/DataQuery", (req,res) => {
    const mySQL = req.query.mySQL
    db.query(mySQL, (err, result) => {
        if(err) return res.json({Message: err+ "DB Server Connecting Error"});
        console.log(result)
        res.send(result)
    })
}
);
app.listen(3001, () => {
    console.log('Server is Running')
});

