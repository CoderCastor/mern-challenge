// const z = require("zod");
import * as z from "zod";

const userSchemaSignup = z.object({
    name: z
        .string()
        .min(20, "Name must be minimum 20 letters")
        .max(60, "Name must be maximun 60 letters"),
    address: z
        .string("Address should be valid string")
        .max(400, "Address must be less than 400 characters"),
    email: z.email("Invalid email address"),
    password: z
        .string("Password should be valid string")
        .min(8, "Password should be minimum 8 characters long")
        .max(16, "Password should be maximum 16 characters long")
        .regex(/[A-Z]/, "Password includes atleast one capital letter")
        .regex(/[^A-Za-z0-9]/, "Password should consist one special character"),
});

const userSchemaLogin = z.object({
    email: z.email("Invalid email address"),
    password: z
        .string("Password should be valid string")
        .min(8, "Password should be minimum 8 characters long")
        .max(16, "Password should be maximum 16 characters long")
        .regex(/[A-Z]/, "Password includes atleast one capital letter")
        .regex(/[^A-Za-z0-9]/, "Password should consist one special character"),
});

const userSchemaNewPassword = z.object({
    password: z
        .string("Password should be valid string")
        .min(8, "Password should be minimum 8 characters long")
        .max(16, "Password should be maximum 16 characters long")
        .regex(/[A-Z]/, "Password includes atleast one capital letter")
        .regex(/[^A-Za-z0-9]/, "Password should consist one special character"),
});

const storeSchema = z.object({
    name: z
        .string()
        .min(20, "Name must be minimum 20 letters")
        .max(60, "Name must be maximun 60 letters"),
    address: z
        .string("Address should be valid string")
        .max(400, "Address must be less than 400 characters"),
    email: z.email("Invalid email address"),
});

const userSchemaforAdmin = userSchemaSignup.extend({
    role: z.enum(["NORMAL", "ADMIN", "STORE_OWNER"], "Invalid user role"),
});

const RatingSchema = z.object({
    rating: z
        .int("Rating value is not valid")
        .min(0, "Rating value cannot be negative")
        .max(5, "Rating should be in between 0 to 5"),
});

const shopRatingSchema = RatingSchema.extend({
    storeId: z.uuid("StoreId is not valid"),
});

const modifyRatingSchema = RatingSchema.extend({
    ratingId: z.uuid("RatingId is not valid"),
});


export {
    userSchemaSignup,
    userSchemaLogin,
    userSchemaNewPassword,
    storeSchema,
    userSchemaforAdmin,
    shopRatingSchema,
    modifyRatingSchema
};
