
require('dotenv').config()
const chai = require('chai')
chai.use(require('chai-as-promised'))
const { expect } = chai

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const tokenHelper = require('../middlewares/token-helper')
const { User, Group, Video } = require('../db/models')
const logic = require('./')

const { env: { DB_URL, DB_URL_TEST, JWT_SECRET } } = process

const mongooseOpts = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

tokenHelper.jwtSecret = JWT_SECRET

describe('LOGIC', () => {
  before(async () => await mongoose.connect(DB_URL_TEST, mongooseOpts))

  const fakeId = '5e3bd4ad907d2934f94a232c'

  describe('**** USER ****', () => {
    describe('- registerUser', () => {
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

    describe('- authenticateUser', () => {
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

    describe('- createGroup', () => {
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

    describe('- deleteGroup', () => {
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
        await expect(logic.deleteGroup(user.id.slice(0, 3), fakeId)).to.be.rejected
      })

      it('NOK - should thrown an error on user not found', async () => {
        await expect(logic.deleteGroup(fakeId, fakeId)).to.be.rejected
      })

      it('NOK - should thrown an error on userId = ""', async () => {
        await expect(logic.deleteGroup(user.id, "")).to.be.rejected
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

      it('NOK - should thrown an error on groupId = ""', async () => {
        await expect(logic.deleteGroup(user.id, "")).to.be.rejected
      })

      it('NOK - should thrown an error on groupId = []', async () => {
        await expect(logic.deleteGroup(user.id, [])).to.be.rejected
      })

      it('NOK - should thrown an error on groupId = {}', async () => {
        await expect(logic.deleteGroup(user.id, {})).to.be.rejected
      })

      it('NOK - should thrown an error when groupId is 3 chars long', async () => {
        await expect(logic.deleteGroup(user.id, fakeId.slice(0, 3))).to.be.rejected
      })
    })

    describe('- addUserToGroup', () => {
      const adminUser = {
        nickname: `nickname`,
        email: `email-${Math.random()}@mail.com`,
        password: `password-${Math.random()}`
      }

      const user = {
        nickname: `nickname`,
        email: `email-${Math.random()}@mail.com`,
        password: `password-${Math.random()}`
      }

      const user2 = {
        nickname: `user2`,
        email: `email-${Math.random()}@mail.com`,
        password: `password-${Math.random()}`
      }

      const group = {
        name: `Group Name - ${Math.random()}`,
        description: `lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum`
      }

      beforeEach(async () => {

        // creates admin user 
        const newUser = await User.create({
          ...adminUser,
          password: await bcrypt.hash(adminUser.password, 10)
        })
        adminUser.id = newUser._id.toJSON()

        // creates the group
        const newGroup = await Group.create({
          ...group,
          members: [{ user: adminUser.id, isAdmin: true }]
        })
        group.id = newGroup._id.toJSON()
        group.members = [{ user: adminUser.id, isAdmin: true }]

        // update the admin user with the group
        await User.findByIdAndUpdate(adminUser.id, { groups: [newGroup._id.toJSON()] })

        // creates user not admin 
        const notAdminGroup = await User.create({
          ...user,
          password: await bcrypt.hash(user.password, 10)
        })
        user.id = notAdminGroup._id.toJSON()

        // creates user2
        const newUser2 = await User.create({
          ...user2,
          password: await bcrypt.hash(user2.password, 10)
        })
        user2.id = newUser2._id.toJSON()

      })

      it('OK - should succeed adding user to a group', async () => {
        try {
          await logic.addUserToGroup(group.id, user.id, adminUser.id)

          // checks if group has the user and !isAdmin
          const groupWithUser = await Group.findById(group.id)
          expect(groupWithUser.members.some(({ user: _user, isAdmin }) => _user.toJSON() === user.id && !isAdmin)).to.be.true
          expect(groupWithUser.members.length).to.equal(2)

          // checks if user has the group
          const updatedUser = await User.findById(user.id)
          expect(updatedUser.groups[0].toJSON()).to.equal(group.id)

        } catch (error) {
          console.log(error.message)
          expect(error).to.be.an('undefined')
        }
      })

      it('NOK - should thrown an error when groupId is 3 chars long', async () => {
        await expect(logic.addUserToGroup(fakeId.slice(0, 3), adminUser.id, adminUser.id)).to.be.rejected
      })

      it('NOK - should thrown an error when userId is 3 chars long', async () => {
        await expect(logic.addUserToGroup(fakeId, adminUser.id.slice(0, 3), adminUser.id)).to.be.rejected
      })

      it('NOK - should thrown an error when loggedInUserId is 3 chars long', async () => {
        await expect(logic.addUserToGroup(fakeId, adminUser.id, adminUser.id.slice(0, 3))).to.be.rejected
      })

      it('NOK - should thrown an error when group not found', async () => {
        await expect(logic.addUserToGroup(fakeId, adminUser.id, adminUser.id)).to.be.rejectedWith(Error, 'group_not_found')
      })

      it('NOK - should thrown an error when user not found', async () => {
        await expect(logic.addUserToGroup(group.id, fakeId, adminUser.id)).to.be.rejectedWith(Error, 'user_not_found')
      })

      it('NOK - should thrown an error when loggedInUserId user not found', async () => {
        await expect(logic.addUserToGroup(group.id, adminUser.id, fakeId)).to.be.rejectedWith(Error, 'logged_in_user_not_found')
      })

      it('NOK - should thrown an error when user is not admin', async () => {
        await expect(logic.addUserToGroup(group.id, user2.id, user.id)).to.be.rejectedWith(Error, 'user_has_no_privileges_to_add_user_to_the_group')
      })

      it('NOK - should thrown an error when user is already in the group', async () => {
        await expect(logic.addUserToGroup(group.id, adminUser.id, adminUser.id)).to.be.rejectedWith(Error, 'user_already_has_the_group')
      })

      it('NOK - should thrown an error on group.id = ""', async () => {
        await expect(
          logic.addUserToGroup("", adminUser.id, adminUser.id)
        ).to.be.rejectedWith(Error, 'non valid groupId')
      })

      it('NOK - should thrown an error on group.id = []', async () => {
        await expect(
          logic.addUserToGroup([], adminUser.id, adminUser.id)
        ).to.be.rejected
      })

      it('NOK - should thrown an error on group.id = {}', async () => {
        await expect(
          logic.addUserToGroup({}, adminUser.id, adminUser.id)
        ).to.be.rejected
      })

      it('NOK - should thrown an error on userId = ""', async () => {
        await expect(
          logic.addUserToGroup(group.id, "", adminUser.id)
        ).to.be.rejectedWith(Error, 'non valid userId')
      })

      it('NOK - should thrown an error on userId = []', async () => {
        await expect(
          logic.addUserToGroup(group.id, [], adminUser.id)
        ).to.be.rejected
      })

      it('NOK - should thrown an error on userId = {}', async () => {
        await expect(
          logic.addUserToGroup(group.id, {}, adminUser.id)
        ).to.be.rejected
      })

      it('NOK - should thrown an error on adminUser = ""', async () => {
        await expect(
          logic.addUserToGroup(group.id, user.id, "")
        ).to.be.rejectedWith(Error, 'non valid loggedInUserId')
      })

      it('NOK - should thrown an error on adminUser = []', async () => {
        await expect(
          logic.addUserToGroup(group.id, user.id, [])
        ).to.be.rejected
      })

      it('NOK - should thrown an error on adminUser = {}', async () => {
        await expect(
          logic.addUserToGroup(group.id, user.id, {})
        ).to.be.rejected
      })

      afterEach(async () => {
        await User.deleteMany()
        await Group.deleteMany()
      })
    })

    describe('- getMyGroups', () => {
      const adminUser = {
        nickname: `nickname`,
        email: `email-${Math.random()}@mail.com`,
        password: `password-${Math.random()}`
      }

      const groups = []

      beforeEach(async () => {

        // creates admin user 
        const newUser = await User.create({
          ...adminUser,
          password: await bcrypt.hash(adminUser.password, 10)
        })
        adminUser.id = newUser._id.toJSON()

        for (let i = 0; i < 3; i++) {
          const myGroup = {
            name: `${i} - GROUP`,
            description: `lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum`,
            members: [{ user: adminUser.id, isAdmin: true }]
          }
          const myGroupNew = await Group.create(myGroup)
          myGroup.id = myGroupNew._id.toJSON()
          myGroup.members = [{ user: adminUser.id, isAdmin: true }]
          groups.push(myGroup.id)
        }

        // update the admin user with the group
        await User.findByIdAndUpdate(adminUser.id, { groups: [...groups] })
      })

      it('OK - should succeed getting my groups', async () => {
        try {

          const myGroups = await logic.getMyGroups(adminUser.id)
          expect(myGroups).to.be.an('array')
          expect(myGroups.length).to.equal(3)

          const { groups: _groups } = await User.findById(adminUser.id).select('groups')
          groups.forEach(g => expect(_groups.includes(g)).to.be.true)

        } catch (error) {
          console.log(error.message)
          expect(error).to.be.an('undefined')
        }
      })

      it('NOK - should thrown an error on userId = ""', async () => {
        await expect(
          logic.getMyGroups("")
        ).to.be.rejectedWith(Error, 'non valid userId')
      })

      it('NOK - should thrown an error on userId = []', async () => {
        await expect(
          logic.getMyGroups([])
        ).to.be.rejected
      })

      it('NOK - should thrown an error on userId = {}', async () => {
        await expect(
          logic.getMyGroups({})
        ).to.be.rejected
      })

      it('NOK - should thrown an error on non valid user id', async () => {
        await expect(
          logic.getMyGroups(fakeId)
        ).to.be.rejected
      })

      afterEach(async () => {
        await User.deleteMany()
        await Group.deleteMany()
      })
    })
  })

  describe('**** VIDEOS *****', () => {

    describe('- uploadVideo', () => {
      const adminUser = {
        nickname: `nickname`,
        email: `email-${Math.random()}@mail.com`,
        password: `password-${Math.random()}`
      }

      const video = {
        name: 'Mambo Workshop Tenerife 2020',
        url: `http://url-fake-to-test.com/${Math.random()}.png`,
        category: 'salsa'
      }

      const videos = []
      videos.push(
        { ...video, url: `http://url-fake-to-test.com/${Math.random()}.png` },
        { ...video, url: `http://url-fake-to-test.com/${Math.random()}.png` },
        { ...video, url: `http://url-fake-to-test.com/${Math.random()}.png` }
      )

      beforeEach(async () => {
        // creates admin user 
        const newUser = await User.create({
          ...adminUser,
          password: await bcrypt.hash(adminUser.password, 10)
        })
        adminUser.id = newUser._id.toJSON()
      })

      it('OK - should succeed on uploading 3 videos', async () => {
        try {
          const uploadedVideos = await logic.uploadVideo(videos, adminUser.id)

          expect(uploadedVideos.length).to.equal(3)
          uploadedVideos.forEach((_video) => {
            expect(_video).to.have.property('_id')
            expect(_video).to.have.property('name')
            expect(videos.some(({ name }) => name === _video.name)).to.be.true
            expect(_video).to.have.property('url')
            expect(videos.some(({ url }) => url === _video.url)).to.be.true
            expect(_video).to.have.property('category', 'salsa')
            expect(_video).to.have.property('isPublic', false)
            expect(_video.owner.toJSON()).to.equal(adminUser.id)
          })

        } catch (error) {
          console.log(error.message)
          expect(error).to.be.an('undefined')
        }
      })

      it('NOK - should thrown an error when videos = ""', async () => {
        await expect(logic.uploadVideo("", adminUser.id)).to.be.rejected
      })

      it('NOK - should thrown an error when videos = {}', async () => {
        await expect(logic.uploadVideo({}, adminUser.id)).to.be.rejected
      })

      it('NOK - should thrown an error when loggedInUserId is 3 chars long', async () => {
        await expect(logic.uploadVideo(videos, adminUser.id.slice(0, 3))).to.be.rejected
      })

      it('NOK - should thrown an error when loggedInUserId = ""', async () => {
        await expect(logic.uploadVideo(videos, "")).to.be.rejected
      })

      it('NOK - should thrown an error when loggedInUserId = []', async () => {
        await expect(logic.uploadVideo(videos, [])).to.be.rejected
      })

      it('NOK - should thrown an error when loggedInUserId = {}', async () => {
        await expect(logic.uploadVideo(videos, {})).to.be.rejected
      })

      it('NOK - should thrown an error when loggedInUserId user not found', async () => {
        await expect(logic.uploadVideo(videos, fakeId)).to.be.rejectedWith(Error, 'logged_in_user_not_found')
      })

    })

    describe('- listVideos', () => {
      const adminUser = {
        nickname: `nickname`,
        email: `email-${Math.random()}@mail.com`,
        password: `password-${Math.random()}`
      }

      const video = {
        name: 'Mambo Workshop Tenerife 2020',
        url: `http://url-fake-to-test.com/${Math.random()}.png`,
        category: 'salsa'
      }

      const videos = []
      videos.push(
        { ...video, url: `http://url-fake-to-test.com/${Math.random()}.png` },
        { ...video, url: `http://url-fake-to-test.com/${Math.random()}.png` },
        { ...video, url: `http://url-fake-to-test.com/${Math.random()}.png` }
      )

      beforeEach(async () => {
        // creates admin user 
        const newUser = await User.create({
          ...adminUser,
          password: await bcrypt.hash(adminUser.password, 10)
        })
        adminUser.id = newUser._id.toJSON()

        // upload videos
        const newVideosPromises = videos.map(async (_video) => await Video.create({ ..._video, owner: adminUser.id }))
        await Promise.all(newVideosPromises)
      })

      it('OK - should succeed on getting all my videos', async () => {
        try {
          const myVideos = await logic.getMyVideos(adminUser.id)

          expect(myVideos.length).to.equal(3)
          myVideos.forEach((_video) => {
            expect(_video).to.have.property('_id')
            expect(_video).to.have.property('name')
            expect(videos.some(({ name }) => name === _video.name)).to.be.true
            expect(_video).to.have.property('url')
            expect(videos.some(({ url }) => url === _video.url)).to.be.true
            expect(_video).to.have.property('category', 'salsa')
            expect(_video).to.have.property('isPublic', false)
            expect(_video.owner.toJSON()).to.equal(adminUser.id)
          })

        } catch (error) {
          console.log(error.message)
          expect(error).to.be.an('undefined')
        }
      })

      it('NOK - should thrown an error when loggedInUserId is 3 chars long', async () => {
        await expect(logic.getMyVideos(adminUser.id.slice(0, 3))).to.be.rejected
      })

      it('NOK - should thrown an error when loggedInUserId = ""', async () => {
        await expect(logic.getMyVideos("")).to.be.rejected
      })

      it('NOK - should thrown an error when loggedInUserId = []', async () => {
        await expect(logic.getMyVideos([])).to.be.rejected
      })

      it('NOK - should thrown an error when loggedInUserId = {}', async () => {
        await expect(logic.getMyVideos({})).to.be.rejected
      })

      it('NOK - should thrown an error when loggedInUserId user not found', async () => {
        await expect(logic.getMyVideos(fakeId)).to.be.rejectedWith(Error, 'logged_in_user_not_found')
      })
    })

    describe('- updateVideo', () => {
      const ownerUser = {
        nickname: `nickname`,
        email: `email-${Math.random()}@mail.com`,
        password: `password-${Math.random()}`
      }

      const notOwnerUser = {
        nickname: `Not Owner User`,
        email: `email-${Math.random()}@mail.com`,
        password: `password-${Math.random()}`
      }

      const video = {
        name: 'Mambo Workshop Tenerife 2020',
        url: `http://url-fake-to-test.com/${Math.random()}.png`,
        category: 'salsa'
      }

      beforeEach(async () => {
        // creates the owner user 
        const newUser = await User.create({
          ...ownerUser,
          password: await bcrypt.hash(ownerUser.password, 10)
        })
        ownerUser.id = newUser._id.toJSON()

        // create 1 video from owner user
        const newVideo = await Video.create({ ...video, owner: ownerUser.id })
        video.id = newVideo._id.toJSON()

        // creates the NOT owner user
        const newNotOwnerUser = await User.create({
          ...notOwnerUser,
          password: await bcrypt.hash(notOwnerUser.password, 10)
        })
        notOwnerUser.id = newNotOwnerUser._id.toJSON()
      })

      it('OK - should succeed on update the video name', async () => {
        try {
          const newVideoData = { name: 'NEW NAME' }
          await logic.updateVideo(video.id, newVideoData, ownerUser.id)

          const videoUpdated = await Video.findById(video.id)
          expect(videoUpdated).to.have.property('_id')
          expect(videoUpdated._id.toJSON()).to.equal(video.id)
          expect(videoUpdated).to.have.property('name', newVideoData.name)
          expect(videoUpdated).to.have.property('category', video.category)
          expect(videoUpdated).to.have.property('url', video.url)
        } catch (error) {
          console.log(error.message)
          expect(error).to.be.an('undefined')
        }
      })

      it('NOK - should thrown an error if logged in user is not the video owner', async () => {
        await expect(logic.updateVideo(video.id, {}, notOwnerUser.id)).to.be.rejectedWith(Error, 'loggedInUserId is not the video owner')
      })

      it('NOK - should thrown an error when videoId is 3 chars long', async () => {
        await expect(logic.updateVideo(video.id.slice(0, 3), {}, ownerUser.id)).to.be.rejected
      })

      it('NOK - should thrown an error when videoId = ""', async () => {
        await expect(logic.updateVideo("", {}, ownerUser.id)).to.be.rejected
      })

      it('NOK - should thrown an error when videoId = []', async () => {
        await expect(logic.updateVideo([], {}, ownerUser.id)).to.be.rejected
      })

      it('NOK - should thrown an error when videoId = {}', async () => {
        await expect(logic.updateVideo({}, {}, ownerUser.id)).to.be.rejected
      })

      it('NOK - should thrown an error when videoId user not found', async () => {
        await expect(logic.updateVideo(fakeId, {}, ownerUser.id)).to.be.rejectedWith(Error, 'video_not_found')
      })

      it('NOK - should thrown an error when newVideoData = ""', async () => {
        await expect(logic.updateVideo(video.id, "", ownerUser.id)).to.be.rejected
      })

      it('NOK - should thrown an error when newVideoData = []', async () => {
        await expect(logic.updateVideo(video.id, [], ownerUser.id)).to.be.rejected
      })

      it('NOK - should thrown an error when newVideoData = undefined', async () => {
        await expect(logic.updateVideo(video.id, undefined, ownerUser.id)).to.be.rejected
      })

      it('NOK - should thrown an error when loggedInUserId is 3 chars long', async () => {
        await expect(logic.updateVideo(video.id, {}, ownerUser.id.slice(0, 3))).to.be.rejected
      })

      it('NOK - should thrown an error when loggedInUserId = ""', async () => {
        await expect(logic.updateVideo(video.id, {}, "")).to.be.rejected
      })

      it('NOK - should thrown an error when loggedInUserId = []', async () => {
        await expect(logic.updateVideo(video.id, {}, [])).to.be.rejected
      })

      it('NOK - should thrown an error when loggedInUserId = {}', async () => {
        await expect(logic.updateVideo(video.id, {}, {})).to.be.rejected
      })

      it('NOK - should thrown an error when loggedInUserId user not found', async () => {
        await expect(logic.updateVideo(video.id, {}, fakeId)).to.be.rejectedWith(Error, 'logged_in_user_not_found')
      })
    })

    describe('- addVideoToGroup', () => {
      const adminUser = {
        nickname: `nickname`,
        email: `email-${Math.random()}@mail.com`,
        password: `password-${Math.random()}`
      }

      const video = {
        name: 'Mambo Workshop Tenerife 2020',
        url: `http://url-fake-to-test.com/${Math.random()}.png`,
        category: 'salsa'
      }

      const group = {
        name: `Group Name - ${Math.random()}`,
        description: `lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum`
      }

      const notOwnerUser = {
        nickname: `Not Owner User`,
        email: `email-${Math.random()}@mail.com`,
        password: `password-${Math.random()}`
      }

      beforeEach(async () => {
        // creates the admin user 
        const newUser = await User.create({
          ...adminUser,
          password: await bcrypt.hash(adminUser.password, 10)
        })
        adminUser.id = newUser._id.toJSON()

        // creates 1 video from owner user
        const newVideo = await Video.create({ ...video, owner: adminUser.id })
        video.id = newVideo._id.toJSON()

        // creates the group
        const member = { user: adminUser.id, isAdmin: true }
        const newGroup = await Group.create({
          ...group,
          members: [member]
        })
        group.id = newGroup._id.toJSON()
        group.members = [member]

        // update the admin user with the group
        await User.findByIdAndUpdate(adminUser.id, { groups: [newGroup._id.toJSON()] })
        adminUser.groups = [group.id]

        // creates the NOT owner user
        const newNotOwnerUser = await User.create({
          ...notOwnerUser,
          password: await bcrypt.hash(notOwnerUser.password, 10)
        })
        notOwnerUser.id = newNotOwnerUser._id.toJSON()
      })

      it('OK - should succeed on adding the video to a group', async () => {
        try {

          await logic.addVideoToGroup(group.id, video.id, adminUser.id)

          const groupWithVideo = await Group.findById(group.id)

          expect(groupWithVideo).to.have.property('_id')
          expect(groupWithVideo._id.toJSON()).to.equal(group.id)
          expect(groupWithVideo).to.have.property('name', group.name)
          expect(groupWithVideo).to.have.property('description', group.description)
          expect(groupWithVideo).to.have.property('videos')
          expect(groupWithVideo).to.have.property('members')
          expect(groupWithVideo.videos.includes(video.id)).to.be.true
          expect(groupWithVideo.members.some(({ user }) => user._id.toJSON() === adminUser.id)).to.be.true

        } catch (error) {
          console.log(error.message)
          expect(error).to.be.an('undefined')
        }
      })

      it('NOK - should thrown an error when user doesn\'t belong to the group', async () => {
        await expect(logic.addVideoToGroup(group.id, video.id, notOwnerUser.id)).to.be.rejectedWith(Error, 'userLoggedIn doesn\'t belong to the group')
      })

      it('NOK - should thrown an error when video is already in the group', async () => {
        await Group.findByIdAndUpdate(group.id, { $push: { videos: video.id } }, { new: true })
        await expect(logic.addVideoToGroup(group.id, video.id, adminUser.id)).to.be.rejectedWith(Error, 'video_already_is_in_the_group')
      })

      it('NOK - should thrown an error when groupId is 3 chars long', async () => {
        await expect(logic.addVideoToGroup(group.id.slice(0, 3), video.id, adminUser.id)).to.be.rejected
      })

      it('NOK - should thrown an error when groupId = ""', async () => {
        await expect(logic.addVideoToGroup("", video.id, adminUser.id)).to.be.rejected
      })

      it('NOK - should thrown an error when groupId = []', async () => {
        await expect(logic.addVideoToGroup([], video.id, adminUser.id)).to.be.rejected
      })

      it('NOK - should thrown an error when groupId = {}', async () => {
        await expect(logic.addVideoToGroup({}, video.id, adminUser.id)).to.be.rejected
      })

      it('NOK - should thrown an error when groupId user not found', async () => {
        await expect(logic.addVideoToGroup(fakeId, video.id, adminUser.id)).to.be.rejectedWith(Error, 'group_not_found')
      })

      it('NOK - should thrown an error when videoId is 3 chars long', async () => {
        await expect(logic.addVideoToGroup(group.id, video.id.slice(0, 3), adminUser.id)).to.be.rejected
      })

      it('NOK - should thrown an error when videoId = ""', async () => {
        await expect(logic.addVideoToGroup(group.id, "", adminUser.id)).to.be.rejected
      })

      it('NOK - should thrown an error when videoId = []', async () => {
        await expect(logic.addVideoToGroup(group.id, [], adminUser.id)).to.be.rejected
      })

      it('NOK - should thrown an error when videoId = {}', async () => {
        await expect(logic.addVideoToGroup(group.id, {}, adminUser.id)).to.be.rejected
      })

      it('NOK - should thrown an error when videoId user not found', async () => {
        await expect(logic.addVideoToGroup(group.id, fakeId, adminUser.id)).to.be.rejectedWith(Error, 'video_not_found')
      })

      it('NOK - should thrown an error when loggedInUserId is 3 chars long', async () => {
        await expect(logic.addVideoToGroup(group.id, video.id, adminUser.id.slice(0, 3))).to.be.rejected
      })

      it('NOK - should thrown an error when loggedInUserId = ""', async () => {
        await expect(logic.addVideoToGroup(group.id, video.id, "")).to.be.rejected
      })

      it('NOK - should thrown an error when loggedInUserId = []', async () => {
        await expect(logic.addVideoToGroup(group.id, video.id, [])).to.be.rejected
      })

      it('NOK - should thrown an error when loggedInUserId = {}', async () => {
        await expect(logic.addVideoToGroup(group.id, video.id, {})).to.be.rejected
      })

      it('NOK - should thrown an error when loggedInUserId user not found', async () => {
        await expect(logic.addVideoToGroup(group.id, video.id, fakeId)).to.be.rejectedWith(Error, 'logged_in_user_not_found')
      })

    })

    afterEach(async () => {
      await User.deleteMany()
      await Group.deleteMany()
      await Video.deleteMany()
    })
  })

  after(async () => {
    await mongoose.connection.dropDatabase()
    mongoose.disconnect()
  })
})
