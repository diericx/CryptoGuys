import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from "./styles.css";

class CreateGuy extends Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts

    // bind
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    // Call the contract method for creating a new guy
    this.contracts.GuyFactory.methods.createRandomGuy("test-name", this.props.accounts[0]).send()
  }

  render() {
    return (
      <div>
        <button onClick={this.onSubmit}>
          Create New Guy
        </button>
      </div>
    )
  }
}

CreateGuy.contextTypes = {
  drizzle: PropTypes.object
}

export default CreateGuy;