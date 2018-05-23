import React, { Component } from 'react'
import PropTypes from 'prop-types'

class GetTokens extends Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts
    
    console.log(context);
    console.log("Initial tut token: ", this.props.TutorialToken)
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
    var data = this.props.TutorialToken.balanceOf[this.dataKey].value
    console.log(data)
    return (
      <div> {data} </div>
    )
  }
}

GetTokens.contextTypes = {
  drizzle: PropTypes.object
}

export default GetTokens;