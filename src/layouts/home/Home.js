import React, { Component } from 'react'
import { AccountData, ContractForm, ContractData } from 'drizzle-react-components'

// Components
import GuysForAccount from "../../components/guysForAccount/GuysForAccountContainer";
import CreateGuy from "../../components/createGuy";

// Assets
import logo from '../../logo.png'

class Home extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <img src={logo} alt="drizzle-logo" />
            <h1>Crypto Guys</h1>
            <p>Examples of how to get started with Drizzle in various situations.</p>

            <br/><br/>
          </div>
        
          <div className="pure-u-1-1">
            <h2>Active Account</h2>
            <AccountData accountIndex="0" units="ether" precision="3" />

            <br/><br/>
          </div>

          {/* <div className="pure-u-1-1">
            <h2>SimpleStorage</h2>
            <p>This shows a simple ContractData component with no arguments, along with a form to set its value.</p>
            <p><strong>Stored Value</strong>: <ContractData contract="SimpleStorage" method="storedData" /></p>
            <ContractForm contract="SimpleStorage" method="set" />

            <br/><br/>
          </div> */}

          <div className="pure-u-1-1">
            <h2>Your Guys</h2>
            <GuysForAccount account={this.props.accounts[0]} />
            {/* <TokenCard contract="TutorialToken" method="balanceOf" methodArgs={[this.props.accounts[0]]}/> */}
            {/* {this.props.drizzleStatus.initialized ? this.props.SimpleStorage.storedData.data() : 'Loading...'} */}
          </div>

          <div className="pure-u-1-1">
            <h2>New Guy</h2>
            <CreateGuy />
            {/* <TokenCard contract="TutorialToken" method="balanceOf" methodArgs={[this.props.accounts[0]]}/> */}
            {/* {this.props.drizzleStatus.initialized ? this.props.SimpleStorage.storedData.data() : 'Loading...'} */}
          </div>

          {/* <div className="pure-u-1-1">
            <h2>TutorialToken</h2>
            <p>Here we have a form with custom, friendly labels. Also note the token symbol will not display a loading indicator. We've suppressed it with the <code>hideIndicator</code> prop because we know this variable is constant.</p>
            <h3>Send Tokens</h3>
            <ContractForm contract="TutorialToken" method="transfer" labels={['To Address', 'Amount to Send']} />

            <br/><br/>
          </div> */}

          {/* <div className="pure-u-1-1">
            <h2>ComplexStorage</h2>
            <p>Finally this contract shows data types with additional considerations. Note in the code the strings below are converted from bytes to UTF-8 strings and the device data struct is iterated as a list.</p>
            <p><strong>String 1</strong>: <ContractData contract="ComplexStorage" method="string1" toUtf8 /></p>
            <p><strong>String 2</strong>: <ContractData contract="ComplexStorage" method="string2" toUtf8 /></p>
            <strong>Single Device Data</strong>: <ContractData contract="ComplexStorage" method="singleDD" />

            <br/><br/>
          </div> */}
        </div>
      </main>
    )
  }
}

export default Home
