/* eslint-disable */

require('dotenv').config()
const chai = require('chai')
chai.use(require('chai-as-promised'))
const { expect } = chai

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const tokenHelper = require('../middlewares/token-helper')
const { User, Group } = require('../db/models')
const logic = require('./')

const {
  env: { DB_URL, JWT_SECRET }
} = process

const mongooseOpts = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

tokenHelper.jwtSecret = JWT_SECRET

describe('LOGIC', () => {
  before(async () => await mongoose.connect(DB_URL, mongooseOpts))

  const fakeId = '5e3bd4ad907d2934f94a232c'

  describe('* USER * registerUser', () => {
    const user = {
      nickname: `nickname`,
      email: `email-${Math.random()}@mail.com`,
      password: `password-${Math.random()}`
    }

    afterEach(async () => await User.deleteMany())

    it('OK - should register an user', async () => {
      let userId
      const { nickname, email, password } = user

      try {
        const newUser = await logic.registerUser({ nickname, email, password })
        expect(newUser.id).to.be.a('string')
        userId = newUser.id
        expect(newUser.nickname).to.equal(nickname)
        expect(newUser.email).to.equal(email)
        const match = await bcrypt.compare(password, newUser.password)
        expect(match).to.be.true
      } catch (error) {
        console.log(error.message)
        expect(error).to.be.an('undefined')
      }

      const newUser = await User.findById(userId)
      expect(newUser).to.be.a('object')
      expect(newUser.id).to.be.a('string')
      expect(newUser.nickname).to.equal(nickname)
      expect(newUser.email).to.equal(email)
      const match = await bcrypt.compare(password, newUser.password)
      expect(match).to.be.true
    })

    it('NOK - should thrown an error on non valid email', async () => {
      await expect(
        logic.registerUser({ ...user, email: 'failEmail@' })
      ).to.be.rejectedWith(TypeError, 'non valid email')
    })

    it('NOK - should thrown an error on email = ""', async () => {
      await expect(
        logic.registerUser({ ...user, email: '' })
      ).to.be.rejectedWith(TypeError, 'non valid email')
    })

    it('NOK - should thrown an error on email = []', async () => {
      await expect(logic.registerUser({ ...user, email: [] })).to.be.rejected
    })

    it('NOK - should thrown an error on email = {}', async () => {
      await expect(logic.registerUser({ ...user, email: {} })).to.be.rejected
    })

    it('NOK - should thrown an error on nickname bellow min length', async () => {
      await expect(
        logic.registerUser({ ...user, nickname: 'hi' })
      ).to.be.rejectedWith(Error, 'non valid nickname length')
    })

    it('NOK - should thrown an error on nickname over max length', async () => {
      await expect(
        logic.registerUser({
          ...user,
          nickname: 'thisisanicknamereallyreallylong'
        })
      ).to.be.rejectedWith(Error, 'non valid nickname length')
    })

    it('NOK - should thrown an error on nickname = ""', async () => {
      await expect(
        logic.registerUser({ ...user, nickname: '' })
      ).to.be.rejectedWith(Error, 'non valid nickname length')
    })

    it('NOK - should thrown an error on nickname = []', async () => {
      await expect(logic.registerUser({ ...user, nickname: [] })).to.be.rejected
    })

    it('NOK - should thrown an error on nickname = {}', async () => {
      await expect(logic.registerUser({ ...user, nickname: {} })).to.be.rejected
    })

    it('NOK - should thrown an error if nickname not contains chars alphanumeric', async () => {
      await expect(
        logic.registerUser({ ...user, nickname: 'this is my fail nickname' })
      ).to.be.rejectedWith(
        Error,
        'non valid nickname chars. Only letter and/or numbers'
      )
    })

    it('NOK - should thrown an error on password bellow min length', async () => {
      await expect(
        logic.registerUser({ ...user, password: 'admin' })
      ).to.be.rejectedWith(Error, 'password has to be 6 chars length minimum')
    })

    it('NOK - should thrown an error on passwor = ""', async () => {
      await expect(
        logic.registerUser({ ...user, password: '' })
      ).to.be.rejectedWith(Error, 'password has to be 6 chars length minimum')
    })

    it('NOK - should throw an error if the user already exists', async () => {
      await User.create(user)
      await expect(logic.registerUser(user)).to.be.rejectedWith(
        Error,
        `user with email ${user.email} already exists`
      )
    })
  })

  describe('* USER * authenticateUser', () => {
    const user = {
      nickname: `nickname`,
      email: `email-${Math.random()}@mail.com`,
      password: `password-${Math.random()}`
    }

    beforeEach(async () => {
      const newUser = await User.create({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      })
      user.id = newUser._id
    })

    afterEach(async () => {
      await User.deleteMany()
    })

    it('OK - should login sucessfully', async () => {
      try {
        const token = await logic.authenticateUser(user.email, user.password)
        const userId = tokenHelper.verifyToken(token)

        expect(userId).to.be.a('string')
        expect(userId).to.equal(user.id.toJSON())
      } catch (error) {
        console.log(error.message)
        expect(error).to.be.an('undefined')
      }
    })

    it('NOK - should thrown an error on not found user', async () => {
      const fakeEmail = 'email@email.com'
      await expect(
        logic.authenticateUser('email@email.com', 'doesnt matters')
      ).to.be.rejectedWith(Error, `user with email ${fakeEmail} not found`)
    })

    it('NOK - should thrown an error on wrong password', async () => {
      await expect(
        logic.authenticateUser(user.email, 'wrongpass')
      ).to.be.rejectedWith(Error, 'wrong credentials')
    })

    it('NOK - should thrown an error on non valid email', async () => {
      await expect(
        logic.authenticateUser('failEmail@', '123456')
      ).to.be.rejectedWith(TypeError, 'non valid email')
    })

    it('NOK - should thrown an error on email = ""', async () => {
      await expect(logic.authenticateUser('', '123456')).to.be.rejectedWith(
        TypeError,
        'non valid email'
      )
    })

    it('NOK - should thrown an error on email = []', async () => {
      await expect(logic.authenticateUser([], '123456')).to.be.rejected
    })

    it('NOK - should thrown an error on email = {}', async () => {
      await expect(logic.authenticateUser({}, '123456')).to.be.rejected
    })

    it('NOK - should thrown an error on password bellow min length', async () => {
      await expect(
        logic.authenticateUser('email@email.com', '12345')
      ).to.be.rejectedWith(Error, 'password has to be 6 chars length minimum')
    })

    it('NOK - should thrown an error on password = ""', async () => {
      await expect(
        logic.authenticateUser('email@email.com', '')
      ).to.be.rejectedWith(Error, 'password has to be 6 chars length minimum')
    })

    it('NOK - should thrown an error on password = []', async () => {
      await expect(logic.authenticateUser('email@email.com', [])).to.be.rejected
    })

    it('NOK - should thrown an error on password = {}', async () => {
      await expect(logic.authenticateUser('email@email.com', {})).to.be.rejected
    })
  })

  describe('* USER * createGroup', () => {
    const user = {
      nickname: `nickname`,
      email: `email-${Math.random()}@mail.com`,
      password: `password-${Math.random()}`
    }

    const group = {
      name: `Group Name - ${Math.random()}`,
      description: `lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum`
    }

    beforeEach(async () => {
      const newUser = await User.create({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      })
      user.id = newUser._id.toJSON()
    })

    afterEach(async () => {
      await User.deleteMany()
      await Group.deleteMany()
    })

    it('OK - should succeed creating a group', async () => {
      try {
        const newGroup = await logic.createGroup(
          user.id,
          group.name,
          group.description
        )
        group.id = newGroup._id.toJSON()

        // check the response - not necessary
        expect(newGroup).to.have.property('_id')
        expect(newGroup).to.have.property('name', group.name)
        expect(newGroup).to.have.property('description', group.description)
        expect(newGroup).to.have.property('members')
        expect(newGroup.members.length).to.equal(1)
        expect(newGroup.members[0].user.toJSON()).to.equal(user.id)
        expect(newGroup.members[0].isAdmin).to.be.true

        // the real test => check if really exists the group I've just created
        const searchNewGroup = await Group.findById(newGroup._id).lean()
        expect(searchNewGroup).to.have.property('_id')
        expect(searchNewGroup).to.have.property('name', group.name)
        expect(searchNewGroup).to.have.property(
          'description',
          group.description
        )
        expect(searchNewGroup).to.have.property('members')
        expect(searchNewGroup.members.length).to.equal(1)
        expect(searchNewGroup.members[0].user.toJSON()).to.equal(user.id)
        expect(searchNewGroup.members[0].isAdmin).to.be.true
      } catch (error) {
        console.log(error.message)
        expect(error).to.be.an('undefined')
      }
    })

    it('OK - should succeed updating the user when creating the group', async () => {
      try {
        const newGroup = await logic.createGroup(
          user.id,
          group.name,
          group.description
        )
        group.id = newGroup._id.toJSON()

        const userGroupAdmin = await User.findById(user.id)
        expect(userGroupAdmin).to.have.property('groups')

        expect(userGroupAdmin.groups.length).to.equal(1)
        expect(userGroupAdmin.groups[0].toJSON()).to.equal(group.id)
      } catch (error) {
        console.log(error.message)
        expect(error).to.be.an('undefined')
      }
    })

    it('NOK - should thrown an error on non exists user', async () => {
      await expect(
        logic.createGroup(fakeId, group.name, group.description)
      ).to.be.rejectedWith(Error, 'user_not_found')
    })

    it('NOK - should thrown an error on userId = ""', async () => {
      await expect(
        logic.createGroup('', group.name, group.description)
      ).to.be.rejectedWith(Error, 'non valid userId')
    })

    it('NOK - should thrown an error on userId = []', async () => {
      await expect(logic.createGroup([], group.name, group.description)).to.be
        .rejected
    })

    it('NOK - should thrown an error on userId = {}', async () => {
      await expect(logic.createGroup({}, group.name, group.description)).to.be
        .rejected
    })

    it('NOK - should thrown an error on name = ""', async () => {
      await expect(
        logic.createGroup(user.id, '', group.description)
      ).to.be.rejectedWith(Error, 'non valid group name')
    })

    it('NOK - should thrown an error on name = []', async () => {
      await expect(logic.createGroup(user.id, [], group.description)).to.be
        .rejected
    })

    it('NOK - should thrown an error on name = {}', async () => {
      await expect(logic.createGroup(user.id, {}, group.description)).to.be
        .rejected
    })

    it('NOK - should thrown an error on description = ""', async () => {
      await expect(
        logic.createGroup(user.id, group.name, '')
      ).to.be.rejectedWith(Error, 'non valid group description')
    })

    it('NOK - should thrown an error on description = []', async () => {
      await expect(logic.createGroup(user.id, group.name, [])).to.be.rejected
    })

    it('NOK - should thrown an error on description = {}', async () => {
      await expect(logic.createGroup(user.id, group.name, {})).to.be.rejected
    })
  })

  describe('* USER * deleteGroup', () => {
    const user = {
      nickname: `nickname`,
      email: `email-${Math.random()}@mail.com`,
      password: `password-${Math.random()}`
    }

    const notAdminUser = {
      nickname: `nickname-NOADMIN`,
      email: `no-admin-email-${Math.random()}@mail.com`,
      password: `noadmin-password-${Math.random()}`
    }

    const group = {
      name: `Group Name - ${Math.random()}`,
      description: `lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum`
    }

    beforeEach(async () => {
      // admin user
      const newUser = await User.create({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      })
      user.id = newUser._id.toJSON()

      // not-admin user
      const newNotAdminUser = await User.create({
        ...notAdminUser,
        password: await bcrypt.hash(notAdminUser.password, 10)
      })
      notAdminUser.id = newNotAdminUser._id.toJSON()

      const member = { user: user.id, isAdmin: true }
      const newGroup = await Group.create({
        ...group,
        members: [member]
      })
      group.id = newGroup._id.toJSON()
      group.members = [member]

      user.groups = [group.id]
    })

    afterEach(async () => {
      await User.deleteMany()
      await Group.deleteMany()
    })

    it('OK - should succeed on deleting a group', async () => {
      try {
        const groupDeleted = await logic.deleteGroup(user.id, group.id)

        expect(groupDeleted).to.have.property('_id')
        expect(groupDeleted).to.have.property('name', group.name)
        expect(groupDeleted).to.have.property('description', group.description)
        expect(groupDeleted).to.have.property('members')
        expect(groupDeleted.members.length).to.equal(1)
        expect(groupDeleted.members[0].user.toJSON()).to.equal(user.id)
        expect(groupDeleted.members[0].isAdmin).to.be.true
      } catch (error) {
        console.log(error.message)
        expect(error).to.be.an('undefined')
      }
    })

    it('OK - should succeed and remove the group ID from the user', async () => {
      try {
        expect(user.groups.length).to.equal(1)
        expect(user.groups[0]).to.equal(group.id)

        expect(group.members.length).to.equal(1)
        expect(group.members[0].user).to.equal(user.id)
        expect(group.members[0].isAdmin).to.be.true

        await logic.deleteGroup(user.id, group.id)

        const userWithoutGroup = await User.findById(user.id)

        expect(userWithoutGroup).to.have.property('_id')
        expect(userWithoutGroup._id.toJSON()).to.equal(user.id)
        expect(userWithoutGroup).to.have.property('nickname', user.nickname)
        expect(userWithoutGroup).to.have.property('email', user.email)
        expect(userWithoutGroup).to.have.property('groups')
      } catch (error) {
        console.log(error.message)
        expect(error).to.be.an('undefined')
      }
    })

    it("NOK - can't delete the group if you are not the admin", async () => {
      await expect(
        logic.deleteGroup(notAdminUser.id, group.id)
      ).to.be.rejectedWith(
        Error,
        "The user doesn't have privileges to delete the group"
      )
    })

    it('NOK - should thrown an error on non valid user id', async () => {
      await expect(logic.deleteGroup(user.id, fakeId)).to.be.rejected
    })

    it('NOK - should thrown an error on userId = []', async () => {
      await expect(logic.deleteGroup(user.id, [])).to.be.rejected
    })

    it('NOK - should thrown an error on userId = {}', async () => {
      await expect(logic.deleteGroup(user.id, {})).to.be.rejected
    })

    it('NOK - should thrown an error on non valid group id', async () => {
      await expect(logic.deleteGroup(user.id, fakeId)).to.be.rejected
    })

    it('NOK - should thrown an error on groupId = []', async () => {
      await expect(logic.deleteGroup(user.id, [])).to.be.rejected
    })

    it('NOK - should thrown an error on groupId = {}', async () => {
      await expect(logic.deleteGroup(user.id, {})).to.be.rejected
    })
  })

  describe('* USER * addUserToGroup', () => {
    const user = {
      nickname: `nickname`,
      email: `email-${Math.random()}@mail.com`,
      password: `password-${Math.random()}`
    }

    const group = {
      name: `Group Name - ${Math.random()}`,
      description: `lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum`
    }

    beforeEach(async () => {
      // admin user
      const newUser = await User.create({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      })
      user.id = newUser._id.toJSON()

      const member = { user: user.id, isAdmin: true }
      const newGroup = await Group.create({
        ...group,
        members: [member]
      })
      group.id = newGroup._id.toJSON()
      group.members = [member]

      user.groups = [group.id]
    })

    afterEach(async () => {
      await User.deleteMany()
      await Group.deleteMany()
    })
  })

  after(async () => {
    await mongoose.connection.dropDatabase()
    mongoose.disconnect()
  })
})
