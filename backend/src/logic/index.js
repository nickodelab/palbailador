const bcrypt = require('bcrypt')
const validator = require('validator')

const { User, Video, Group } = require('../db/models')
const tokenHelper = require('../middlewares/token-helper')

const logic = {
  /**
   * Creates new user with email, nickname and password
   *
   * @param {Object} userData
   * @returns {Object} - resolved with Object - the new user created
   * @throws {Error} on non valid data or existing user
   */
  registerUser: async userData => {
    if (!validator.isEmail(userData.email)) throw TypeError('non valid email')
    if (!validator.isLength(userData.nickname, { min: 3, max: 30 })) {
      throw Error('non valid nickname length')
    }
    if (!validator.isAlphanumeric(userData.nickname)) {
      throw Error('non valid nickname chars. Only letter and/or numbers')
    }
    if (!validator.isLength(userData.password, { min: 6 })) {
      throw Error('password has to be 6 chars length minimum')
    }

    const { nickname, email, password } = userData

    const user = await User.findOne({ email })
    if (user) throw Error(`user with email ${email} already exists`)

    const passwordHashed = await bcrypt.hash(password, 10)

    return User.create({ nickname, email, password: passwordHashed })
  },
  /**
   * Authenticates a user saving the userId in the token's sub (in tokenHelper)
   *
   * @param {String} email
   * @param {String} password
   * @returns {String} - token
   * @throws {Error} on non valid, wrong password or non existing user
   */
  authenticateUser: async (email, password) => {
    if (!validator.isEmail(email)) throw TypeError('non valid email')
    if (!validator.isLength(password, { min: 6 })) {
      throw Error('password has to be 6 chars length minimum')
    }

    const user = await User.findOne({ email })
    if (!user) throw Error(`user with email ${email} not found`)

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw Error('wrong credentials')

    const token = tokenHelper.createToken(user.id)

    return token
  },
  /**
   * Creates a new group
   *
   * @param {String} userId - the user who is logged in - the only isAdmin: true in the group
   * @param {String} name
   * @param {String} description
   * @returns {Promise} - resolved with Object - the new user created
   * @throws {Error} on non valid userId, wrong password or non existing user
   */
  createGroup: async (userId, name, description) => {
    if (!validator.isLength(userId, { min: 6 })) throw Error('non valid userId')
    if (!validator.isLength(name, { min: 2 })) {
      throw Error('non valid group name')
    }
    if (!validator.isLength(description, { min: 3 })) {
      throw Error('non valid group description')
    }

    const user = await User.findById(userId)
    if (!user) throw Error('user_not_found')

    const newGroup = await Group.create({
      name,
      description,
      members: [{ user: userId, isAdmin: true }]
    })
    user.groups.push(newGroup._id)
    await user.save()

    return newGroup
  },
  /**
   * Deletes a group by groupId
   *
   * @param {String} userId
   * @param {String} groupId
   * @returns {Object} - resolved with Object with message
   * @throws {Error} - on non valid userId or groupId
   *
   */
  deleteGroup: async (userId, groupId) => {
    if (!validator.isLength(userId, { min: 6 })) throw Error('non valid userId')
    if (!validator.isLength(groupId, { min: 6 })) {
      throw Error('non valid groupId')
    }

    const user = await User.findById(userId)
    if (!user) throw Error('user_not_found')

    const group = await Group.findById(groupId)
    if (!group) throw Error('group_not_found')

    const isTheUserAdmin = group.members.find(
      ({ user, isAdmin }) => user.toString() === userId && isAdmin
    )
    if (!isTheUserAdmin) {
      throw Error("The user doesn't have privileges to delete the group")
    }

    const deletedGroup = await Group.findByIdAndDelete(groupId)

    await User.findByIdAndUpdate(userId, { $pullAll: { groups: [groupId] } })

    return deletedGroup
  },
  /**
   * Add a user to the group
   *
   * @param {String} groupId
   * @param {String} userId
   * @param {String} loggedInUserId
   * @returns {Object} - resolved with Object with message
   * @throws {Error} - on non valid userId, loggedInUser, userId...
   */
  addUserToGroup: async (groupId, userId, loggedInUserId) => {
    if (!validator.isLength(groupId, { min: 6 })) {
      throw Error('non valid groupId')
    }
    if (!validator.isLength(userId, { min: 6 })) throw Error('non valid userId')
    if (!validator.isLength(loggedInUserId, { min: 6 })) {
      throw Error('non valid loggedInUserId')
    }

    const group = await Group.findById(groupId)
    if (!group) throw Error('group_not_found')

    const user = await User.findById(userId)
    if (!user) throw Error('user_not_found')

    const userLoggedIn = await User.findById(loggedInUserId)
    if (!userLoggedIn) throw Error('logged_in_user_not_found')

    const isTheUserAdmin = group.users.find(
      ({ user, isAdmin }) => user.toString() === loggedInUserId && isAdmin
    )
    if (!isTheUserAdmin) {
      throw Error('user_has_no_privileges_to_add_user_to_the_group')
    }

    const userAlreadyHasTheGroup = user.groups.find(
      ({ id }) => id.toString() === groupId
    )
    if (userAlreadyHasTheGroup) throw Error('user_already_has_the_group')

    const groupAlreadyHasTheUser = group.users.find(
      ({ user }) => user.toString() === userId
    )
    if (groupAlreadyHasTheUser) throw Error('user_already_exists_in_the_group')

    group.users.push({ user: userId })
    await group.save()

    user.groups.push(groupId)
    await user.save()

    return { message: `usuario añadido a ${group.name}` }
  },
  /**
   * Gets my groups I belong to
   *
   * @param {String} userId
   * @returns {Object} - resolved with Object with message
   * @throws {Error} - on non valid userId or not found user
   */
  getMyGroups: async userId => {
    if (!validator.isLength(userId, { min: 6 })) throw Error('non valid userId')

    const user = await User.findById(userId).populate({
      path: 'groups',
      populate: { path: 'members.user', select: 'nickname' }
    })
    if (!user) throw Error('user_not_found')

    return user.groups
  },
  /**
   * Save all videos in the videos param in the database
   *
   * @param {Array} videos - array of object = video
   * @returns {Promise} - resolved with Array - all videos uploaded
   * @throws {Error} - on non valid userId or not found user
   */
  uploadVideo: async function (videos) {
    if (videos.constructor !== Array) throw TypeError('videos is not an array')

    const result = await videos.map(async video => Video.create(video))
    return Promise.all(result)
  },
  /**
   * Get all videos
   * // todo
   *
   * makes sense get all videos in the system? maybe gets videos with groupId
   */
  listVideos: async function () {
    const video = await Video.find()
    return video
  },
  /**
   * Save all videos in the database
   *
   * @param {Object} - destructured the video object
   * @returns {Object} - the video / object updated
   * @throws {Error} - on non valid userId or not found user
   */
  updateVideo: async function ({ id, ...newVideoData }) {
    const video = Video.findById(id)
    if (!video) throw Error('video not found')

    const result = Video.findByIdAndUpdate(id, newVideoData)
    return result
  },

  /**
   * Add a video to a group by groupId
   *
   * @param {String} groupId
   * @param {String} videoId
   * @throws {Error} - on non valid groupId, videoId, group not found, video not found...
   */
  addVideoToGroup: async (groupId, videoId) => {
    if (!validator.isLength(groupId, { min: 6 })) {
      throw Error('non valid groupId')
    }

    if (!validator.isLength(videoId, { min: 6 })) {
      throw Error('non valid videoId')
    }

    const group = await Group.findById(groupId)
    if (!group) throw Error('group_not_found')

    const video = await Video.findById(videoId)
    if (!video) throw Error('video_not_found')

    const videoAlreadyIsInTheGroup = await group.videos.find(
      id => id.toString() === videoId
    )
    if (videoAlreadyIsInTheGroup) throw Error('video_already_is_in_the_group')

    // todo userLoggedIn is in the group?

    group.videos.push(videoId)
    await group.save()

    return { message: `video añadido a ${group.name}` }
  }
}

module.exports = logic
