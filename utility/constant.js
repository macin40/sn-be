module.exports = {

    SUCCESS: 200,
    FAILURE: 500,
    CONFLICT: 409,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    NOT_ALLOWED: 405,
    FORBIDDEN: 403,
    UNPROCESSABLE_ENTITY: 422,

    MESSAGE: {
        USER_UPDATED_SUCCESSFULLY: 'User updated successfully',
        UNAUTHORIZED: 'Unauthorized access',
        UNABLE_TO_UPDATE: 'Unable to update',
        NOTHING_TO_UPDATE: 'Nothing to update ',
        FILE_SIZE_TOO_LARGE: 'File too large',
        UNABLE_TO_LOGIN: 'Unable to login',
        UNABLE_TO_DELETE: 'Unable to delete',
        USER_NOT_REGISTERED: 'User not registered',
        INCORRECT_PASSWORD: 'Incorrect password',
        PASSWORD_DO_NOT_MATCH: 'Password do not match',
        UNABLE_TO_REGISTER: 'Unable to register',
        USER_REGISTERED_SUCCESSFULLY: 'User registered successfully',
        INVALID_CREDENTIALS: 'Login details do not match',
        USER_FETCHED_SUCCESSFULLY: 'User fetched successfully',
        USER_SINGED_IN_SUCCESSFULLY: 'User signed-In successfully',
        EMAIL_ALREADY_IN_USE: 'Email already in-use',
        NOT_ALLOWED: 'Not allowed',
        INVALID_TOKEN: 'Invalid token',
        USER_ALREADY_EXISTS: 'User already exists',
        NO_FILE_WAS_PROVIDED: 'File not provided',
        NO_DATA_TO_UPDATE: 'No data to update',
        FRIEND_ADDED_SUCCESSFULLY: 'Friend added successfully',
        POST_ADDED_SUCCESSFULLY: 'Post added successfully',
        POST_FETCHED: 'Post fetched successfully',
        UNABLE_TO_CREATE_TOKEN: 'Unable to create token',
        UNABLE_TO_ADD_FRIEND: 'Unable to add friend',
        UNABLE_TO_ADD_POST: 'Unable to add post',
        LOGOUT_SUCCESS: 'logout success',
        UNABLE_TO_LIKE: 'Uable to like',
        POST_LIKED_SUCCESSFULLY: 'Post liked successfully',

    },
    SALT: {
        ROUNDS: 10,
    },
};
