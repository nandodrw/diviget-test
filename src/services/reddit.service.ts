import axios from "axios";
import * as base64 from "base-64";
import { RedditPost } from "@/types";
import moment from "moment";

/**
 * This class represents a service that is the unique bridge to interact to reddit api and services
 */
class RedditService {
  private clientId: string;
  private key: string;

  private rootUrl: string;
  private redditAuthorizeUrl: string;
  private redditOauthTokenUrl: string;
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
    this.redditAPIUrl = "https://oauth.reddit.com";
    this.redditOauthTokenUrl = "https://www.reddit.com/api/v1/access_token";

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

  async GetAuthorizationToken(authCode: string): Promise<string> {
    const response = await axios({
      method: "POST",
      url: this.redditOauthTokenUrl,
      data: `grant_type=authorization_code&code=${authCode}&redirect_uri=${this.redirectUri}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${base64.encode(`${this.clientId}:${this.key}`)}`
      }
    });
    return response.data.access_token;
  }

  // Reddit API exposes a set of endpoints classified as Listings, the method handles
  // request to this type, only "/top" for the case of this exercise
  async GetDataFromListingEndpoint(
    endpoint: string,
    token: string
  ): Promise<any> {
    const response = await axios({
      method: "GET",
      url: `${this.redditAPIUrl}/${endpoint}`,
      headers: {
        // Valid access token obtained from Oauth request is needed
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }

  // This method is intended to Parse data from API to a data structure defied for this app
  ParseRawPost(rawPost: any): RedditPost | null {
    if (!rawPost) return null;
    let previewImgUri = "";

    // Grab first image, if present as thumbnail
    if (
      rawPost.preview &&
      rawPost.preview.images &&
      rawPost.preview.images[0] &&
      rawPost.preview.images[0].resolutions &&
      rawPost.preview.images[0].resolutions[0] &&
      rawPost.preview.images[0].resolutions &&
      rawPost.preview.images[0].resolutions[0].url
    ) {
      previewImgUri = rawPost.preview.images[0].resolutions[0].url;
    }

    // Post creation time calculation
    const postCreation = moment.unix(rawPost.created_utc);
    const now = moment(Date());
    const diff = now.diff(postCreation);
    const duration = moment.duration(diff);

    return {
      title: rawPost.title,
      author: rawPost.author,
      entryDate: `${Math.floor(duration.asHours())} hours ago`,
      comments: rawPost.num_comments,
      unreadStatus: rawPost.visited,
      thumbnail: previewImgUri
    };
  }
}

export default new RedditService();
