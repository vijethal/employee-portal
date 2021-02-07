
import {Request, Response} from 'express';
import {Employees} from "./db-data";



export function getAllEmployees(req: Request, res: Response) {

/*
    console.log("ERROR loading courses!");
    res.status(500).json({message: 'error occurred.'});
    return;
*/



        setTimeout(() => {

             res.status(200).json({payload:Object.values(Employees)});

        }, 1500);


}
