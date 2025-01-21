const express = require("express");
const pg = require("pg");
const client = new pg.Client(
  "postgres://postgres:nino@localhost:5432/acme_hr_db"
);

module.exports = { express, client };