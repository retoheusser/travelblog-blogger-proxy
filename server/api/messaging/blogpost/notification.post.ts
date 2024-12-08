import { firebaseMessaging } from '~/server/utils/firebase'

export default eventHandler(async (event) => {
  const { title, body, imageUrl } = await readBody<{ title: string, body: string, imageUrl: string }>(event)

  const response = await firebaseMessaging.send({
    topic: 'new_blogpost',
    notification: {
      title,
      body,
      imageUrl: imageUrl,
    },
    webpush: {
      fcmOptions: {
        link: 'https://we-re.at',
      },
    },
  })

  console.log('Successfully sent message:', response)

  return sendNoContent(event)
})
