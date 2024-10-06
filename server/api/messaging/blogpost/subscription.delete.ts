import { firebaseMessaging } from '~/server/utils/firebase'

export default eventHandler(async (event) => {
  const body = await readBody<{ token: string }>(event)

  await firebaseMessaging.unsubscribeFromTopic(body.token, 'new_blogpost')
  console.log('unsubscribed from topic new_blogpost')

  return sendNoContent(event)
})
