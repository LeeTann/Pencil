const dev = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-dev-attachmentsbucket-ogwxvvkziwyi"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://gk5nyofcu7.execute-api.us-east-1.amazonaws.com/dev/"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_KylORYu5O",
    APP_CLIENT_ID: "3ef7cgd8b3ge6irljg23hf9l07",
    IDENTITY_POOL_ID: "us-east-1:d2f599f1-7556-484a-b987-38c28087d374"
  }
}

const prod = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-prod-attachmentsbucket-n1grn8swmnn9"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://19aulnldte.execute-api.us-east-1.amazonaws.com/prod/"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_vSGGNNCWIus-east-1:8df07813-88da-4d61-827c-8bf3cc4e0ab1",
    APP_CLIENT_ID: "19v99ntitd5k7ivdnvkur27b1h",
    IDENTITY_POOL_ID: "us-east-1:8df07813-88da-4d61-827c-8bf3cc4e0ab1"
  }
}

// Default to dev in not set
const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev

export default {
  // Add common config values
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
}