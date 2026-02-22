import { validationResult } from "express-validator";

export default function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({
            succes: false,
            error: "Validation Error",
            details: errors.array()
        });
    }

    next();
}