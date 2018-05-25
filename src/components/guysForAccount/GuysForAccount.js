import React, { Component } from 'react'
import PropTypes from 'prop-types'

import GuyCard from "../guyCard/GuyCard";

import styles from "./styles.css";

class GuysForAccount extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      guyDataKeys: []
    }
    this.contracts = context.drizzle.contracts
    console.log(this.props)

    // Get the guys for this account
    this.contracts.GuyFactory.methods.guysFor(this.props.account).call().then((data) => {
      console.log(data);
      // Cache call each guy for it's data and save the data key
      var guyDataKeys = data.map(guyId => {
        return this.contracts.GuyFactory.methods.getGuy.cacheCall(guyId)
      })
      // Update state
      this.setState({
        guyDataKeys
      })
    })
  }

  render() {
    // If the data is here, get it and display it
    let { guyDataKeys } = this.state;// this.props.GuyFactory.guysFor[this.dataKey].value

    // If the data isn't here yet, show loading
    if(!guyDataKeys || guyDataKeys.length == 0) {
      return (
        <span>You don't have any guys :(</span>
      )
    }

    let key = 0;
    return (
      <div className={styles.container}>
      {guyDataKeys.map(guyDataKey => {
        key ++;
        if(!(guyDataKey in this.props.GuyFactory.getGuy)) {
          return (
            <span>Loading...</span>
          )
        }
        let guy = this.props.GuyFactory.getGuy[guyDataKey].value
        return <GuyCard data={guy} key={key} />
      })}
      </div>
    )
  }
}

GuysForAccount.contextTypes = {
  drizzle: PropTypes.object
}

export default GuysForAccount;