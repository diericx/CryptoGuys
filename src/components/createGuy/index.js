import CreateGuy from './CreateGuy'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
  }
}

const CreateGuyContainer = drizzleConnect(CreateGuy, mapStateToProps);

export default CreateGuyContainer
