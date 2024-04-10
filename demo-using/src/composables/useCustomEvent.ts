export default () => {
  const EventFromWebPage = 'EventFromWebPage'
  const EventFromChrome = 'EventFromChrome'

  const sendMessageToExtend = (params: object) => {
    const eventFromWeb = new CustomEvent(EventFromWebPage, { detail: params })
    document.dispatchEvent(eventFromWeb)
  }

  const onMessageExtend = (cb: Function) => {
    document.addEventListener(
      EventFromChrome,
      (e) => {
        cb(e)
      },
      false
    )
  }

  return {
    sendMessageToExtend,
    onMessageExtend,
  }
}
