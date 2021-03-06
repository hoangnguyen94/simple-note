const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Note {
  _id: ID!
  title: String!
  text: String!
  created: String!
  createdBy: String!
  modified: String!
  sharedUsers: [String]
}

type User {
  _id: ID!
  email: String!
  password: String
  sharedNotes: [String]
}

type Version {
  _id: ID!
  title: String!
  text: String!
  created: String!
  noteId: String!
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
  email: String!
}

input NoteInput {
  _id: String
  title: String
  text: String
  createdBy: String
  sharedUsers: [String]
}

input UserInput {
  email: String!
  password: String!
}


type RootQuery {
    fetchUsers(query: String!, userId: String!): [String]
    versions(noteId: String!): [Version!]!
    notes(userId: String!): [Note!]!
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    shareNote(noteInput: NoteInput): Note
    createNote(noteInput: NoteInput): Note
    updateNote(noteInput: NoteInput): Note
    deleteNote(_id: String!, createdBy: String!): String!
    createUser(userInput: UserInput): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);