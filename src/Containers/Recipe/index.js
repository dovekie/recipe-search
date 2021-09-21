import React, { Component } from 'react'
import { connect } from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

class Recipe extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const recipe = this.props.recipe

    if (!recipe) {
      return null
    }

    const {name, ingredients, instructions} = recipe
    return (
      <div>
        <div>
          <h3>{name}</h3>
        </div>
        <div>
          <ul>
            {
              recipe && (
                <List subheader="Ingredients">
                  {ingredients.map((ingredient) => {
                    const ingredientText = `${ingredient.amount} ${ingredient.unit} of ${ingredient.name}`
                    return (
                      <ListItem key={ingredientText}>
                        <ListItemText primary={ingredientText} />
                      </ListItem>
                    )}
                  )}
                </List>
              )
            }
          </ul>
        </div>
        <div>
          <h4>Instructions</h4>
          <p>{instructions}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {recipe} = state
  return {...recipe}
}

export default connect(mapStateToProps)(Recipe)
