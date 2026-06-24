import {Router} from "express";
import {AcademicYearController} from "./academicyear.controller";

const AcademicYearRouter:Router = Router();
const academicYearController = new AcademicYearController();

AcademicYearRouter.post('/', academicYearController.createAcademicYear);
AcademicYearRouter.get('/', academicYearController.getAllAcademicYears);

export default AcademicYearRouter;