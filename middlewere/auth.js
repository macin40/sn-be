/* eslint-disable max-len */
const jwt = require('jsonwebtoken');
const AppConstant = require('../utility/constant');
const Utility = require('../utility/util');
const UserManager = require('../app/manager/user');

module.exports = {

    authorizeUserRequest: async (req, res, next) => {
        let errors;
        req.checkHeaders('x-access-token', 'x-access-token cannot be empty').notEmpty();
        errors = req.validationErrors();
        console.log(errors)
        if (errors) {
            Utility.response(res, {}, errors, AppConstant.UNPROCESSABLE_ENTITY);
        } else {
            const token = req.headers['x-access-token'];

            try {
                const decoded = jwt.verify(token, process.env.APP_SECRET );
                const reqObj = { userId: decoded.id, isLogin: 1 };
                console.log(reqObj)
                const sessionDetails = await UserManager.getUserSession(reqObj);
                console.log(sessionDetails)
                if (!sessionDetails.length) {
                    return Utility.response(res, {}, AppConstant.MESSAGE.NOT_ALLOWED, AppConstant.FORBIDDEN);
                }
                const decodedSavedToken = jwt.verify(token, process.env.APP_SECRET);

                if (decodedSavedToken.email !== decoded.email) {
                    return Utility.response(res, {}, AppConstant.MESSAGE.NOT_ALLOWED, AppConstant.FORBIDDEN);
                }
                /* passing decoded user object to the request object */
                req.user = decoded;
                console.log(decoded);
                next();
            } catch (e) {
                console.log(e)
                return Utility.response(res, {}, AppConstant.MESSAGE.INVALID_TOKEN, AppConstant.FORBIDDEN);
            }
        }
    },
};
