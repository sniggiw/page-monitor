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
    case 'openSucceed':
      handleOpenSucceed(request, sender, sendResponse)
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

// 保存监控任务
function handleOpenSucceed(request, sender, sendResponse) {
  /**
   * 1. 获取到 web 页面的 tabId
   * 2. 利用 chrome.tabs.update 进行页面跳转，跳转回到 web 页面（根据步骤1拿到的 tabId）
   * 3. 同时给 web 页面的 content 发送通知
   */

  // 获取到 web 页面的 tabId
  chrome.tabs.query({ url: currentUrl }, function (tab) {
    if (tab.length <= 0) return
    const webTab = tab[0]
    // 跳转页面，第一个参数是跳转页面的 tabId，第二个参数是设置标签选项卡的属性，我们将其设置为激活状态
    chrome.tabs.update(webTab.id, { active: true }, function () {
      chrome.tabs.sendMessage(webTab.id, request, (response) => {})
    })
  })

  sendResponse({ msg: 'openSucceed' })
}
