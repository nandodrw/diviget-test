/**
 * This class represents a service that is the unique bridge to interact to reddit api and services
 */
class RedditService {
  private clientId: string;
  private key: string;

  private rootUrl: string;
  private redditAuthorizeUrl: string;
  private redditAPIUrl: string;
  private oauthHandlerRoute: string;

  constructor() {
    this.clientId = process.env.VUE_APP_REDDIT_ID;
    this.key = process.env.VUE_APP_REDDIT_KEY;

    // Event when the url is adjusted dynamically depending on the current web server
    // the url also need s to be set on Reddit -> external application settings
    // if both values are not consistent, the app wont be able to access to reddit api
    this.rootUrl = `${window.location.protocol}//${window.location.host}/`;

    this.redditAuthorizeUrl = "https://www.reddit.com/api/v1/authorize";
    this.redditAPIUrl = "https://oauth.reddit.com/";

    // This rouse should be set at a Vue route
    this.oauthHandlerRoute = "reddit-auth-redirect";
  }

  private get redirectUri() {
    return `${this.rootUrl}${this.oauthHandlerRoute}`;
  }

  Authorize() {
    const duration = "temporary";
    // Read is needed in order to access public reddit post, identity is left a default
    const scope = "identity read";

    // At this part app will be redirected to reddit OAUTH screen, Reddit require a "state" parameter, in other context this parameter
    // could be used to give a clue about what was the last state of the app before been redirect to OAUTH flow
    window.location.href = `${this.redditAuthorizeUrl}?client_id=${this.clientId}&response_type=code&state=bananas&redirect_uri=${this.redirectUri}&duration=${duration}&scope=${scope}`;
  }
}

export default new RedditService();
