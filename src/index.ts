import express from "express";
import dataSource from "./utils";
import WilderController from "./controllers/Wilder_controllers";
import SkillController from "./controllers/Skill_controllers";
import cors from "cors";

// création de App
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

// instance de classe wilderController
const wilderController = new WilderController();
const skillController = new SkillController();

// crétaiotn routes Wilders
app.post("/api/wilder", wilderController.create);
app.get("/api/wilder/users", wilderController.read);
// app.get("/api/wilder/oneUser/:id", wilderController.readOne);
app.delete("/api/wilder/users/delete/:id", wilderController.delete);
app.put("/api/wilder/users/update/:id", wilderController.update);

// création routes Skills
app.post("/api/skill", skillController.createSkill);
app.get("/api/wilder/skills", skillController.readSkill);
// app.get("/api/wilder/skill/:id", skillController.readOneSkill);
app.put("/api/wilder/skills/update/:id", skillController.updateSkill);
app.delete("/api/wilder/skills/delete/:id", skillController.deleteSkill);

// création de route pour ajouter un skill à un wilder
app.post("/api/wilder/:wilderId/skill/:skillId/add", wilderController.addSkill);
// app.delete(
//   "/api/wilder/:wilderId/skill/:skillId/remove",
//   wilderController.removeSkill
// );
// function asyncrone pour initialiser la base de donnée / écouter le port
const start = async (): Promise<void> => {
  await dataSource.initialize();
  app.listen(3001, () => console.log("Le serveur est sur le port 3001"));
};

// appel de la fonction
void start();
