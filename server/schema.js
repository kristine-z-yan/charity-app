const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Donation {
        id: Float,
        username: String,
        amount: Int,
    }
    input DonationInput {
        id: Float,
        username: String,
        amount: Int,
    }
    type Query {
        getAllDonations: [Donation], 
    }
    type Mutation {
        addDonation(input: DonationInput): Donation
        updateDonation(input: DonationInput): Donation
        deleteDonation(id: Float): Donation
    }
`);

module.exports = schema;