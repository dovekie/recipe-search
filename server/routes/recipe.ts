import { Request, Response, NextFunction } from "express"
import { RecipeModel, Ingredient } from "../models"

export const recipeMiddleware = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
  const recipeId = req.params.id;
  const recipe = await RecipeModel.findById(recipeId);

  if (!recipe) {
    res.status(404).send({error: "Recipe not found"});
  } else {
    res.send(recipe);
  }
}
