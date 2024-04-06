const EventFromWebPage = 'EventFromWebPage'

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

// 向 background 发送通知
function openNewPage(e) {
  chrome.runtime.sendMessage({ ...e.detail, type: 'openNewTab' }, function (response) {
    // console.log('content - openNewPage', response)
  })
}
