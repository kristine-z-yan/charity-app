import { SyntheticEvent, useEffect, useState } from "react";
import {useQuery, useMutation, gql} from "@apollo/client";

import { GET_ALL_DONATIONS } from "./query/donations";
import { ADD_DONATION, } from "./mutation/donations";

import { Styled } from "./styled";

interface Donation {
  id: number;
  username: string;
  amount: number;
}

const App = () => {
    const [donations, setDonations] = useState<Donation[]>([]);
    // const [addDonation, { data, loading, error }] = useMutation(ADD_DONATION);
    const [ state, setState ] = useState({
        username: '',
        amount: 0
    })

    const { data, loading } = useQuery(GET_ALL_DONATIONS);

    const [addDonation] = useMutation(ADD_DONATION, {

    });

    useEffect(() => {
        if (!loading) setDonations(data.getAllDonations)
    })

    if (loading) return <h1>Loading...</h1>;

    const changeInputHandler = (name: string, value: string | number) => {
        return setState({...state, [name]: value})
    }

    const FormSubmitHandler = (e:SyntheticEvent) => {
        e.preventDefault()
        console.log(state)
        if (state.username !== "" && state.amount !== 0) {
            const username = state.username
            const amount = Number(state.amount)
            addDonation({
                variables: {
                    input: {
                       username,
                        amount
                    },
                }
            }).then(r => console.log(r))
        }
    }

  return (
      <div>
        <Styled.Form onSubmit={FormSubmitHandler}>
          <label>Username:</label>
          <input
              type="string"
              name="username"
              // value={state.username || ""}
              required
              onChange={(e) => changeInputHandler(e.target.name, e.target.value)}
          />
          <label>Amount:</label>
          <input
              type="number"
              name="amount"
              // value={state.amount || 0}
              required
              onChange={(e) => changeInputHandler(e.target.name, e.target.value)}
          />
          <button type="submit">Make a Donation</button>
        </Styled.Form>
        <Styled.TableContainer>
          <Styled.Table>
            <thead>
            <tr>
              <td>ID</td>
              <td>Username</td>
              <td>Amount</td>
              <td></td>
            </tr>
            </thead>
            <tbody>
            {donations.map((donation) => (
                <tr key={donation.id}>
                  <td>{donation.id}</td>
                  <td>{donation.username}</td>
                  <td>{donation.amount}</td>
                </tr>
            ))}
            </tbody>
          </Styled.Table>
        </Styled.TableContainer>
      </div>
  );
};

export default App;