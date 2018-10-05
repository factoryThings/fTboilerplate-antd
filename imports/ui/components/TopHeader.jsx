import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Link, withRouter } from 'react-router-dom'

import Menu from 'antd/lib/menu'
import Icon from 'antd/lib/icon'
import Layout from 'antd/lib/layout'

const { Header } = Layout
const { Item, SubMenu } = Menu

class TopHeader extends Component {
  state = { current: 'home' }

  handleClick = (e) => {
    console.log('click ', e)
    this.setState({ current: e.key })
  }

  render() {
    const { currentUser } = this.props
    const { current } = this.state
    return (
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['home']}
          selectedKeys={[current]}
          style={{ lineHeight: '64px' }}
          onClick={this.handleClick}
        >
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
          <Item key="notfound">
            <Link href="/nopage" to="/nopage">
              <Icon type="exclamation-circle" /> Page not found
            </Link>
          </Item>
          {currentUser ? (
            <SubMenu
              key="user"
              title={(
                <span>
                  <Icon type="user" />
                  {currentUser}
                </span>
              )}
              style={{ float: 'right' }}
            >
              <Item key="settings">
                <Link href="/settings" to="/settings">
                  <Icon type="settings" /> Settings
                </Link>
              </Item>
              <Item key="signout">
                <Link href="/signout" to="/signout">
                  <Icon type="Sign out" /> Sign Out
                </Link>
              </Item>
            </SubMenu>
          ) : (
            <SubMenu
              key="user"
              title={(
                <span>
                  <Icon type="user" />
                  Please Sign In
                </span>
                )}
              style={{ float: 'right' }}
            >
              <Item key="signin">
                <Link href="/signin" to="/signin">
                  <Icon type="user" /> Sign In
                </Link>
              </Item>
              <Item key="signout">
                <Link href="/signup" to="/signup">
                  <Icon type="select" /> Sign up
                </Link>
              </Item>
            </SubMenu>
          )}
        </Menu>
      </Header>
    )
  }
}

TopHeader.propTypes = { currentUser: PropTypes.string.isRequired }

const TopHeaderContainer = withTracker(() => ({ currentUser: Meteor.user() ? Meteor.user().username : '' }))(TopHeader)
export default withRouter(TopHeaderContainer)
