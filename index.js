const lpm = require("lp-messaging-sdk");

// define the auth data
const accountId = '123';
const authData = {
    username: 'cbot',
    appKey: '123',
    secret: '123',
    accessToken: '123',
    accessTokenSecret: '123'
};

// create the connection object
const connection = lpm.createConnection({
    appId: 'quick_start',
    accountId,
    userType: lpm.UserType.BRAND,
    authData
});

// setup the conversation event
// this event will fire whenever the bot is informed of a new conversation
connection.on('conversation', async conversation => {
    console.log("new conv");

    try {
        await conversation.join("AGENT");
    } catch (e) {
        console.log("Can't join conv. Maybe I already joined?");
    }


    // listen for messages
    conversation.on('message', async message => {
        if (message.participant.role === "AGENT") {
            return;
        }
        const text = message.body;
        console.log(`Received a new message with body: ${text} and metadata ${JSON.stringify(message.metadata)}`);
       
        if (text === "Hi") {
            await conversation.sendMessage('Hello!');
        } else {
            await conversation.sendMessage(text);
        } 

    });

    // listen for the close event
    conversation.on('close', () => {
        console.log('conversation closed');
    });

});


// Call start
(async () => {
    await connection.open();
    console.log(connection.state);
    connection.defaultSubscription.on('notification', notification => {
        //console.log(JSON.stringify(notification));
    });
})();
