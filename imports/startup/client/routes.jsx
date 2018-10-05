import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

// Public components
import Home from '../../ui/pages/Home'
import Settings from '../../ui/pages/Settings'
import Account from '../../ui/pages/Account'
import NotFound from '../../ui/pages/NotFound'
import Signin from '../../ui/pages/Signin'
import Signup from '../../ui/pages/Signup'
import Signout from '../../ui/pages/Signout'
import TopHeader from '../../ui/components/TopHeader'
import Example from '../../ui/pages/Example'

Meteor.startup(() => {
  render(
    <Router>
      <div>
        <TopHeader />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <ProtectedRoute path="/example" component={Example} />
          <Route path="/account" component={Account} />
          <ProtectedRoute path="/settings" component={Settings} />
          <ProtectedRoute path="/signout" component={Signout} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>,
    document.getElementById('root'),
  )
})

/**
 * ProtectedRoute (see React Router v4 sample)
 * will check the Meteor login before routing to the requested page
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null
      return isLogged ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location },
          }}
        />
      )
    }}
  />
)

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
}
