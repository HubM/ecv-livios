const express = require("express");
const {exec} = require("child_process");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json()); 
app.use(express.urlencoded());


app.get('/', (req,res) => {
  res.send("Welcome on the Livios app");
})


app.post("/light", function(req, res) {
  if(req.body) {
    const { on, off } = req.body;

    if (on) {
      exec('./openLight.sh', (errorLight, stdout, stderr) => {
        if (errorLight) {
          console.log(errorLight);
          return;
        }
        console.log(stdout);
        res.send('Light activate');
      })
    } else if (off) {
      exec("./closeLight.sh", (errorLight, stdout, stderr) => {
        if (errorLight) {
          console.log(errorLight);
          return;
        }
        console.log(stdout);
        res.send("Light activate");
      });      
    } else {
      res.send("use activeLight or desactiveLight in your post request");
    }
  } else {
    res.send("use activeLight or desactiveLight in your post request");
  }
});

app.listen(3000, function() {
  console.log("Livios app listening on port 3000!");
});