var template = require('../../template/index.js');
const util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    dktype: 2,
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
  choosetype(e) {
    var that = this
    let id = e.currentTarget.id
    that.setData({
      dktype: id
    })
  },
  hqyqm(e){
    var that = this
    console.log(e.detail.value)
    that.setData({
      yqm:e.detail.value
    })
  },
  submit() {
    var that = this
    let institutionId = wx.getStorageSync('user').id
    let typeid = that.data.dktype
    let yqm = that.data.yqm
    console.log(yqm)
    if(yqm==''||yqm==undefined||yqm==null){
       wx.showToast({
         title: '请填写邀请码',
         icon:'none',
         duration:1000,
         mask:true
       })
       return
    }
    let foptions = [
      'brokerId' + institutionId,
      'type' + typeid,
      'inviteCode' + yqm
    ]
    let data = {
      brokerId: institutionId,
      type: typeid,
      inviteCode:yqm
    }
    util.requestLoading(that.data.apis + '/api/user/changeinstitution.aspx', foptions, data, '', function (res) {
      console.log(res)
      if (res.code == '200') {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1000
        })
        setTimeout(function(){
          wx.navigateBack({
            delta: 1,
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
  },
})