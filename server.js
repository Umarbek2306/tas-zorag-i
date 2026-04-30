const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.use(session({
  secret: "secret-key",
  resave: false,
  saveUninitialized: true
}));

// логин
app.post("/login", (req, res) => {
  const { login, password } = req.body;

  if (login === "admin" && password === "12345") {
    req.session.user = "admin";
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// проверка
app.get("/check", (req, res) => {
  if (req.session.user) {
    res.json({ auth: true });
  } else {
    res.json({ auth: false });
  }
});

// выход
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login.html");
});

app.listen(3000, () => console.log("Server started"));
