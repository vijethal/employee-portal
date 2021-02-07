
import * as express from 'express';
import {Application} from "express";
import {getAllEmployees} from "./get-employees.route";
import {saveEmployee} from './save-employee.route';

const bodyParser = require('body-parser');

const app: Application = express();

app.use(bodyParser.json());

app.route('/api/employee').get(getAllEmployees);

app.route('/api/employee').post(saveEmployee);

const httpServer = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address()["port"]);
});



