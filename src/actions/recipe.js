/* TODO: create recipe fetch actions, creators, and constants
  API: use /api/recipe/:id as a get request to fetch the recipe info
*/

export const GET_RECIPE = "GET_RECIPE"
export const RECEIVE_RECIPE = "RECEIVE_RECIPE"
export const FAIL_RECIPE = "FAIL_RECIPE"

const fetchingRecipe = () => ({
  type: GET_RECIPE
})

const fetchedRecipe = (payload) => ({
  type: RECEIVE_RECIPE,
  payload
})

const failedRecipe = (payload) => ({
  type: FAIL_RECIPE,
  payload
})

export const executeFind = async (recipeId) => {
  const response = await fetch(`/api/recipe/${recipeId}`, {
    method: 'GET',
  })
  const findResults = await response.json()
  console.log("found: " + findResults.name)
  return findResults
}

export const findRecipe = (recipeId) => {
  return (dispatch) => {
    dispatch(fetchingRecipe())
    return executeFind(recipeId).then(
      res => dispatch(fetchedRecipe(res))
    ).catch(
      err => dispatch(failedRecipe(err))
    )
  }
}

