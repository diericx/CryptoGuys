import React, { Component } from 'react'
import PropTypes from 'prop-types'

import GuyCard from "../guyCard/GuyCard";

import styles from "./styles.css";

class GetTokens extends Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts
    this.dataKey = this.contracts.TutorialToken.methods.balanceOf.cacheCall(this.props.account)
  }
  render() {
    // If the data isn't here yet, show loading
    if(!(this.dataKey in this.props.TutorialToken.balanceOf)) {
      return (
        <span>Loading...</span>
      )
    }

    // If the data is here, get it and display it
    // var data = this.props.TutorialToken.balanceOf[this.dataKey].value
    // Test Data
    var data = [{dna: "12341234"}, {dna: "581740328"}]

    return (
      <div className={styles.container}>
      {data.map(guy => {
        return <GuyCard data={guy} key={guy.dna} />
      })}
      </div>
    )
  }
}

GetTokens.contextTypes = {
  drizzle: PropTypes.object
}

export default GetTokens;