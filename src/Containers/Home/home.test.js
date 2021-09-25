/* eslint no-undef: "off"*/

import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { render } from 'enzyme'
import Home from '../Home'

describe('the Home component', () => {
  it('should render', () => {
    const mockStore = configureMockStore()
    const store = mockStore()
    const wrapper = render(
      <Provider store={store}>
        <Home />
      </Provider>
    )
    expect(wrapper.html()).toContain('div')
    expect(wrapper.find('h3').html()).toBe('Ingredients on hand')
  })
})
