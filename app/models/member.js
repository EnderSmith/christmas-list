function Member() {
  return { 
    memberId: String,
    name: String,
    email: String,
    parent: Boolean,
    deleted: Boolean,
    list: Array
  }
}

module.exports = Member;