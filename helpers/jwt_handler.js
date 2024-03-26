const JWT = require('jsonwebtoken');
const createError = require('http-errors');
require('dotenv').config();

class JWTHandler {
    constructor() {
        this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
        this.tokenAccessExpiry = process.env.ACCESS_TOKEN_EXPIRY;
        this.tokenRefreshExpiry = process.env.REFRESH_TOKEN_EXPIRY;
    }

    signToken(payload, secret, expiry, audience) {
        return new Promise((resolve, reject) => {
            const options = {
                expiresIn: expiry,
                issuer: process.env.COMPANY_NAME,
                audience: audience
            };

            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    }

    /**
     *
     * @param payload = object
     * @returns token
     */
    signAccessToken(payload) {
        return this.signToken(payload, this.accessTokenSecret, this.tokenAccessExpiry, payload.userId);
    }

    verifyAccessToken(req, res, next) {
        if (!req.headers['authorization']) return next(createError.Unauthorized());
        const authHeader = req.headers['authorization'];
        const bearerToken = authHeader.split(' ');
        const token = bearerToken[1];

        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                return next(createError.Unauthorized(message));
            }
            req.payload = payload;
            next();
        });
    }

    /**
     *
     * @param payload = object
     * @returns token
     */
    signRefreshToken(payload) {
        return this.signToken(payload, this.refreshTokenSecret, this.tokenRefreshExpiry, payload.userId);
    }

    verifyRefreshToken(refreshToken) {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                if (err) return reject(createError.Unauthorized());
                resolve(payload);
            });
        });
    }
}

module.exports = new JWTHandler();

