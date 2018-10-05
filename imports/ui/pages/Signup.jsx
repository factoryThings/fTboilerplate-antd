// signup component similar to login page (except loginWithPassword)
// instead createUser to insert a new user account document

// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Accounts } from 'meteor/accounts-base'

import Form from 'antd/lib/form'
import Icon from 'antd/lib/icon'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Alert from 'antd/lib/alert'

const { Item: FormItem } = Form
class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: '' }
  }

  handleSubmit = (e) => {
    const { form } = this.props
    e.preventDefault()
    form.validateFields((formErr, values) => {
      if (!formErr) {
        Accounts.createUser({ email: values.email, username: values.email, password: values.password }, (err) => {
          if (err) {
            this.setState({ error: err.reason })
          } else {
            this.setState({ error: '' })
          }
        })
      }
    })
  }

  render() {
    const { form: { getFieldDecorator } } = this.props
    const { error } = this.state
    return (
      <div>
        <h2>
          <img src="/ftlogo.png" alt="logo" /> Register your account
        </h2>
        <Form onSubmit={this.handleSubmit}>
          {/* Email input */}
          <FormItem label="Email">
            {getFieldDecorator('email', { rules: [{ required: true, message: 'Please input your username!' }] })(
              <Input prefix={<Icon type="user" />} placeholder="Username" />,
            )}
          </FormItem>
          {/* Password input */}
          <FormItem label="Password">
            {getFieldDecorator('password', { rules: [{ required: true, message: 'Please input your Password!' }] })(
              <Input prefix={<Icon type="lock" />} type="password" placeholder="Password" />,
            )}
          </FormItem>
          {/* Submit button */}
          <FormItem>
            <Button type="primary" htmlType="submit" icon="user-add">
              Sign Up
            </Button>
          </FormItem>
          <Link href="/signin" to="/signin">
            Already have an account?
          </Link>
        </Form>
        {error !== '' && <Alert message={error} type="error" showIcon closable closeText="Close" />}
      </div>
    )
  }
}

Signup.propTypes = { form: PropTypes.object.isRequired }

const WrappedSignup = Form.create()(Signup)
export default WrappedSignup
