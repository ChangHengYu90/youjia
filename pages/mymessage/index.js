var template = require('../../template/index.js');
const util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    page:1

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getxxlist()
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
  var that = this
  let yeshu = parseInt(that.data.page)+1
  that.setData({
    page:yeshu
  })
    that.getxxlist()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getxxlist(){
    var that = this
    let page = that.data.page
    let brokerId = wx.getStorageSync('user').id
    let foptions = [
      'brokerId' + brokerId,
      'page' + page
    ]
    let data = {
      brokerId: brokerId,
      page: page
    }
    util.requestLoading(that.data.apis + '/api/user/mymaillist.aspx', foptions, data, '', function (res) {
      console.log(res)
      if (res.code == '200') {
        let shuju = res.data
        for(let i=0;i<shuju.length;i++){
          shuju[i].content = decodeURIComponent(shuju[i].content)
        }
        if (page==1){
          that.setData({
            messagelist: shuju
          })
        }else{
          that.setData({
            messagelist: that.data.messagelist.concat(shuju)
          })
        }
      
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