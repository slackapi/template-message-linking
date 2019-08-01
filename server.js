const { App } = require('@slack/bolt');
const async = require('async');

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  userToken: process.env.SLACK_USER_TOKEN
});

//Listen for messages in channels
app.message(async ({ message,context, say }) => {
  var regexString = /(https:\/\/)([^.]+)(\.)(slack.com)(\/archives\/)([^\/]+)(\/p)([^.+-]+)/gm;
  
    //Regex for link to a Slack message
    //Checks if message is part of a thread, if it contains more than 3 replies and if the parent message contains a link to a Slack message
    if (message.thread_ts !== undefined) {
      
        try {
    // Call the chat.scheduleMessage method with a token
    var result = await app.client.channels.replies({
      // The token you used to initialize your app is stored in the `context` object
      token: process.env.SLACK_USER_TOKEN,
      channel: message.channel,
     thread_ts: message.thread_ts
      
    });
  console.log(result)
         //console.log(result)
if ((result.messages[0].reply_count == 3) && regexString.test(result.messages[0].attachments[0].from_url)) {


                                var eventText = result.messages[0].attachments[0].from_url;
                              var regexString = /(https:\/\/)([^.]+)(\.)(slack.com)(\/archives\/)([^\/]+)(\/p)([^.+-]+)/gm;
                                var textChannel = "Looks like this discussion is continued in another thread: ";
                                var match  = regexString.exec(eventText);
                               
                                var sourceChannel = match[6];
                                var timestamp = match[8];
                                var len = timestamp.length;

                                var ts = timestamp.substring(0, len - 6) + "." + timestamp.substring(len - 6);

                           

        
                                //Retrieve permalink where the message was cross-posted
                      try{
                       const permalink =  await app.client.chat.getPermalink({
                              token: context.botToken,
                                     channel: message.channel,
                                    message_ts: result.messages[3].ts
                                })
                        
                       app.client.chat.postMessage({
                                   token: context.botToken,
                                    channel: sourceChannel,
                                    text: textChannel + permalink.permalink,
                                    thread_ts: ts,
                                    unfurl_media: true,
                                    unfurl_links: true
                                })
                        console.log(permalink)
                      }   catch (error) {
    console.error(error);
  }
                              
                };         
                   
  }
  catch (error) {
    console.error(error);
  }
    
    }

});


(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();