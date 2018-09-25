import React, { Component } from "react"
import PropTypes from "prop-types"
import { Meteor } from "meteor/meteor"
import { withTracker } from "meteor/react-meteor-data"
import { Link, withRouter } from "react-router-dom"

import Menu from "antd/lib/menu"
import Icon from "antd/lib/icon"

const { Item } = Menu

class TopHeader extends Component {
  state = {
    current: "mail",
  }
  handleClick = e => {
    console.log("click ", e)
    this.setState({
      current: e.key,
    })
  }
  render () {
    const { currentUser } = this.props
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[ this.state.current ]}
        mode="horizontal"
      >
        <Item key="home">
          <span>
            <Icon type="home" />
              <Link href="/signin" to="/signin">
              Home
              </Link>
          </span>
        </Item>
          <Item key="example">
            <span>
              <Icon type="api" />
                <Link href="/example" to="/example">
              Example
                </Link>
            </span>
          </Item>
            <Item key="signin">
              <span>
                <Icon type="user" />
                  <Link href="/signin" to="/signin">
              Sign in
                  </Link>
              </span>
            </Item>
              <Item key="signup">
                <span>
                  <Icon type="select" />
                    <Link href="/signup" to="/signup">
              Sign up
                    </Link>
                </span>
              </Item>
                <Item key="singup">
                  <span>
                    <Icon type="poweroff" />
                      <Link href="/signout" to="/signout">
              Sign out
                      </Link>
                  </span>
                </Item>

                  <Item key="notpage">
                    <span>
                      <Icon type="exclamation-circle" />
                        <Link href="/nopage" to="/nopage">
              Page not found
                        </Link>
                    </span>
                  </Item>
      </Menu>
    )
  }
}

TopHeader.propTypes = {
  currentUser: PropTypes.string.isRequired,
}

const TopHeaderContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : "",
}))(TopHeader)
export default withRouter(TopHeaderContainer)
