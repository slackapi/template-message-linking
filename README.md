# Message Linking

This app bridges Slack threads talking about the same issue. It makes it easier to follow discussions that might span teams, departments, locations etc.

## Workflow

1. Invite the app to the channels where you'd like to use it.
2. Share a message from one channel to another.
3. Now, after there are at least 3 replies under the re-posted message, Message Linking will reply to the original with a link to the new discussion.

![Message Linking GIF](https://files.slack.com/files-pri/T12KS1G65-FLEBK6335/context_gif.gif?pub_secret=2152ed6c15)

## What we're going to use

These are the basic components used in the Message Linking app:

• [Bolt](https://github.com/slackapi/bolt)

• [Events API](https://api.slack.com/events-api) to listen for relevant thread replies.

• A simple regex to detect when messages are shared.

## Design assumptions

We made some UX assumptions in designing Message Linking but you can adjust them to suit your needs:

* **No private channels** - by default, the app will not link to messages in private channels. It’s both a privacy precaution and a user experience one, since not everyone would be able to follow the link.
* **Three replies threshold** - triggering the thread bridge after 3 replies is the sweet spot between making the app noisy and risking missing conversations.

## Setup

1. Create a Slack app at [https://api.slack.com/apps](https://api.slack.com/apps)
2. At Bot Users, add a new bot user.
3. Click on OAuth & Permissions and add the following scopes:
  * `channels:history`
  * `bot`
4. Click 'Save Changes' and install the app to all channels (You should get an OAuth access token after the installation

### Run locally or [![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/context-bolt")

1. Get the code
  * Either clone this repo and run npm install
  * Or visit [https://glitch.com/edit/#!/context-bolt](https://glitch.com/edit/#!/context-bolt)
2. Set the following environment variables in .env (copy from .env.sample):
  * `SLACK_BOT_TOKEN`: Your app's xoxb- token (available on the Install App page)
  * `SLACK_USER_TOKEN`: Your app's xoxp- token (available on the Install App page)
  * `SLACK_SIGNING_SECRET`: Your app's Verification Token (available on the Basic Information page)
3. If you're running the app locally:
  * Start the app (`npm start`)
4. Enable the Events API

### Enabling the Events API
1. Click on **Events Subscriptions** and enable events.
1. Set the Request URL to your server (*e.g.* `https://yourname.ngrok.com`) or Glitch URL + `/events`
1. On the same page, scroll down to *Subscribe to Bot Events* and subscribe to the `message.channels`

### In Slack

1. Install the Message Linking App on your workspace.
2. Invite the bot user with `/invite @botname` to every channel you'd like it to be able to connect threads with.

#### To test:

1. Post a message in Channel A
2. Copy a link to the message and post in Channel B
3. Reply to the message in Channel B at least 3 times.
4. Bot should notify back in the original message in Channel A of the activity!
