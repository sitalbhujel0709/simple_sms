import { AcademicYearService } from './academicyear.service';
import type { Request, Response } from 'express';

export class AcademicYearController {
  private academicYearService = new AcademicYearService();
  createAcademicYear = async (req: Request, res: Response) => {
    const { year } = req.body;
    try {
      const academicYear = await this.academicYearService.createAcademicYear({ year });
      res.status(201).json(academicYear);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  getAllAcademicYears = async (req: Request, res: Response) => {
    try {
      const academicYears = await this.academicYearService.getAllAcademicYears();
      res.status(200).json(academicYears);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
  
}