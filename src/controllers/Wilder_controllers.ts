import dataSource from "../utils";
import { Wilder } from "../entity/Wilder";
import { Skill } from "../entity/Skill";
import { Request, Response } from "express";

class WilderController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const create = await dataSource.getRepository(Wilder).save(req.body);
      res.send(create);
    } catch (error: any) {
      if (error.code === "SQLITE_CONSTRAINT") {
        res.status(409).send("Wilder email already exist");
      } else {
        res.send("Error creating Wilder");
      }
    }
  }

  async read(req: Request, res: Response): Promise<void> {
    try {
      const users = await dataSource.getRepository(Wilder).find();
      res.send(users);
    } catch (error) {
      res.send("Error get wilder");
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await dataSource.getRepository(Wilder).update(id, req.body);
      res.send("Wilder update");
    } catch (error) {
      res.send("Error update wilder");
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await dataSource.getRepository(Wilder).delete(req.params.id);
      res.send("succes delete");
    } catch (error) {
      res.send("Error delete wilder");
    }
  }

  async addSkill(req: Request, res: Response): Promise<void> {
    try {
      const wilderToUpdate = await dataSource
        .getRepository(Wilder)
        .findOneBy({ id: parseInt(req.params.wilderId) });
      if (wilderToUpdate === null) {
        res.status(404).send("Wilder is null");
        return;
      }
      console.log(wilderToUpdate);

      const skillToAdd = await dataSource
        .getRepository(Skill)
        .findOneBy({ id: parseInt(req.params.skillId) });
      if (skillToAdd === null) {
        res.status(404).send("Skill is null");
        return;
      }
      wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];

      await dataSource.getRepository(Wilder).save(wilderToUpdate);
      res.send("skill added to wilder");
    } catch (error) {
      res.send("Error while adding skill to wilder");
    }
  }
}

export default WilderController;
