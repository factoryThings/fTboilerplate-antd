import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Link, withRouter } from 'react-router-dom'

import Menu from 'antd/lib/menu'
import Icon from 'antd/lib/icon'

const { Item } = Menu

class TopHeader extends Component {
  state = { current: 'mail' }

  handleClick = (e) => {
    console.log('click ', e)
    this.setState({ current: e.key })
  }

  render() {
    const { currentUser } = this.props
    return (
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Item key="home">
          <Link href="/" to="/">
            <Icon type="home" /> Home
          </Link>
        </Item>
        <Item key="example">
          <Link href="/example" to="/example">
            <Icon type="api" /> Example
          </Link>
        </Item>
        <Item key="signin">
          <Link href="/signin" to="/signin">
            <Icon type="user" /> Sign in
          </Link>
        </Item>
        <Item key="signup">
          <Link href="/signup" to="/signup">
            <Icon type="select" /> Sign up
          </Link>
        </Item>
        <Item key="signout">
          <Link href="/signout" to="/signout">
            <Icon type="poweroff" /> Sign out
          </Link>
        </Item>
        <Item key="notfound">
          <Link href="/nopage" to="/nopage">
            <Icon type="exclamation-circle" /> Page not found
          </Link>
        </Item>
      </Menu>
    )
  }
}

TopHeader.propTypes = { currentUser: PropTypes.string.isRequired }

const TopHeaderContainer = withTracker(() => ({ currentUser: Meteor.user() ? Meteor.user().username : '' }))(TopHeader)
export default withRouter(TopHeaderContainer)
