import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import ContractDataWrapper from '../contractDataWrapper/ContractDataWrapper';
import PropTypes from 'prop-types'

class TokenCard extends ContractDataWrapper {
  // constructor(props, context) {
  //   super(props, context);
  // }

  render() {
    let {
      initialized,
      fetching,
      synced,
      data,
      dataType
    } = super.GetContractData();

    return (
      <div> test! </div>
    )
  }
}

TokenCard.contextTypes = {
  drizzle: PropTypes.object
}

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

export default drizzleConnect(TokenCard, mapStateToProps)