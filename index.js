"use strict";
import express from "express";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";

let app = express();
let PORT = process.env.PORT || 3011;

app.listen(PORT, () => {
  console.log(`App starting on port ${PORT}`);
});
