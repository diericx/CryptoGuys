import React, { Component } from 'react'
import PropTypes from 'prop-types'

/*
 * Create component.
 */

class ContractDataWrapper extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts

    // Get the contract ABI
    const abi = this.contracts[this.props.contract].abi;

    // Fetch initial value from chain and return cache key for reactive updates.
    var methodArgs = this.props.methodArgs ? this.props.methodArgs : []
    this.dataKey = this.contracts[this.props.contract].methods[this.props.method].cacheCall(...methodArgs)

    // Iterate over abi for correct function.
    for (var i = 0; i < abi.length; i++) {
      if (abi[i].name === this.props.method) {
          this.fnABI = abi[i]

          break
      }
    }
  }

  GetContractData() {
    console.log("data: ", this.props.contracts[this.props.contract][this.props.method][this.dataKey])
    var data = this.props.contracts[this.props.contract][this.props.method][this.dataKey].value
    var dataType = "unknown"
    // Optionally convert to UTF8
    if (this.props.toUtf8) {
      data = this.context.drizzle.web3.utils.hexToUtf8(data)
    }

    // Optionally convert to Ascii
    if (this.props.toAscii) {
      data = this.context.drizzle.web3.utils.hexToAscii(data)
    }

    if (typeof data === 'array') {
      dataType = "array"
    } else if (typeof data === 'object') {
      dataType = "object"
    }

    return {
      initialized: this.props.contracts[this.props.contract].initialized,
      fetching: (this.dataKey in this.props.contracts[this.props.contract][this.props.method]),
      synced: this.props.contracts[this.props.contract].synced,
      data,
      dataType
    }
  }
}

export default ContractDataWrapper;