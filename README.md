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

## PR Test

Using https://github.com/firebase/firebase-tools/pull/7443

1. Run `cd functions`
2. Run `npm i`
3. Run `cd ../`
4. Run `firebase logout`
5. Run `firebase emulators:start --project demo-project`
   - No error thrown

```
⚠  emulators: You are not currently authenticated so some features may not work correctly. Please run firebase login to authenticate the CLI.
i  emulators: Starting emulators: functions
i  emulators: Detected demo project ID "demo-project", emulated services will use a demo configuration and attempts to access non-emulated services for this project will fail.
⚠  functions: You are not signed in to the Firebase CLI. If you have authorized this machine using gcloud application-default credentials those may be discovered and used to access production services.
i  ui: Emulator UI logging to ui-debug.log
i  functions: Watching "/Users/<user>/Desktop/firebase-tools/issues/7401/functions" for Cloud Functions...
⚠  functions: Your requested "node" version "18" doesn't match your global version "20". Using node@20 from host.
Serving at port 8963

✔  functions: Loaded functions definitions from source: helloWorld1, processUploadedFile.
✔  functions[us-central1-helloWorld1]: http function initialized (http://127.0.0.1:5001/demo-project/us-central1/helloWorld1).
✔  functions[us-central1-processUploadedFile]: storage function initialized.

┌─────────────────────────────────────────────────────────────┐
│ ✔  All emulators ready! It is now safe to connect your app. │
│ i  View Emulator UI at http://127.0.0.1:4000/               │
└─────────────────────────────────────────────────────────────┘

┌───────────┬────────────────┬─────────────────────────────────┐
│ Emulator  │ Host:Port      │ View in Emulator UI             │
├───────────┼────────────────┼─────────────────────────────────┤
│ Functions │ 127.0.0.1:5001 │ http://127.0.0.1:4000/functions │
└───────────┴────────────────┴─────────────────────────────────┘
  Emulator Hub running at 127.0.0.1:4400
  Other reserved ports: 4500

Issues? Report them at https://github.com/firebase/firebase-tools/issues and attach the *-debug.log files.
```

6. Run `curl http://127.0.0.1:5001/demo-project/us-central1/helloWorld1` <- Has a valid secret

```
$ curl http://127.0.0.1:5001/demo-project/us-central1/helloWorld1
Hello from Firebase!local-secret-first
```

### Testing deployment

1. Run `firebase login`
1. Run `firebase deploy --project PROJECT_ID`
   - Deploment works fine, function deployed uses the prod secret

```
Hello from Firebase!prod-secret-first
```
