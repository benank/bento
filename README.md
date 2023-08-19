# bento 🍱

<img src='static/favicon.jpg' height='150'></h1>

Your personal AI cooking companion. Simply talk to it, and it'll talk back to you and help you cook anything!

This is a web app that uses OpenAI's ChatGPT (gpt-3.5-turbo) and Whisper APIs for AI chat and voice-to-text. It also uses PlayHT's text-to-voice API when reading the generated responses.

## Setup

1. Clone this repository.
2. Run `npm install`
1. Create a `.env.local` file with the following contents:
```
OPENAI_API_KEY=...
PLAYHT_USER_ID=...
PLAYHT_API_KEY=...
PLAYHT_VOICE_ID=...
PASSCODE=...
```
4. Generate a OpenAI key here: https://platform.openai.com/account/api-keys
2. If you haven't already, enable billing to **Pay as you go** here: https://platform.openai.com/account/billing/overview

> **Warning**
> If you don't enable billing and switch to **Pay as you go**, calls to OpenAI's API may not work.

6. Add your OpenAI API key to `.env.local` under `OPENAI_API_KEY`
4. Get your PlayHT user id and secret key from here: https://play.ht/studio/api-access
5. Add your PlayHT user id and secret key to `.env.local` under `PLAYHT_USER_ID` and `PLAYHT_VOICE_ID`.
6. Next, we'll need to create a voice clone. Create a new [voice clone on PlayHT](https://play.ht/studio/voice-cloning).
7. Once your voice clone is ready, hit "Use".
8. A new page will open up with your voice. In the URL, there's an ID for your cloned voice (after the `voice=` part):

```
https://play.ht/studio/files/d0ac64d9-197e-4c75-bd54-557b8faeac96?voice=s3%3A%2F%2Fvoice-cloning-zero-shot%2Ff2f0dc91-dd56-4625-ac3c-30bbf1650962%2Fbento%2Fmanifest.json
```
9. Copy all the text after `voice=` and decode it using a URL decoder, such as [urldecoder.io](https://www.urldecoder.io/). The result should look something like this:
```
s3://voice-cloning-zero-shot/f2f0dc91-dd56-4625-ac3c-30bbf1650962/bento/manifest.json
```
10. Add that voice id to `.env.local` under `PLAYHT_VOICE_ID`
11. (optional) Set a passcode to be used in production mode. This will prevent anyone from using your app unless they enter the correct passcode. You can set this in your hosting provider's environment variables under `PASSCODE`
12. Run the app: `npm run dev`
13. You should be able to record your voice to talk to Bento, which will then respond to you with text and an AI voice!