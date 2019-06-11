var template = require('../../template/index.js');
const util = require('../../utils/util.js');
var app = getApp();
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
    var that = this
    that.setData({
      lpname: options.name
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
  hqphone(e){
    var that = this
    that.setData({
      phone: e.detail.value
    })
  },
  hqgjjl(e) {
    var that = this
    that.setData({
      content: e.detail.value
    })
  },
  submit(){
    var that = this
    let name = that.data.name
    let phone = that.data.phone
    let content = that.data.content
    let institutionId = wx.getStorageSync('user').id
    var phoneRexp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if (name == '' || name == undefined || name == null) {
      wx.showToast({
        title: '请先填写姓名',
        icon: 'none',
        duration: 1500,
      })
      return
    }
    if (phone == '' || phone == undefined || phone == null) {
      wx.showToast({
        title: '请先填写手机号',
        icon: 'none',
        duration: 1500,
      })
      return
    }
    console.log(phoneRexp.test(phone))
    if (!phoneRexp.test(phone)) {
      wx.showToast({
        title: '手机号格式有误！',
        icon: 'none',
        duration: 1500,
      })
      return

    }
    let foptions = [
      'name' + name,
      'propertyconsultantId' + institutionId,
      'mobile' + phone
    ]
    let data = {
      propertyconsultantId: institutionId,
      name: name,
      mobile: phone
    }
    util.requestLoading(that.data.apis + '/api/user/addcustomer.aspx', foptions, data, '', function (res) {
      console.log(res)
      wx.showToast({
        title: res.message,
        icon: 'none',
        duration: 1000
      })
      if (res.code == '200') {
         setTimeout(function(){
           wx.navigateBack({
             
           })
         },1000)


      } else {
       
      }

    }, function (res) {
      console.log(res)
    })
  }
})