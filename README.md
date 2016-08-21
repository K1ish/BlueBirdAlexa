# BlueBirdAlexa
A node.js program used to integrate twitter with amazon echo
# Requirements
Node.js 4.x.x or above (https://nodejs.org/)
Port 80 open on your router (or use ngrok)
An Amazon account
An Amazon Echo
# Usage
Run Bluebird32bit.exe or bluebird64bit.exe
configure network correctly
Add it with Amazon (below)
# Adding the app with your Amazon account
Go to developer.amazon.com and sign in, once signed in hit "Alexa"
Click "Get started" on the Skills kit
Add a new skill
In name type whatever you want
In invocation name type Bluebird
Click next,
Here is the intent code:
```json
{
  "intents": [
    {
      "intent": "GetLastTweet",
      "slots": [
        {
          "name": "AccountName",
          "type": "AMAZON.LITERAL"
        }
      ]
    },
    {
      "intent": "GetFollowers",
      "slots": [
        {
          "name": "AccountName",
          "type": "AMAZON.LITERAL"
        }
      ]
    }
  ]
}
```
Here are some sample utterances, add more if you want:
```txt
GetLastTweet for the last tweet from {account name|AccountName}
GetLastTweet what is the last tweet from {account name|AccountName}
GetLastTweet read me the last tweet from {account name|AccountName}
GetLastTweet tell me the last tweet from {account name|AccountName}
GetFollowers how many followers does {account name|AccountName} have
GetFollowers how many followers does {account name|AccountName} have on twitter
GetFollowers how many followers {account name|AccountName} has
```
Go to next
Select HTTPS
Put your site you are hosting it on, beginning with https://
Don't enable account linking
Finish the rest yourself
