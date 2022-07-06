const graphql = require("graphql");
const {GraphQLFloat} = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const DonationType = new GraphQLObjectType({
  name: "Donation",
  fields: () => ({
    id: { type: GraphQLFloat },
    username: { type: GraphQLString },
    amount: { type: GraphQLInt}
  }),
});

module.exports = DonationType;