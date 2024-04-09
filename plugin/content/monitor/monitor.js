class Monitor {
  constructor() {
    this.monitor_panel
    this.confirmBtn
    this.cancelBtn

    this.monitorSelectBox = this.createMonitorSelectBox()
    // 修改 this 指向
    this.mouseoverHandler = this.mouseoverHandler.bind(this)
    this.mouseoutHandler = this.mouseoutHandler.bind(this)

    this.xpath = []
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
    // 后续用于页面自身的点击事件
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
      if (event.target.classList.contains('monitor_confirm_not')) return
      event.stopPropagation()
    })

    document.body.appendChild(monitor_panel)

    return monitor_panel
  }

  // 初始化监控面板
  initSelectPanel(params) {
    const { monitor_type } = params
    this.monitor_panel = this.createMonitorPanel(monitor_type)
    this.addEventListeners()

    // 点击元素时
    document.addEventListener(
      'click',
      (event) => {
        // 判断是否为元素节点 event.target.nodeType 为 1 时表明是元素节点
        let element = event.target.nodeType === 1 ? event.target : event.target.parentElement
        if (!element) return

        // 阻止页面元素本身的点击事件
        if (!element.dataset.specialClick) {
          event.preventDefault()
          event.stopPropagation()
        }

        // 获取元素的 xpath 路径
        if (!element.dataset.specialClick) {
          const xpath = `/html/${this.getXPath(event.target)}`
          const isExistXPath = this.xpath.indexOf(xpath)

          console.log('XPath', this.xpath)

          // toggle active 类
          if (element.classList.contains('monitor_select_active')) {
            // 如果存在，则删除该类
            element.classList.remove('monitor_select_active')
            this.xpath.splice(isExistXPath, 1)
          } else {
            // 因为数值监控时，只能选择一个元素进行监控，因此如果 monitor_type 为数值类型时，需要先将所有的 active 类清除掉再进行添加
            if (monitor_type == 2) {
              const allSelectItem = document.querySelectorAll('.monitor_select_active')
              allSelectItem.forEach((el) => {
                el.classList.remove('monitor_select_active')
              })
            }
            // 如果不存在，则添加该类
            element.classList.add('monitor_select_active')

            this.xpath.push(xpath)
          }

          if (this.xpath.length === 0) {
            this.confirmBtn.classList.add('monitor_confirm_not')
          } else {
            this.confirmBtn.classList.remove('monitor_confirm_not')
          }
        }
      },
      true // 捕获阶段执行
    )
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

  // 获取 xpath 路径
  getXPath(element) {
    if (element === document.body) return element.tagName.toLowerCase()

    // 同类型元素的位置
    let ix = 0

    const siblings = element.parentNode.childNodes

    for (let i = 0; i < siblings.length; i++) {
      const sibling = siblings[i]

      if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++

      if (sibling === element) return this.getXPath(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix + 1) + ']'
    }
  }
}
