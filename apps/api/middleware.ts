import type {NextFunction,  Request , Response } from "express";

export function authMiddleware(req : Request , res : Response , next : NextFunction) {
    const authHeader = req.headers['authorization'];

    // this type does not exist on the req types ...so we need declaration file specifically for req.userId type.
    req.userId = "1";
    next();
}