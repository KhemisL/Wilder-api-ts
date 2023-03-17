import dataSource from "../utils";
import { Request, Response } from "express";
import { Skill } from "../entity/Skill";

class SkillController {
  async createSkill(req: Request, res: Response): Promise<void> {
    try {
      const createSkill = await dataSource.getRepository(Skill).save(req.body);
      res.send(createSkill);
    } catch (error: any) {
      if (error.code === "SQLITE_CONSTRAINT") {
        res.status(409).send("Skill already exist");
      } else {
        res.send("Error creating Skill");
      }
    }
  }

  async readSkill(req: Request, res: Response): Promise<void> {
    try {
      const skill = await dataSource.getRepository(Skill).find();
      res.send(skill);
    } catch (error) {
      res.send("Error get skill");
    }
  }

  async updateSkill(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await dataSource.getRepository(Skill).update(id, req.body);
      res.send("Update Skill");
    } catch (error) {
      res.send("Error update wilder");
    }
  }

  async deleteSkill(req: Request, res: Response): Promise<void> {
    try {
      await dataSource.getRepository(Skill).delete(req.params.id);
      res.send("succes delete");
    } catch (error) {
      res.send("Error delete wilder");
    }
  }
}

export default SkillController;
