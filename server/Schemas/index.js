const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;
const donations = [{ id: 1, username: "john_doe", amount: 250 }];

const DonationType = require("./TypeDefs/DonationType");
const {GraphQLFloat} = require("graphql");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllDonations: {
      type: new GraphQLList(DonationType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return donations;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addDonation: {
      type: DonationType,
      args: {
        username: { type: GraphQLString },
        amount: { type: GraphQLInt }
      },
      resolve(parent, args) {
        let id = Date.now();
        const donation = {
          id: id,
          username: args.username,
          amount: args.amount
        }
        donations.push(donation);
        return donation;
      },
    },
    deleteDonation: {
      type: DonationType,
      args: {
        id: { type: GraphQLFloat },
      },
      resolve(parent, args) {
        const index = donations.findIndex((donation) => donation.id === args.id);
        const donation = donations[index];
        if (index > -1) {
          donations.splice(index, 1);
        }
        return donation;
      },
    },
    updateDonation: {
      type: DonationType,
      args: {
        id: { type: GraphQLFloat},
        username: { type: GraphQLString },
        amount: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const index = donations.findIndex((donation) => donation.id === args.id);
        const donation = donations[index];
        if (index > -1) {
          donations[index].username = args.username;
          donations[index].amount = args.amount;
        }
        return donation;
      }
    }
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });