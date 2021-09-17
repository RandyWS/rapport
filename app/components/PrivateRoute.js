import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Loading from "./Loading";

function PrivateRoute(props) {
  const { component: Component, ...rest } = props;

  if (props.isLoading) {
    return <Loading />;
  }

  if (props.user.id) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }

  //redirect if there is no user
  return <Redirect to="/login" />;
}

export default connect(null)(PrivateRoute);
