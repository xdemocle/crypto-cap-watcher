/**
 * Main JavaScript for handling Chromecast interactions.
 */

const { chrome } = window;

function ChromeCast(params) {
  const { log } = console;
  const that = this;
  const { applicationID, namespace } = params;

  let sessionRequest = null;
  let apiConfig = null;
  let session = null;

  this.initialize = () => {
    if (!chrome.cast || !chrome.cast.isAvailable) {
      setTimeout(this.initialize.bind(this), 1000);
      return;
    }

    sessionRequest = new chrome.cast.SessionRequest(applicationID);

    apiConfig = new chrome.cast.ApiConfig(
      sessionRequest,
      this.sessionListener,
      this.receiverListener
    );

    chrome.cast.initialize(apiConfig, this.onInitSuccess, this.onError);
  };

  this.initialize();

  this.onInitSuccess = (e) => {
    if (params.onInitSuccess) {
      params.onInitSuccess(e);
    }
  };

  this.onError = (message) => {
    log(`onError: ${JSON.stringify(message)}`);
  };


  this.onSuccess = (message) => {
    log(`onSuccess: ${JSON.stringify(message)}`);

    if (message.callback) {
      message.callback();
    }
  };

  this.sessionListener = (e) => {
    log(`New session ID: ${e.sessionId}`);
    session = e;
    session.addUpdateListener(this.sessionUpdateListener);
  };

  this.sessionUpdateListener = (isAlive) => {
    log(`${(isAlive ? 'Session Updated' : 'Session Removed')} : ${session.sessionId}`);
    if (!isAlive) {
      session = null;
    }
  };

  this.receiverListener = (e) => {
    if (params.receiverListener) {
      params.receiverListener(e);
    }
  };

  this.sendMessage = (message) => {
    if (session != null) {
      session.sendMessage(
        namespace,
        message,
        this.onSuccess.bind(this, message),
        this.onError
      );
    } else {
      chrome.cast.requestSession((e) => {
        session = e;
        that.sessionListener(e);
        session.sendMessage(
          namespace,
          message,
          that.onSuccess.bind(that, message),
          that.onError
        );
      }, this.onError);
    }
  };

  this.stopApp = (callback) => {
    if (session) {
      session.stop(callback, this.onError);
    } else if (callback) {
      callback();
    }
  };

  this.cast = (url, callback) => {
    this.sendMessage({
      type: 'load',
      url,
      refresh: 0,
      callback
    });
  };
}

export default ChromeCast;
