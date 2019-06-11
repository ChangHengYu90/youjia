var app = getApp()
const util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    array: ['美的乐城', '弘阳结庐'],
    index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this
     that.setData({
       lpname:options.name,
       id:options.id
     })
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
  hqname(e){
    var that = this
    that.setData({
      name: e.detail.value.replace(/(^\s*)/g, "")
    })
  },
  hqphone(e) {
    var that = this
    that.setData({
      phone: e.detail.value
    })
  },
  submit(){
    var that = this
    let name = that.data.name
    let phone = that.data.phone
    let id = that.data.id
    let leadId = wx.getStorageSync('user').id
    if (name == '' || name == undefined || name==null){
       wx.showToast({
         title: '请输入姓名',
         icon:'none',
         duration: 1000,
         mask: true
       })
       return
    }
    if (phone == '' || phone == undefined || phone==null) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    if (!(/^1[345789]\d{9}$/.test(phone))) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    if (phone.length != 11) {
      wx.showToast({
        title: '手机号长度有误',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    let foptions = [
      'leadId' + leadId,
      'housingResourcesId' + id,
      'name' + name,
      'mobile' + phone,
    
    ]
    let data = {
      leadId: leadId,
      housingResourcesId: id,
      name: name,
      mobile: phone,

    }
    util.requestLoading(that.data.apis + '/api/project/addpropertyconsultant.aspx', foptions, data, '加载中...', function (res) {
      console.log(res)
      wx.showToast({
        title: res.message,
        icon: 'none',
        duration: 1000
      })
      if (res.code == '200') {
      wx.navigateBack({
        
      })

      } else {

      }
    }, function (res) {
      console.log(res)
    })
  }
})