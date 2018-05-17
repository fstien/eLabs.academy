import express from "express";
import cors from "cors";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import serialize from "serialize-javascript";
import {Helmet} from "react-helmet";
const requestIp = require('request-ip');

// const https = require('https');
// var fs = require('fs')

var morgan = require('morgan')

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
import ISLMApp from "../shared/course/ISLM/ISLMApp.js";


app.use(express.static("public"));

app.use(bodyParser.json());
app.use(useragent.express());

app.set("view engine", "ejs");   
const ejs = require("ejs").__express;
app.engine('.ejs', ejs);
app.set('views', path.join(path.resolve(), 'src/server/views'));

app.use(morgan('dev'));
app.use(require('helmet')());




app.get("/course/solow*", (req, res, next) => {

  const contextObj = {};
  
  const markup = renderToString(
        <StaticRouter location={req.url} context={contextObj}>
          <SolowApp />
        </StaticRouter>
    );
 
  const helmetTitle = Helmet.renderStatic().title.toString();

  res.render('course', {
    frontScript: "js/solowFront.js",
    markup: markup, 
    title: helmetTitle,
  });

});


app.get("/course/is-lm*", (req, res, next) => {

  const contextObj = {};
  
  const markup = renderToString(
        <StaticRouter location={req.url} context={contextObj}>
          <ISLMApp />
        </StaticRouter>
    );
 
  const helmetTitle = Helmet.renderStatic().title.toString();

  res.render('course', {
    frontScript: "js/islmFront.js",
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


