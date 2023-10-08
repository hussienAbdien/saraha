const { body,param, validationResult } = require('express-validator');


const signUpValidator=[
    body("userName").matches(/^[a-zA-Z]+$/),
    body('email').isEmail().withMessage('invalid-email please enter valid email like test@test.com'),
    body("password").isStrongPassword(),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
    
        // Indicates the success of this synchronous custom validator
        return true;
      })
]
const confirmEmailValidator=[
    param('token').isString().notEmpty()
]


module.exports={signUpValidator,confirmEmailValidator}