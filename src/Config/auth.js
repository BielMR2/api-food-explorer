module.exports = {
    jwt: {
        secret: process.nextTick.AUTH_SECREAT || "default",
        expiresIn: "1d"
    }
}