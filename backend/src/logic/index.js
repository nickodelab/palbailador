const bcrypt = require('bcrypt')
const validator = require('validator')

const { User, Video, Group } = require('../db/models')
const tokenHelper = require('../middlewares/token-helper')

const logic = {
  /**
   * Normalize the response from mongoose
   * @returns {Object}
   */
  normalize: ret => {
    const id = ret._id.toString()
    delete ret._id
    delete ret.__v
    delete ret.password
    return { id, ...ret }
  },
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
   * @returns {Object} - user fields + token
   * @throws {Error} on non valid, wrong password or non existing user
   */
  authenticateUser: async function (email, password) {
    if (!validator.isEmail(email)) throw TypeError('non valid email')
    if (!validator.isLength(password, { min: 6 })) {
      throw Error('password has to be 6 chars length minimum')
    }

    const user = await User.findOne({ email }).lean()
    if (!user) throw Error(`user with email ${email} not found`)

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw Error('wrong credentials')

    const token = tokenHelper.createToken(user._id.toString())
    return this.normalize({ ...user, token })
  },
  /**
   * Get the logged in user
   * @param {String} loggedInUserId
   * @returns {Object} - with all user's info
   * @throws {Error} - on non valid userId or not found user
   */
  getMyUser: async function (loggedInUserId) {
    if (!loggedInUserId) throw Error('logged_in_user_not_found')

    const userLoggedIn = await User.findById(loggedInUserId).lean()
    if (!userLoggedIn) throw Error('logged_in_user_not_found')

    return this.normalize(userLoggedIn)
  },
  /**
   * Save all videos in the videos param in the database
   *
   * @param {Array} videos - array of object = video
   * @param {String} loggedInUserId
   * @returns {Promise} - resolved with Array - all videos uploaded
   * @throws {Error} - on non valid userId or not found user
   */
  uploadVideos: async function (videos, loggedInUserId) {
    if (videos.constructor !== Array) {
      throw TypeError('videos has to be an array')
    }

    if (!validator.isLength(loggedInUserId, { min: 6 })) {
      throw Error('non valid loggedInUserId')
    }

    const userLoggedIn = await User.findById(loggedInUserId)
    if (!userLoggedIn) throw Error('logged_in_user_not_found')

    const newVideosPromises = videos.map(async video =>
      Video.create({ ...video, owner: loggedInUserId })
    )

    return Promise.all(newVideosPromises)
  },
  /**
   * Get all videos uploaded by me
   * @param {String} loggedInUserId
   * @returns {Array} - array with all videos
   * @throws {Error} - on non valid userId or not found user
   */
  getMyVideos: async loggedInUserId => {
    if (!validator.isLength(loggedInUserId, { min: 6 })) {
      throw Error('non valid loggedInUserId')
    }

    const userLoggedIn = await User.findById(loggedInUserId)
    if (!userLoggedIn) throw Error('logged_in_user_not_found')

    return Video.find({ owner: loggedInUserId })
  },
  /**
   * Updates a video with the information in newVideoData
   *
   * @param {String} videoId
   * @param {Object} newVideoData - destructured the video object
   * @param {String} loggedInUserId
   * @returns {Object} - the video / object updated
   * @throws {Error} - on non valid userId or not found user
   */
  updateVideo: async function (videoId, newVideoData, loggedInUserId) {
    if (!validator.isLength(videoId, { min: 6 })) {
      throw Error('non valid videoId')
    }

    const video = await Video.findById(videoId)
    if (!video) throw Error('video_not_found')

    if (newVideoData.constructor !== Object) {
      throw TypeError('newVideoData is not an object')
    }

    if (!validator.isLength(loggedInUserId, { min: 6 })) {
      throw Error('non valid loggedInUserId')
    }

    const userLoggedIn = await User.findById(loggedInUserId)
    if (!userLoggedIn) throw Error('logged_in_user_not_found')

    if (video.owner.toJSON() !== loggedInUserId) {
      throw Error('loggedInUserId is not the video owner')
    }

    const videoUpdated = await Video.findByIdAndUpdate(videoId, newVideoData, {
      new: true
    }).lean()
    return this.normalize(videoUpdated)
  },
  /**
   * Creates a new group
   *
   * @param {String} loggedInUserId - the user who is logged in - the only isAdmin: true in the group
   * @param {String} name
   * @param {String} description
   * @returns {Promise} - resolved with Object - the new user created
   * @throws {Error} on non valid userId, wrong password or non existing user
   */
  createGroup: async (loggedInUserId, name, description) => {
    if (!validator.isLength(loggedInUserId, { min: 6 })) {
      throw Error('non valid loggedInUserId')
    }
    if (!validator.isLength(name, { min: 2 })) {
      throw Error('non valid group name')
    }
    if (!validator.isLength(description, { min: 3 })) {
      throw Error('non valid group description')
    }

    const user = await User.findById(loggedInUserId)
    if (!user) throw Error('user_not_found')

    const newGroup = await Group.create({
      name,
      description,
      members: [{ user: loggedInUserId, isAdmin: true }]
    })
    user.groups.push(newGroup._id)
    await user.save()

    return newGroup
  },
  /**
   * Deletes a group by groupId
   *
   * @param {String} loggedInUserId
   * @param {String} groupId
   * @returns {Object} - resolved with Object with message
   * @throws {Error} - on non valid loggedInUserId or groupId
   *
   */
  deleteGroup: async (loggedInUserId, groupId) => {
    if (!validator.isLength(loggedInUserId, { min: 6 })) {
      throw Error('non valid loggedInUserId')
    }
    if (!validator.isLength(groupId, { min: 6 })) {
      throw Error('non valid groupId')
    }

    const user = await User.findById(loggedInUserId)
    if (!user) throw Error('user_not_found')

    const group = await Group.findById(groupId)
    if (!group) throw Error('group_not_found')

    const isTheUserAdmin = group.members.find(
      ({ user, isAdmin }) => user.toString() === loggedInUserId && isAdmin
    )
    if (!isTheUserAdmin) {
      throw Error("The user doesn't have privileges to delete the group")
    }

    const groupDeleted = await Group.findByIdAndDelete(groupId)
    await User.findByIdAndUpdate(loggedInUserId, {
      $pullAll: { groups: [groupId] }
    })
    return groupDeleted
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

    if (
      userLoggedIn === userId ||
      group.members.some(({ user: _user }) => _user.toJSON() === userId)
    ) {
      throw Error('user_already_has_the_group')
    }

    const isAdminLoggedInUser = group.members.find(
      ({ user: _user, isAdmin }) => _user.toJSON() === loggedInUserId && isAdmin
    )
    if (!isAdminLoggedInUser) {
      throw Error('user_has_no_privileges_to_add_user_to_the_group')
    }

    group.members.push({ user: userId })
    await group.save()

    user.groups.push(groupId)
    return user.save()
  },
  /**
   * Add a video to a group
   *
   * @param {String} groupId
   * @param {String} videoId
   * @param {String} loggedInUserId
   * @throws {Error} - on non valid groupId, videoId, group not found, video not found...
   */
  addVideoToGroup: async (groupId, videoId, loggedInUserId) => {
    if (!validator.isLength(groupId, { min: 6 })) {
      throw Error('non valid groupId')
    }

    const group = await Group.findById(groupId)
    if (!group) throw Error('group_not_found')

    if (!validator.isLength(videoId, { min: 6 })) {
      throw Error('non valid videoId')
    }

    const video = await Video.findById(videoId)
    if (!video) throw Error('video_not_found')

    if (!validator.isLength(loggedInUserId, { min: 6 })) {
      throw Error('non valid loggedInUserId')
    }

    const userLoggedIn = await User.findById(loggedInUserId)
    if (!userLoggedIn) throw Error('logged_in_user_not_found')

    const videoAlreadyIsInTheGroup = await group.videos.find(
      id => id.toString() === videoId
    )
    if (videoAlreadyIsInTheGroup) throw Error('video_already_is_in_the_group')

    const isMemberUserLoggedIn = await group.members.find(
      ({ user }) => user.toString() === loggedInUserId
    )
    if (!isMemberUserLoggedIn) {
      throw Error("userLoggedIn doesn't belong to the group")
    }

    group.videos.push(videoId)
    return group.save()
  },
  /**
   * Gets the groups I belong to
   *
   * @param {String} loggedInUserId
   * @returns {Object} - resolved with Object with message
   * @throws {Error} - on non valid loggedInUserId or not found user
   */
  getMyGroups: async loggedInUserId => {
    if (!validator.isLength(loggedInUserId, { min: 6 })) {
      throw Error('non valid loggedInUserId')
    }

    const user = await User.findById(loggedInUserId).populate({
      path: 'groups',
      populate: [
        { path: 'members.user', select: 'nickname' },
        { path: 'videos' }
      ]
    })
    if (!user) throw Error('user_not_found')

    return user.groups
  }
}

module.exports = logic
