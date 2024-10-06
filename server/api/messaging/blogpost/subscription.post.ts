import { firebaseMessaging } from '~/server/utils/firebase'

export default eventHandler(async (event) => {
  const body = await readBody<{ token: string }>(event)

  await firebaseMessaging.subscribeToTopic(body.token, 'new_blogpost')
  console.log('subscribed to topic new_blogpost')

  return sendNoContent(event)
})
