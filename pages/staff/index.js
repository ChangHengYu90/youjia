// pages/mendian/index.js
var template = require('../../template/index.js');
const util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    page:1,
    name:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    template.tabbar("tabBar",2, this)//0表示第一个tabbar
    that.getlist()
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
    that.getlist()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getlist(){
    var that = this
    let name = that.data.name
    let page = that.data.page
    let userid = wx.getStorageSync('user').id
    let foptions = [
      'institutionId' + userid,
      'page' + page,
    ]
    let data = {
      institutionId: userid,
      page: page, 
    }
    if (name!=''){
      foptions.push('key'+name)
      data.key = name
    }

    util.requestLoading(that.data.apis + '/api/user/mybrokerlist.aspx', foptions, data, '', function (res) {
      console.log(res)

      if (res.code == '200') {
        let shuju = res.data
        for (let i = 0; i < shuju.length;i++){
          shuju[i].name = decodeURIComponent(shuju[i].name)
          shuju[i].storeName = decodeURIComponent(shuju[i].storeName)
        }
        if(page==1){
          that.setData({
            list: shuju
          })
        }else{
          that.setData({
            list: that.data.list.concat(shuju)
          })
        }
        

      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    }, function (res) {
      console.log(res)
    })
  },
  golookxq(e){
    wx.navigateTo({
      url: '../staffxq/index?id='+e.currentTarget.id,
    })
  },
  gosearch(e){
    let that = this
    that.setData({
      name:e.detail.value
    })
    that.getlist()
  }
})