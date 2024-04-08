// 当前监听的网页对象、web 端传递过来的 request、web 端的 url
var currentOpenTab = {}
var currentOpenReq = {}
var currentUrl = ''

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.type) {
    case 'openNewTab':
      handleOpenNewTab(request, sender, sendResponse)
      break
    case 'tabInitSelect':
      tabInitSelect(request, sender, sendResponse)
      break
  }
  return true // 表示异步发送响应
})

// 根据传递过来的 monitor_url，在新的窗口打开（跳转网页）
function handleOpenNewTab(request, sender, sendResponse) {
  chrome.tabs.create({ url: request.monitor_url }, (newTab) => {
    currentOpenTab = newTab
    currentOpenReq = request
    currentUrl = request.current_url
  })
  sendResponse({ msg: '打开监听url页面成功' })
}

// 根据传递过来的 monitor_url，在新的窗口打开（跳转网页），tab 页面初始化 initSelect 事件
function tabInitSelect(request, sender, sendResponse) {
  if (!currentOpenTab.id) return
  // chrome.tabs.sendMessag 需要先获取到 tabId，第二个参数会被 content 事件监听器中的 request 接收到
  chrome.tabs.sendMessage(
    currentOpenTab.id,
    {
      type: 'initSelect',
      monitor_url: currentOpenReq.monitor_url,
      monitor_type: currentOpenReq.monitor_type,
    },
    () => {}
  )
  sendResponse({ msg: 'initSelect' })
}
