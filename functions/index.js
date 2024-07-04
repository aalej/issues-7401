import * as functions from "firebase-functions/v1"
import { defineSecret } from "firebase-functions/params";

defineSecret('FIRST_SECRET')

const FUNCTION_SECRETS = ["FIRST_SECRET"]

export const helloWorld1 = functions
    .runWith({ secrets: FUNCTION_SECRETS }).https.onRequest((request, response) => {
        response.send("Hello from Firebase!" + process.env.FIRST_SECRET);
    });

export const processUploadedFile = functions
    .runWith({ secrets: FUNCTION_SECRETS })
    .storage.object()
    .onFinalize(() => {
        functions.logger.debug(`The first secret is ${process.env.FIRST_SECRET}`)
    })