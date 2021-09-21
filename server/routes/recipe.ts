import { Request, Response} from "express"
import { RecipeModel} from "../models"

export const recipeMiddleware = async (req: Request, res: Response) : Promise<void> => {
  const recipeId = req.params.id
  const recipe = await RecipeModel.findById(recipeId)

  if (!recipe) {
    res.status(404).send({error: "Recipe not found"})
  } else {
    res.send(recipe)
  }
}
