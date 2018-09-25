import React from "react"
import { Meteor } from "meteor/meteor"
import { Redirect } from "react-router-dom"

const Signout = () => {
  Meteor.logout()
  return <Redirect to="/signin" />
}
export default Signout
