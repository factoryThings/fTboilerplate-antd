// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React from "react"
import PropTypes from "prop-types"
import { Link, Redirect } from "react-router-dom"
import { Meteor } from "meteor/meteor"

// Antd imports
import Form from "antd/lib/form"
import Icon from "antd/lib/icon"
import Input from "antd/lib/input"
import Button from "antd/lib/button"
import Alert from "antd/lib/alert"

const { Item: FormItem } = Form

class Signin extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReferer: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  // Using a ref is accessing the DOM directly and not preferred
  // The React way to get the value from an input is using onChange
  handleChange (e, { name, value }) {
    this.setState({ [name]: value })
  }
  handleSubmit (e) {
    e.preventDefault()
    const { email, password } = this.state
    Meteor.loginWithPassword(email, password, err => {
      if (err) {
        this.setState({
          error: err.reason,
        })
      } else {
        this.setState({
          error: "",
          redirectToReferer: true,
        })
      }
    })
  }

  render () {
    // const error = this.state.error;
    const {
      form: { getFieldDecorator },
      location: { state },
    } = this.props
    const { error } = this.state
    const { from } = state || { from: { pathname: "/" } }

    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <h2>
          <img src="/ftlogo.png" alt="logo" /> Log-in to your account
        </h2>
          <Form onSubmit={this.handleSubmit}>
            {/* Email input */}
              <FormItem label="Email">
                {getFieldDecorator("email", {
              rules: [
                { required: true, message: "Please input your username!" },
              ],
            })(<Input prefix={<Icon type="user" />} placeholder="Username" />)}
              </FormItem>

            {/* Password input */}
              <FormItem label="Password">
                {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" },
              ],
            })(
              <Input
                prefix={<Icon type="lock" />}
                type="password"
                placeholder="Password"
              />
            )}
              </FormItem>

            {/* Submit button */}
              <FormItem>
                <Button type="primary" htmlType="submit" icon="login">
                Sign In
                </Button>
              </FormItem>

                <Link href="/signup" to="/signup">
                Click here to Register
                </Link>
          </Form>
        {error !== "" && (
          <Alert
            message={error}
            type="error"
            showIcon
            closable
            closeText="Close"
          />
        )}
      </div>
    )
  }
}

Signin.propTypes = {
  location: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
}

const WrappedSignin = Form.create()(Signin)
export default WrappedSignin
