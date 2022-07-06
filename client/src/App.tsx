import { SyntheticEvent, useEffect, useState } from "react";
import {useQuery, useMutation } from "@apollo/client";

import { GET_ALL_DONATIONS } from "./GraphQL/query/donations";
import {ADD_DONATION, DELETE_DONATION, UPDATE_DONATION,} from "./GraphQL/mutation/donations";

import { Styled } from "./styled";

interface Donation {
  id: number;
  username: string;
  amount: string;
}

const App = () => {
    const [donations, setDonations] = useState<Donation[]>([]);
   const [username, setUsername] = useState('');
   const [editedUsername, setEditedUsername] = useState('');
   const [amount, setAmount] = useState(0);
   const [editedAmount, setEditedAmount] = useState(0);
   const [ editItem, setEditItem] = useState({
       isEdit: false,
       id: 0
   });

    const { data, loading } = useQuery(GET_ALL_DONATIONS);

    const refetchOption = {
        refetchQueries: [
            {query: GET_ALL_DONATIONS},
            'GetAllDonations'
        ],
    }

    const [addDonation, { error }] = useMutation(ADD_DONATION, refetchOption);

    const [deleteDonation] = useMutation(DELETE_DONATION, refetchOption)

    const [updateDonation] = useMutation(UPDATE_DONATION, refetchOption)

    useEffect(() => {
        if (!loading) setDonations(data.getAllDonations)
    }, [data, loading])

    if (loading) return <h1>Loading...</h1>;

    const FormSubmitHandler = (e:SyntheticEvent) => {
        e.preventDefault()
        if (username !== "" && amount !== 0) {
            addDonation({
                variables: {
                    username,
                    amount
                }
            }).then(r => {
                setAmount(0);
                setUsername("")
            })
        }
        if (error) console.log(error, 'error')
    }

    const DeleteHandler = (id: number) => {
        deleteDonation({
            variables: {
                id
            }
        })
    }

    const EditHandler = () => {
        if (editedUsername !== "" && editedAmount !== 0) {
            updateDonation({
                variables: {
                    id: editItem.id,
                    username: editedUsername,
                    amount: editedAmount
                }
            }).then(r => {
                setEditItem({
                    isEdit: false,
                    id: 0
                })
                setEditedAmount(0);
                setEditedUsername("")
            })
        }
    }

    const onCancel = () => {
        setEditItem({
            isEdit: false,
            id: 0
        })
    }

  return (
      <div>
        <Styled.Form onSubmit={FormSubmitHandler}>
          <label>Username:</label>
          <input
              type="string"
              name="username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
          />
          <label>Amount:</label>
          <input
              type="string"
              name="amount"
              value={amount}
              required
              onChange={(e) => setAmount(Number(e.target.value))}
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
              <td>Actions</td>
            </tr>
            </thead>
            <tbody>
            {donations.map((donation) => (
                <tr key={donation.id}>
                  <td>{donation.id}</td>
                  <td>
                      { editItem.isEdit && editItem.id === donation.id ? <input defaultValue={donation.username} onChange={(e) => setEditedUsername(e.target.value)}/> : donation.username}
                  </td>
                  <td>
                      { editItem.isEdit && editItem.id === donation.id ? <input defaultValue={donation.amount} onChange={(e) => setEditedAmount(Number(e.target.value))}/> : donation.amount}
                  </td>
                  <td>
                      { editItem.isEdit && editItem.id === donation.id ?
                          <>
                              <Styled.SaveButton type='button' onClick={EditHandler}>Save</Styled.SaveButton>
                              <Styled.Button type='button' onClick={onCancel}>Cancel</Styled.Button>
                          </>
                          :
                          <>
                              <Styled.EditButton type='button' onClick={(e) => setEditItem({isEdit: true, id: donation.id})}>Edit</Styled.EditButton>
                              <Styled.DeleteButton type='button' onClick={(e) => DeleteHandler(donation.id)}>Delete</Styled.DeleteButton>
                          </>
                       }
                  </td>
                </tr>
            ))}
            </tbody>
          </Styled.Table>
        </Styled.TableContainer>
      </div>
  );
};

export default App;