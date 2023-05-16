const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set('views', './public') // Pour render file sans dirname example :(app.render('contact') /=/ (__dirname+ '/public/contact.ejs'))
app.use(express.static('public'));

app.use ((req, res, next) => {
  const date = new Date();
  const days = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  if (days >= 1 && days <= 5) {
    req.restDays = 0;
  } else if (days === 0) {
    req.restDays = 1;
  } else {
    req.restDays = 2;
  }
  if (hours >= 0 && hours <= 9) {
    req.restHours = 9 - hours - 1;
  } // Aprés minuit 00:00h ==>9h
  else if (hours >= 9 && hours <= 0) {
    req.restHours = 9 - hours + 24 - 1;
  } // Avant minuit 00:00h {9h ==> 00h}

  req.restMinutes = 60 - minutes;
  req.restSeconds = 60 - seconds;
  req.openHours = days >= 1 && days <= 5 && hours >= 9 && hours <= 17;
  if (req.openHours) {
    next();
  } else {
    res.render(__dirname+'/public/worktime.ejs',{
      days: req.restDays,
      hours: req.restHours,
      minutes: req.restMinutes,
      seconds: req.restSeconds,
    });
    ;
  }
});

app.get("/",(req, res) => {
  res.render('home');
});

app.get("/contact",(req, res) => {
  res.render('contact');
});

app.get("/services",(req, res) => {
  res.render(__dirname + "/public/services.ejs");
});

app.listen(8000, console.log("server live on port 8000"));
