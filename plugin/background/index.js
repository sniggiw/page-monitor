chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.type) {
    case 'openNewTab':
      handleOpenNewTab(request, sender, sendResponse)
      break
  }
  return true // 表示异步发送响应
})

// 根据传递过来的 monitor_url，在新的窗口打开（跳转网页）
function handleOpenNewTab(request, sender, sendResponse) {
  chrome.tabs.create({ url: request.monitor_url }, (newTab) => {
    // console.log('newTab', newTab)
    // console.log('request', request)
    // console.log('sender', sender)
    // console.log('sendResponse', sendResponse)
  })
}
