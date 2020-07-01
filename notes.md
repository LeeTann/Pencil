1. Generate icons for all platforms - https://realfavicongenerator.net/
2. Choose Googlefonts
3. Add dependencies - react-router, react-router-dom, aws-amplify, react-stripe-elements
4. Set up basic file structure
5. Set up basic navbar with login and signup
6. Configure AWS Amplify to connect our react app to our serverless backend. Amplify refers to Cognito as Auth, S3 as Storage, and API Gateway as API.
7. Create Login page and set up responsive navbar
8. Add session to state with contextAPI and create logout
9. Load user session and clear session on logout with {Auth} from aws-amplify.
10. Redirect on login and logout with useHistory and added font-awesome 4.7 loader to button
11. Create custom useFormField hook and update login page