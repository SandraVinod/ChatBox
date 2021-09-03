const express=require('express');
const app=new express();
const cors=require('cors');
const userData=require('./src/model/userdata');
const authRouter=require('./src/routes/authRoutes');

app.use(express.static('public'));
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/',authRouter)




app.listen(3000, function () {
    console.log("listening to port number: 3000");
  
  });