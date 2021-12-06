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

const data = {
    "wallet": {
      "address": "0xD4A420FD1b2a33514BFBaEBab738999E708D1FC6",
      "balance": "1200.00",
      "user": {
        "fullName": "Camila Busd.01",
        "dateOfBirth": "2021-11-17",
        "_id": "61ab9dbbd52730d9c0c77f63",
        "goals": [
          {
            "name": "Car Purchase",
            "duration": "12M",
            "availableAmount": "0.00",
            "amountToBorrow": "1500.00",
            "isAchieved": false,
            "loan": {
              "amount": "1200.00",
              "apr": "12.34%",
              "duration": "9",
              "instalment": "12.22%",
              "nextInstalmentDue": "116.96",
              "lastInstalmentDue": "1670630400000",
              "totalToRepay": "1200.00", //"1334.22"
              "totalInterest": "134.22"
            }
          }
        ]
      }
    }
}

function dashboard () {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  //const { data, loading, error } = useQuery(GET_WALLET) // Temp, only with working BE

  //if (loading) return <h1>Loading...</h1> // Temp, only with working BE
  //if (error) return <h1>Error :/</h1> // Temp, only with working BE

  const { name, isAchieved, loan } = data.wallet.user.goals[0]

  return (
    <div>
      <h1>Dashboard</h1>
      <hr />
      <Scrollbar progressIndex={0.4} />
      <h4>Goal name: {name}</h4>
      <h4>Loan amount: ${loan.amount}</h4>
      <h4>{isAchieved?"Funded":"In progress"}, ${loan.totalToRepay} due</h4>

    </div> 
  )
}

export default dashboard
