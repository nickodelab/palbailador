
const bcrypt = require('bcrypt')
const { User, Video, Group } = require('../db/models')
const validator = require('validator')
const { ObjectId } = require('mongodb')

const logic = {

    /**
     * Creates new user
     * 
     * @param {Object} userData 
     * @throws {Error} on non valid data 
     */

    registerUser: async (userData) => {

        const { nickname, email, password } = userData
        
        if (!validator.isEmail(email)) throw Error('non valid email')

        const user = await User.findOne({ email })
        if (user) throw Error(`user with email ${email} already exists`)

        const hash = await bcrypt.hash(password, 10)
        
        return User.create({ nickname, email, password: hash })
    },

    /**
     * Authenticates user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */

    authenticateUser: async (email, password) => {

        // todo validate

        const user = await User.findOne({ email })
        if (!user) throw Error(`user with email ${email} not found`)
        const match = await bcrypt.compare(password, user.password)
        console.log(match)
        if (!match) throw Error('wrong credentials')
        return user

    },

    uploadVideo: async function (videos){

        // todo validate
        const result = videos.map(async video => await Video.create(video))
        return Promise.all(result)
    },

    listVideos: async function (){

        // todo validate

        return await Video.find()
    },

    updateVideo: async function({ id, ...newVideoData }) {
        // todo validate

        return await Video.findByIdAndUpdate(id, newVideoData)

    },

    createGroup: async (userId, name, description) => {
        // todo validate

        const user = await User.findById(userId)
        if (!user) throw Error('user_not_found')

        const { name: groupName, id: groupId } = await Group.create({ name, description, users: [{ user: userId, isAdmin: true }] })
        user.groups.push(groupId)
        await user.save()

        return { message: `Grupo: "${groupName}" creado` }        
    },

    deleteGroup: async (userId, groupId) => {
        // todo validate

        const user = await User.findById(userId)
        if (!user) throw Error('user_not_found')

        const group = await Group.findById(groupId)
        if (!group) throw Error('group_not_found')

        const isTheUserAdmin = group.users.find(({ user, isAdmin }) => ((user.toString() === userId) && (isAdmin)))
        if (!isTheUserAdmin) throw Error('user_has_no_privileges_to_delete_the_group')

        // delete the group
        const { name } = await Group.findByIdAndDelete(groupId)

        // delete the group in the user model
        await User.findByIdAndUpdate(userId, { $pullAll: { groups: [groupId] } })

        return { message: `Grupo: "${name}" borrado` }
    },

    addUserToGroup: async (groupId, userId) => {
        // todo validate

        const group = await Group.findById(groupId)
        if (!group) throw Error('group_not_found')

        const user = await User.findById(userId)
        if (!user) throw Error('user_not_found')

        const groupAlreadyHasTheUser = group.users.find(({ user }) => user.toString() === userId)
        if (groupAlreadyHasTheUser) throw Error('user_already_exists_in_the_group')

        const userAlreadyHasTheGroup = user.groups.find(({ id }) => id.toString() === groupId)
        if (userAlreadyHasTheGroup) throw Error('user_already_has_the_group')

        const isTheUserAdmin = group.users.find(({ user, isAdmin }) => ((user.toString() === userId) && (isAdmin)))
        if (!isTheUserAdmin) throw Error('user_has_no_privileges_to_add_user_to_the_group')

        group.users.push({ user: userId })
        await group.save()

        user.groups.push(groupId)
        await user.save()

        return { message: `usuario añadido a ${group.name}`}
    },


    addVideoToGroup: async (groupId, videoId) => {
        // todo validate

        const group = await Group.findById(groupId)
        if (!group) throw Error('group_not_found')

        const video = await Video.findById(videoId)
        if (!video) throw Error('video_not_found')

        const videoAlreadyIsInTheGroup = await group.videos.find((id) => id.toString() === videoId)
        if (videoAlreadyIsInTheGroup) throw Error('video_already_is_in_the_group')

        // todo userLoggedIn is in the group?

        group.videos.push(videoId)
        await group.save()

        return { message: `video añadido a ${group.name}` }
    },

    getMyGroups: async (userId) => {
        // todo validate

        const user = User
    }
}

module.exports = logic