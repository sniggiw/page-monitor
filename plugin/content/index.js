const monitor = new Monitor()

const EventFromWebPage = 'EventFromWebPage'
const EventFromChrome = 'EventFromChrome'

// 之所以使用 window.onload，是因为每次跳转新页面时都会生效，
// 而如果是根据该谷歌插件跳转新页面时，都会触发 openNewTab 事件，从而可以获取到对应的 tabId
window.onload = function () {
  chrome.runtime.sendMessage(
    {
      type: 'tabInitSelect',
    },
    function (response) {
      console.log(response)
    }
  )
}

// 接收 web 端发送的通知
document.addEventListener('EventFromWebPage', function (e) {
  //   console.log('来自 web 端', e)
  const type = e.detail.type
  switch (type) {
    case 'open':
      openNewPage(e)
      break
  }
})

// 向 web 端发送通知
function sendMessageExtend(eventName, params) {
  const EventFromChrome = new CustomEvent(eventName, {
    detail: params,
  })
  document.dispatchEvent(EventFromChrome)
}

// 向 background 发送通知
function openNewPage(e) {
  chrome.runtime.sendMessage({ ...e.detail, type: 'openNewTab', current_url: window.location.href }, function (response) {
    // console.log('content_openNewPage 事件 - 接受返回值', response)
  })
}

// 注册事件监听器（接收 background 发送过来的通知）
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.type) {
    case 'initSelect':
      handleInitSelect(request)
      break
    case 'openSucceed':
      handleOpenSucceed(request)
      break
    default:
      console.log('unknown request type:', request.type)
  }
})

// 处理监听页面的初始化（初始化  monitorTool dom）
function handleInitSelect(request) {
  console.log('params', request)
  monitor.initSelectPanel(request)
}

// 处理监听成功（保存监控任务）
function handleOpenSucceed(request) {
  sendMessageExtend(EventFromChrome, request)
}
