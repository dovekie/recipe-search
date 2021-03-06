import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { HomeWrapper } from "./styles"
import Input from '@material-ui/core/Input'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import * as actions from '../../actions'
import Recipe from '../Recipe'

const ingredientList = [
  "flour", "sugar", "salt", "butter", "milk"
]

class Home extends Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleIngredient = this.handleIngredient.bind(this)
    this.fetchSearch = this.fetchSearch.bind(this)
    this.state = {
      term: localStorage.getItem('term') ? localStorage.getItem('term') : "",
      ingredients: localStorage.getItem('ingredients') ? localStorage.getItem('ingredients').split(',') :  ["milk"],
    }
  }

  componentDidMount() {
    if (this.state.useExistingSearch) {
      this.fetchSearch()
    }
  }

  fetchSearch () {
    console.log(`searching recipes...`)
    const searchRecipes = this.props.searchRecipes
    const {term, ingredients} = this.state
    searchRecipes(term, ingredients)
    localStorage.setItem('term', term)
    localStorage.setItem('ingredients', ingredients)
  }
  handleSearch(event) {
    const term = event.target.value
    this.setState({term})
  }
  handleIngredient(ingredient, event) {
    const {ingredients} = {...this.state}
    if (event.target.checked) {
      ingredients.push(ingredient)
    } else {
      const foundIngredient = ingredients.indexOf(ingredient)
      ingredients.splice(foundIngredient, 1)
    }
    this.setState({ingredients})
  }
  handleFindRecipe(id) {
    console.log(`Finding recipe ID: ${id}`)
    const findRecipe = this.props.findRecipe
    findRecipe(id)
  }
  render () {
    const {term, ingredients} = this.state
    const {recipes, isLoading} = this.props
    return (
      <HomeWrapper>
        <Input
          autoFocus={true}
          fullWidth={true}
          onChange={this.handleSearch}
          value={term}
        />
        <div>
          <h3>Ingredients on hand</h3>
          {ingredientList.map(
            ingredient => (
              <FormControlLabel
                key={ingredient}
                control={
                  <Checkbox
                    checked={ingredients.includes(ingredient)}
                    onChange={this.handleIngredient.bind(this, ingredient)}
                    value={ingredient}
                  />
                }
                label={ingredient}
              />
            )
          )}
        </div>
        <Button onClick={this.fetchSearch}>
          search
        </Button>
        <Divider />
        {
          recipes && (
            <List>
              {recipes.map( recipe =>
                <ListItem key={recipe.id} onClick={() => this.handleFindRecipe(recipe.id)}>
                  <ListItemText primary={recipe.name} />
                </ListItem>
              )}
            </List>
          )
        }
        {isLoading && <LinearProgress />}
        <Divider />
        <Recipe />
      </HomeWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const { search, recipe } = state
  return {...search, recipe}
}

const mapDispatchToProps = dispatch => bindActionCreators({
  searchRecipes: actions.searchRecipes,
  findRecipe: actions.findRecipe,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
