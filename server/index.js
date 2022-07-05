const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./schema");
const donations = [{ id: 1640805533963, username: "john_doe", amount: 250 }];

const app = express();
app.use(cors());

const addDonation = (input) => {
  const id = Date.now();
  return {
    id,
    ...input,
  };
};

const root = {
  donations: () => {
    return donations;
  },
  addDonation: ({ input }) => {
    const donation = addDonation(input);
    console.log(donation, 'index');
    donations.push(donation);
    return donation;
  },
  updateDonation: ({ input }) => {
    const index = donations.findIndex((donation) => donation.id === input.id);
    const donation = donations[index];

    if (index > -1) {
      donation.username = input.username;
      donation.amount = input.amount;
    }
    return donation;
  },
  deleteDonation: ({ id }) => {
  const index = donations.findIndex((donation) => donation.id === id);
  const donation = donations[index];
  if (index > -1) {
    donations.splice(index, 1);
  }
  return donation;
  },
};

app.use("/graphql", graphqlHTTP({ graphiql: true, schema, rootValue: root }));

app.listen(4000, () => console.log("server started on port 4000"));
