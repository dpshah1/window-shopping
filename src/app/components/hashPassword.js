import crypto from 'crypto';

const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
}

export default hashPassword

const original = 'password'
const hashed = hashPassword(original)

console.log(original)
console.log(hashed)

const second = 'jungmin'
const secondhash = hashPassword(second)

console.log(second)
console.log(secondhash)