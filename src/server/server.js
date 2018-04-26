import express from "express";
import cors from "cors";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import serialize from "serialize-javascript";
import {Helmet} from "react-helmet";
const requestIp = require('request-ip');

const https = require('https');

var morgan = require('morgan')
var fs = require('fs')

var mysql = require('mysql');

const bodyParser = require('body-parser');
var useragent = require('express-useragent');


import path from 'path';

import sourceMapSupport from "source-map-support";

import { createStore } from 'redux';

var compression = require('compression');

const app = express();

app.use(compression());


import LearnApp from "../shared/Nav/NavApp.js"
import SolowApp from "../shared/course/Solow/SolowApp.js";


app.use(express.static("public"));

app.use(bodyParser.json());
app.use(useragent.express());

app.set("view engine", "ejs");   
const ejs = require("ejs").__express;
app.engine('.ejs', ejs);
app.set('views', path.join(path.resolve(), 'src/server/views'));

app.use(morgan('dev'));
app.use(require('helmet')());


// create a write stream (in append mode)
//var accessLogStream = fs.createWriteStream(path.join(path.resolve(), 'access.log'), {flags: 'a'})
// setup the logger
//app.use(morgan('combined', {stream: accessLogStream}))



app.get("/course/solow*", (req, res, next) => {

  const contextObj = {};
  
  const markup = renderToString(
        <StaticRouter location={req.url} context={contextObj}>
          <SolowApp />
        </StaticRouter>
    );
 
  const helmetTitle = Helmet.renderStatic().title.toString();

  res.render('course', {
    frontScript: "solowFront.js",
    markup: markup, 
    title: helmetTitle,
  });

});


app.get("/*", (req, res, next) => {

  const contextObj = {};
  
  const markup = renderToString(
        <StaticRouter location={req.url} context={contextObj}>
          <LearnApp />
        </StaticRouter>
    );
  
  const helmetTitle = Helmet.renderStatic().title.toString();

  res.render('learn', {
    markup: markup, 
    title: helmetTitle,
  });
})



app.get("*", (req, res, next) => {
  res.sendStatus(404)
})


app.listen(3000, () => { 
  console.log("App is running.")
});

/*
const options = {
    cert: fs.readFileSync('/home/ubuntu/certs/fullchain.pem'),
    key: fs.readFileSync('/home/ubuntu/certs/privkey.pem')
};

https.createServer(options, app).listen(3000);
*/


