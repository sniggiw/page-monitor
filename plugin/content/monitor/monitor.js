class Monitor {
  constructor() {
    this.monitor_panel
    this.confirmBtn
    this.cancelBtn

    this.monitorSelectBox = this.createMonitorSelectBox()
    // 修改 this 指向
    this.mouseoverHandler = this.mouseoverHandler.bind(this)
    this.mouseoutHandler = this.mouseoutHandler.bind(this)
  }

  // 创建监控面板
  createMonitorPanel(monitor_type) {
    const monitor_panel = document.createElement('div')
    const monitor_text = document.createElement('span')
    const btnContainer = document.createElement('div')
    const confirmBtn = document.createElement('div')
    const cancelBtn = document.createElement('div')

    monitor_panel.className = 'monitor_panel'
    monitor_text.className = 'monitor_text'
    btnContainer.className = 'monitor_btn-container'
    confirmBtn.className = 'monitor_confirm monitor_btn monitor_confirm_not'
    cancelBtn.className = 'monitor_cancel monitor_btn'

    monitor_text.textContent = `当前您正在进行 ${monitor_type == 1 ? '内容监控' : '数值监控'}`
    confirmBtn.textContent = '保存监控任务'
    cancelBtn.textContent = '取消'

    // data- 自定义的属性，在 dom 对象上一律以 dataset 对象方式获取
    confirmBtn.dataset.specialClick = 'true'
    cancelBtn.dataset.specialClick = 'true'

    btnContainer.appendChild(confirmBtn)
    btnContainer.appendChild(cancelBtn)
    monitor_panel.appendChild(monitor_text)
    monitor_panel.appendChild(btnContainer)
    this.confirmBtn = confirmBtn
    this.cancelBtn = cancelBtn

    cancelBtn.addEventListener('click', (event) => {
      event.stopPropagation()
      window.close()
    })

    confirmBtn.addEventListener('click', (event) => {
      event.stopPropagation()
      if (event.target.classList.contains('monitor_confirm_not')) return
    })

    document.body.appendChild(monitor_panel)

    return monitor_panel
  }

  // 初始化监控面板
  initSelectPanel(params) {
    const { monitor_type } = params
    this.monitor_panel = this.createMonitorPanel(monitor_type)
    this.addEventListeners()
  }

  // 创建 dom 元素选择框
  createMonitorSelectBox() {
    const monitorSelectBox = document.createElement('div')
    monitorSelectBox.className = 'monitor_select-box'
    document.body.appendChild(monitorSelectBox)
    return monitorSelectBox
  }

  // 创建 dom 元素选择框后，鼠标移动事件
  mouseoverHandler(event) {
    const target = event.target
    // 获取元素的位置信息
    const targetInfo = target.getBoundingClientRect()
    this.monitorSelectBox.style.display = 'block'
    this.monitorSelectBox.style.width = targetInfo.width + 'px'
    this.monitorSelectBox.style.height = targetInfo.height + 'px'
    this.monitorSelectBox.style.top = targetInfo.top + window.scrollY + 'px'
    this.monitorSelectBox.style.left = targetInfo.left + window.scrollX + 'px'
  }

  // 创建 dom 元素选择框后，鼠标移出事件
  mouseoutHandler() {
    this.monitorSelectBox.style.display = 'none'
  }

  addEventListeners() {
    document.addEventListener('mouseover', this.mouseoverHandler)
    document.addEventListener('mouseout', this.mouseoutHandler)
  }
}
