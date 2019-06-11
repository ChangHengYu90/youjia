
var app = getApp()
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  yuanpwd(e){
   var that = this
   let ypwd = e.detail.value
   that.setData({
     ypwd: ypwd.replace(/\s+/g, '')
   })
  },
  newpwd(e) {
    var that = this
    let npwd = e.detail.value
    that.setData({
      npwd: npwd.replace(/\s+/g, '')
    })
  },
  querpwd(e) {
    var that = this
    let qpwd = e.detail.value
    that.setData({
      qpwd: qpwd.replace(/\s+/g, '')
    })
  },
  submit(){
    var that = this
    let ypwd = that.data.ypwd
    let npwd = that.data.npwd
    let qpwd = that.data.qpwd
    let user = wx.getStorageSync('user')
    if (ypwd == '' || ypwd == undefined || ypwd==null){
      wx.showToast({
        title: '请输入原密码',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    if (npwd == '' || npwd == undefined || npwd == null) {
      wx.showToast({
        title: '请输入新密码',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    if (npwd.length<6) {
      wx.showToast({
        title: '密码长度太短',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    if (qpwd == '' || qpwd == undefined || qpwd == null) {
      wx.showToast({
        title: '请输入确认密码',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    if (qpwd != npwd) {
      wx.showToast({
        title: '确认密码不一致',
        icon: 'none',
        duration: 1000,
        mask:true
      })
      return
    }
    let terminal = 1
    if (user.role==4){
      terminal = 2
    }
    if (user.role == 5) {
      terminal = 3
    }
    let oldpwd = ypwd + '3c4510874e6407bf53bbe'
    oldpwd = util.md5(oldpwd).toLocaleLowerCase()
    let newpwd = npwd + '3c4510874e6407bf53bbe'
    newpwd = util.md5(newpwd).toLocaleLowerCase()
    let foptions = [
    
      'uid' + user.id,
      "oldpwd" + oldpwd,
      "newpwd" + newpwd,
      'terminal' + terminal

    ]
    let data = {
      uid: user.id,
      oldpwd: oldpwd,
      newpwd: newpwd,
      terminal: terminal
    }
    util.requestLoading(that.data.apis + '/api/user/modifypwd.aspx', foptions, data, '', function (res) {
      console.log(res)
      if (res.code == '200') {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1000
        })
        setTimeout(function(){
          wx.navigateBack({
            delta:1
          })
        },1000)

      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1000
        })
      }

    }, function (res) {
      console.log(res)
    })
  }
})