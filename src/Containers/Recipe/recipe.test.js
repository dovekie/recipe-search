/* eslint no-undef: "off"*/

import React from 'react'
import TestRenderer from 'react-test-renderer'
import configureMockStore from 'redux-mock-store'
import Recipe from '../Recipe'

describe('Recipe', () => {
  it('Does not render a Recipe when no recipe is passed in', () => {

    const mockStore = configureMockStore()
    const store = mockStore()

    const testRenderer = TestRenderer.create(<Recipe store={store} />)
    const testInstance = testRenderer.root

    expect(testInstance.findAllByType('div').length).toBe(0)
  })

  it('Renders a Recipe when a recipe is passed in', () => {

    const mockStore = configureMockStore()
    const store = mockStore()

    const recipe = {
      name: 'bagel', 
      instructions: 'boil', 
      ingredients: [{name: 'everything', 'amount': 1, 'unit': 'cup'}]
    }

    const testRenderer = TestRenderer.create(<Recipe recipe={recipe} store={store} />)
    const testInstance = testRenderer.root

    expect(testInstance.findAllByType('h3')[0].children[0]).toBe('bagel')
    expect(testInstance.findAllByType('h4')[0].children[0]).toBe('Instructions')
  })
})
