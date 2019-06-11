const util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    state:0,
    page:1,
    khmsid:0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      id: options.id
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
   var that = this
    that.getshuju()
    that.getlist()
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
      page: yeshu
    })
    that.getlist() 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getshuju() {
    var that = this
    let id = that.data.id
    let userid = wx.getStorageSync('user').id
    let foptions = [
      'institutionId' + userid,
      'brokerId' + id,
    ]
    let data = {
      institutionId: userid,
      brokerId: id,
    }
    util.requestLoading(that.data.apis + '/api/user/brokerreportdetail.aspx', foptions, data, '', function (res) {
      console.log(res)

      if (res.code == '200') {
        let shuju = res.data
        shuju.user.name = decodeURIComponent(shuju.user.name)
        shuju.user.storeName = decodeURIComponent(shuju.user.storeName)
        that.setData({
          usexx: shuju
        })
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
  getlist() {
    var that = this
    let id = that.data.id
    let userid = wx.getStorageSync('user').id
    let state = that.data.state
    let page = that.data.page
    let foptions = [
      'institutionId' + userid,
      'brokerId' + id,
      'state' + state,
      'page'+page
    ]
    let data = {
      institutionId: userid,
      brokerId: id,
      state: state,
      page: page
    }
    util.requestLoading(that.data.apis + '/api/user/brokerreportlist.aspx', foptions, data, '', function (res) {
      console.log(res)

      if (res.code == '200') {
        let shuju = res.data
        for (let i = 0; i < shuju.length;i++){
          shuju[i].name = decodeURIComponent(shuju[i].name)
          shuju[i].hourseName = decodeURIComponent(shuju[i].hourseName)
        }
        if (page==1){
          that.setData({
            list: shuju,
            listout: res
          })
        }else{
          that.setData({
            list: that.data.list.concat(shuju),
            listout: res
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
  gohd(e){
    let that = this
    let user = that.data.usexx.user
    wx.navigateTo({
      url: '../mendiangh/index?name=' + user.storeName + '&id=' + that.data.id+ '&ygname=' + user.name + '&phone=' + user.mobile + '&headimg=' + user.headImg + '&mdid=5',
    })
  },
  goqhtype(e) {
    var that = this
    that.setData({
      state: e.currentTarget.id,
      page: 1,

    })
    that.getlist()
  },
  godel(e) {
    var that = this
    let bbid = e.currentTarget.id
    let id = that.data.id
    let foptions = [
      'brokerId' + id,
      'id' + bbid,

    ]
    let data = {
      brokerId: id,
      id: bbid,
    }

    util.requestLoading(that.data.apis + '/api/user/deletereport.aspx', foptions, data, '', function (res) {
      console.log(res)
      wx.showToast({
        title: res.message,
        icon: 'none',
        duration: 1000
      })
      if (res.code == '200') {
        that.setData({
          page: 1,
          
        })
        that.getlist()
      } else {

      }
    }, function (res) {
      console.log(res)
    })
  },
  closekhms() {
    var that = this
    that.setData({
      khmsid: 0
    })
  },
  showkhms() {
    var that = this
    that.setData({
      khmsid: 1
    })
  }
})