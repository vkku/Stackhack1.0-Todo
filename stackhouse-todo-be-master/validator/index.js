exports.userSignupValidator = (req, res, next) => {
    
    req.check("name", "Name is required").notEmpty();
   
    req.check("email", "Email must be between 3 to 32 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 2000
        });
    
    req.check("password", "Password is required").notEmpty();
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number");
   
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};

exports.createTaskValidator = (req, res, next) => {
    // title
    req.check("title", "Write a title").notEmpty();
    req.check("title", "Title must be between 4 to 150 characters").isLength({
        min: 4,
        max: 150
    });
    // body
    req.check("text", "Write a body").notEmpty();
    req.check("text", "Body must be between 4 to 2000 characters").isLength({
        min: 4,
        max: 2000
    });
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
   
    next();
};


exports.createTaskUpdateValidator = (req, res, next) => {
    // title
    req.check("title", "No title specified").notEmpty();
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }

    next();
};