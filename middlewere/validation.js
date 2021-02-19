const Utility = require('../utility/util');
const Constant = require('../utility/constant');

module.exports = {
    register: (req, res, next) => {
        let errors;
        req.check('name', 'name cannot be empty').notEmpty();
        req.check('email', 'email cannot be empty').notEmpty();
        req.check('password', 'password cannot be empty').notEmpty();

        errors = req.validationErrors();


        if (errors) {
            Utility.response(res, {}, errors, Constant.UNPROCESSABLE_ENTITY);
        } else {

            req.body.name = req.body.name.replace(/(\w)(\w*)/g,
            (g0, g1, g2) => {
                return g1.toUpperCase() + g2.toLowerCase();
            });req.body.name = req.body.name.toLowerCase();
            req.body.email = req.body.email.toLowerCase();

            next();
        }
    },
    login: (req, res, next) => {
        let errors;
        req.check('email', 'email cannot be empty').notEmpty();
        req.check('password', 'password cannot be empty').notEmpty();
        errors = req.validationErrors();


        if (errors) {
            Utility.response(res, {}, errors, Constant.UNPROCESSABLE_ENTITY);
        } else {

            next();
        }
    },
    post: (req, res, next) => {
        let errors;
        req.check('post', 'post cannot be empty').notEmpty();
        req.check('addedBy', 'addedBy cannot be empty').notEmpty();
        errors = req.validationErrors();
        if (errors) {
            Utility.response(res, {}, errors, Constant.UNPROCESSABLE_ENTITY);
        } else {
            next();
        }
    },
};
