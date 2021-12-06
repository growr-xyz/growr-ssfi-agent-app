import { useQuery, gql } from "@apollo/client"
import Scrollbar from '../../components/ScoreBar'

// use your wallet id for address instead of 0xD4A420FD1b2a33514BFBaEBab738999E708D1FC6
const GET_WALLET = gql`
  query getWallet {
    wallet(address:"0xD4A420FD1b2a33514BFBaEBab738999E708D1FC6"){
      address,
      user{
        fullName,
        dateOfBirth,
        _id,
        goals{
          name,
          loan{amount, apr, duration, instalment, nextInstalmentDue, lastInstalmentDue, totalToRepay, totalInterest}
        }
      }}
  }
`

function dashboard () {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, loading, error } = useQuery(GET_WALLET)

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error :/</h1>

  const { name, loan } = data.wallet.user.goals[0]

  return (
    <div>
      <h1>Dashboard</h1>
      <hr />
      <Scrollbar progressIndex={0.4} />
      <h4>Goal name: {name}</h4>
      <h4>Loan amount: ${loan.amount}</h4>
      <h4>In progress, ${loan.totalToRepay} due</h4>
    </div> 
  )
}

export default dashboard
