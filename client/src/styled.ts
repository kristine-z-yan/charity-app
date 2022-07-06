import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 200px;
  border: 1px solid #000000;
  border-radius: 4px;
  margin: auto;
  margin-top: 20px;
  align-items: center;
  padding: 15px;
  justify-content: space-around;

  input {
    width: 90%;
    height: 30px;
  }

  button {
    width: 150px;
    height: 30px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    background-color: #22b217;
    color: white
  }
`;

const TableContainer = styled.div`
  width: 50%;
  height: 50vh;
  margin: auto;
  padding: 15px;
  margin-top: 20px;
  border: 1px solid #000;
`;

const Table = styled.table`
  width: 100%;
  thead {
    font-weight: bold;
  }
  tr {
    height: 30px;
  }
  td {
    width: 153px;
    border-bottom: 1px solid #000;
  }
`;

const Button = styled.button`
  margin: 5px 10px;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: grey;
  color: white;
`;

const SaveButton = styled(Button)`
  background-color: #22b217;
`;

const EditButton = styled(Button)`
  background-color: #ff6918;
`;

const DeleteButton = styled(Button)`
  background-color: red;
`

export const Styled = {
    Form,
    TableContainer,
    Table,
    Button,
    SaveButton,
    EditButton,
    DeleteButton
};
