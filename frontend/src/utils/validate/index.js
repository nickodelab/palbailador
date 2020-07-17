import validator from 'validator';

const validate = {

    registerUser({ email, nickname, password, passwordC }) {
        if (!validator.isEmail(email))
            throw TypeError('non valid email');
        if (!validator.isLength(nickname, { min: 3, max: 30 }))
            throw Error('non valid nickname length');
        if (!validator.isAlphanumeric(nickname))
            throw Error('non valid nickname chars. Only letter and/or numbers');
        if (password !== passwordC)
            throw Error('password and password confirmation are different');
        if (!validator.isLength(password, { min: 6 }))
            throw Error('password has to be 6 chars length minimum');
    },

    loginUser({ email, password }) {
        if (!validator.isEmail(email))
            throw TypeError('non valid email');
        if (!validator.isLength(password, { min: 6 }))
            throw Error('password has to be 6 chars length minimum');
    }

}

export default validate 