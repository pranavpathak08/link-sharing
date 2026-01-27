// Middleware to validate resource creation data
export const validateResourceCreation = (req, res, next) => {
    const { description, type, url } = req.body;

    //Checking if description is provided
    if (!description || description.trim().length === 0) {
        return res.status(400).json({
            message: "Description is required"
        });
    }

    //Checking if type is valid
    if (!type || !['LINK', 'DOCUMENT'].includes(type)) {
        return res.status(400).json({
            message: "Type must be either LINK OR DOCUMENT"
        });
    }

    //Validate based on resource type
    if (type === "LINK") {
        if (!url || url.trim().length === 0) {
            return res.status(400).json({
                message: "URL is required for link resources"
            });
        }

        //Basic URL validation
        try {
            new URL(url);
        } catch (error) {
            return res.status(400).json({
                message: "Invalid URL format"
            });
        }
    }

    if (type === "DOCUMENT") {
        if (!req.file) {
            return res.status(400).json({
                message: "File is required for document resources"
            });
        }
    }
    next();
}

//Middleware to validate resource update data
export const validateResourceUpdate = (req, res, next) => {
    const { description, url } = req.body;

    //At least one field should be provided for update
    if (!description && !url) {
        return res.status(400).json({
            message: "Provide at least one field to update (description or url)"
        });
    }

    //If URL is provided
    if (url) {
        try {
            new URL(url);
        } catch (error) {
            return res.status(400).json({
                message: "Invalid URL format"
            });
        }
    }

    next();
}

//Middleware to validate MongoDB ObjectId format
export const validateObjectId = (paramName) => {
    return (req, res, next) => {
        const id = req.params[paramName];

        const objectIdPattern = /^[0-9a-fA-F]{24}$/;

        if (!objectIdPattern.test(id)) {
            return res.status(400).json({
                messsage: `Invalid ${ paramName } format`
            })
        }

        next();
    };
}