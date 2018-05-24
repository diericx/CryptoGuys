import GuysForAccount from './GuysForAccount'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    GuyFactory: state.contracts.GuyFactory,
  }
}

const GuysForAccountContainer = drizzleConnect(GuysForAccount, mapStateToProps);

export default GuysForAccountContainer
