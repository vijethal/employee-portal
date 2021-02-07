import {Request, Response} from 'express';
import {Employees} from "./db-data";
import {setTimeout} from 'timers';

export function saveEmployee(req: Request, res: Response) {

/*
  console.log("ERROR saving course!");
  res.sendStatus(500);
  return;
*/


    const data = req.body;
    const id = new Date().getUTCMilliseconds(); //Employees.reduce((pv,cv) => { return pv.id < cv.id ? cv.id : pv.id; });
    console.log("Saving course changes",JSON.stringify(data));

    const newCourse = {
      id,
      ...data
    };

    Employees[id] = newCourse;

    console.log("new course version", newCourse);

    setTimeout(() => {

        res.status(200).json(Employees[id]);

    }, 2000);



}
