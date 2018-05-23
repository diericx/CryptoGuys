import GetTokens from './GetTokens'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    TutorialToken: state.contracts.TutorialToken,
  }
}

const GetTokensContainer = drizzleConnect(GetTokens, mapStateToProps);

export default GetTokensContainer
