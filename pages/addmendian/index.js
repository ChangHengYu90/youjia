var app = getApp()
const util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    name:'',

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
  hqmdname(e){
    var that = this
    let con = e.detail.value
    that.setData({
      name: con.replace(/\s+/g, '')
    })
  },
  submit(){
    var that = this
    let name = that.data.name
    if(name==''){
      wx.showToast({
        title: '请输入门店名称',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    let userid = wx.getStorageSync('user').id
    let foptions = [
      'institutionId' + userid,
      'name' + name,
    ]
    let data = {
      institutionId: userid,
      name: name,
    }

    util.requestLoading(that.data.apis + '/api/user/addstore.aspx', foptions, data, '', function (res) {
      console.log(res)
      wx.showToast({
        title: res.message,
        icon: 'none',
        duration: 1000,
        mask: true
      })
      if (res.code == '200') {
        setTimeout(function(){
          wx.navigateBack({
            delta:1
          })
        },1000)
      } else {

      }
    }, function (res) {
      console.log(res)
    })

  }
})