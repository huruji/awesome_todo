const list = [
  {
    name: 'User',
    struct: {
      _id: {type: String, unique: true},
      pwd: {type: String},
      salt: {type: String}
    }
  },
  {
    name: 'Todo',
    struct: {
      todo: {type: String},
      finish: {type: Boolean, default: false},
      username: {type: String}
    }
  },
  {
    name: 'Session',
    struct: {
      _id: {type: Number},
      username: {type: String}
    },
    type: 'simple'
  },
  {
    name: 'Capture',
    struct: {
      _id: {type: String, unique: true},
      content: {type: String},
      createAt: {type: Date, expires: 60, default: Date.now}
    },
    type: 'simple'
  }
]

module.exports = list
