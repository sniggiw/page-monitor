// const EventFromWebPage = 'EventFromWebPage'

// const sendMessageToExtend = (params: object) => {
//   const eventFromWeb = new CustomEvent(EventFromWebPage, { detail: params })
//   document.dispatchEvent(eventFromWeb)
// }

// export { sendMessageToExtend }

export default () => {
  const EventFromWebPage = 'EventFromWebPage'

  const sendMessageToExtend = (params: object) => {
    const eventFromWeb = new CustomEvent(EventFromWebPage, { detail: params })
    document.dispatchEvent(eventFromWeb)
  }

  return {
    sendMessageToExtend,
  }
}
