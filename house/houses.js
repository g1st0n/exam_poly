// Import the dependencies for testing
const { buildSchema } = require('graphql');

// GraphQL schema
const houseSchema = buildSchema(`
    type Query {
        house(id: Int!): House
        houses: [House]
    }

    type Mutation {
        addHouse(address: String!, surface: String!, roomsCount: Int!, cost: Int!): House
        updateHouse(id: Int!, address: String!, surface: String!, roomsCount: Int!, cost: Int!): House
        deleteHouse(id: Int!): String
    }

    type House {
        id: Int
        address: String
        surface: String
        roomsCount: Int
        cost: Int
    }
`);

module.exports = houseSchema;
