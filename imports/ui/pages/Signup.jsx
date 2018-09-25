// signup component similar to login page (except loginWithPassword)
// instead createUser to insert a new user account document

// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Accounts } from "meteor/accounts-base"

import Form from "antd/lib/form"
import Icon from "antd/lib/icon"
import Input from "antd/lib/input"
import Button from "antd/lib/button"
import Alert from "antd/lib/alert"

const { Item: FormItem } = Form
class Signup extends React.Component {
  constructor (props) {
    super(props)
    this.state = { email: "", password: "", error: "" }
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
    Accounts.createUser({ email, username: email, password }, err => {
      if (err) {
        this.setState({
          error: err.reason,
        })
      } else {
        // browserHistory.push('/login');
      }
    })
  }

  render () {
    const {
      form: { getFieldDecorator },
    } = this.props
    const { error } = this.state
    return (
      <div>
        <h2 as="h2" textAlign="center">
          <img src="/ftlogo.png" alt="logo" /> Register your account
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
                <Button type="primary" htmlType="submit" icon="user-add">
              Sing up
                </Button>
              </FormItem>
                <Link href="/signin" to="/signin">
            Already have an account?
                </Link>
          </Form>
        {error !== "" && (
          <Alert
            message={alert}
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

Signup.propTypes = {
  form: PropTypes.object.isRequired,
}

const WrappedSignup = Form.create()(Signup)
export default WrappedSignup
