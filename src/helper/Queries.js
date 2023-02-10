import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';

const requestInfo = (parameters, accessToken, handleResponseCallback) => {
  const infoRequest = new GraphRequest(
    '/me',
    {
      parameters: {
        fields: {
          string: parameters,
        },
        access_token: {
          string: accessToken,
        },
      },
    },
    handleResponseCallback
  );
  // Start the graph request.
  new GraphRequestManager().addRequest(infoRequest).start();
};

const postToGroup = (groupId, message, accessToken, handleResponseCallback) => {
  const infoRequest = new GraphRequest(
    `/${groupId}/feed`,
    {
      httpMethod: 'POST',
      parameters: {
        message: {
          string: message,
        },
        access_token: {
          string: accessToken,
        },
      },
    },
    handleResponseCallback
  );
  // Start the graph request.
  new GraphRequestManager().addRequest(infoRequest).start();
};

const getGroupFeed = (groupId, accessToken, handleResponseCallback) => {
  const infoRequest = new GraphRequest(
    `/${groupId}/feed`,
    {
      httpMethod: 'GET',
      parameters: {
        access_token: {
          string: accessToken,
        },
      },
    },
    handleResponseCallback
  );
  // Start the graph request.
  new GraphRequestManager().addRequest(infoRequest).start();
};

export default Query = {
  requestInfo,
  postToGroup,
  getGroupFeed,
};
