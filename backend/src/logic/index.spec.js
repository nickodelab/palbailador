const { expect } = require('chai')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { User } = require('../db/models')

const logic = require('./')

describe('LOGIC', () => {

    before(() => mongoose.connect('mongodb://localhost/palbailador-test', { useNewUrlParser: true, useCreateIndex: true }))

        describe('-- REGISTER --', () => {

            
            const nickname = `nickname-${Math.random()}`
            const email = `email-${Math.random()}@mail.com`
            const password = `password-${Math.random()}`
            

            it('should register an user', async () => {
                
                let userId

                try {
                    const newUser = await logic.registerUser({ nickname, email, password })
                    expect(newUser.id).to.be.a('string')
                    userId = newUser.id
                    expect(newUser.nickname).to.equal(nickname)
                    expect(newUser.email).to.equal(email)
                    const match = await bcrypt.compare(password, newUser.password)
                    expect(match).to.be.true
                } catch (error) {
                    expect(error).to.be.an('undefined')
                }

                const user = await User.findById(userId)
                expect(user).to.be.a('object')
                expect(user.id).to.be.a('string')
                expect(user.nickname).to.equal(nickname)
                expect(user.email).to.equal(email)
                const match = await bcrypt.compare(password, user.password)
                expect(match).to.be.true

            }),

            it('error - should thrown an error on non valid email', () => {
                expect(logic.registerUser({ nickname, email: 'asdcasdca', password })).to.throw()
            })

        })

    after(async () => {
        await mongoose.connection.dropDatabase()
        mongoose.disconnect()
    })
})