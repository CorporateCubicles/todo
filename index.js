const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello to the world of Corporate Cubicles!!');
})

const portNo = 3000;
app.listen(portNo, ()=>{
    console.log(` Application running on Port Number ${portNo}`);
});