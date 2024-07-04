# Repro for issue 7401

## Versions

firebase-tools: v13.13.0<br>
node: v20.12.2<br>s
platform: macOS Sonoma 14.5

## Steps to reproduce

1. Run `cd functions`
1. Run `npm i`
1. Run `cd ../`
1. Run `firebase logout`
1. Run `firebase emulators:start --project demo-project`
   - Error is thrown

```
⬢  functions: Failed to load function definition from source: FirebaseError: HTTP Error: 401, Request is missing required authentication credential. Expected OAuth 2 access token, login cookie or other valid authentication credential. See https://developers.google.com/identity/sign-in/web/devconsole-project.
```
