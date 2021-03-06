import React, { Component } from 'react';
import { getFragment } from 'meteor/vulcan:lib';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const withCurrentUser = component => {

  return graphql(
    gql`
      query getCurrentUser {
        currentUser {
              _id
    username
    fullName
    createdAt
    isAdmin
    displayName
    email
    emailHash
    slug
    groups
    services
    avatarUrl
    billingAddress
    deliveryAddress
    country
    pageUrl
    isSeller
    isBuyer
        }
      }
    `, {
      alias: 'withCurrentUser',

      props(props) {
        const {data: {loading, currentUser}} = props;
        return {
          currentUserLoading: loading,
          currentUser,
        };
      },
    }
  )(component);
}

export default withCurrentUser;
