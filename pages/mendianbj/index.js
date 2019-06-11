var app = getApp();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    page:1,
   
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      id: options.id,
      name: options.name
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
  
    that.getyglist()
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
  getyglist(){
    var that = this
    let name = that.data.name
    let page = that.data.page
    let userid = wx.getStorageSync('user').id
    let id = that.data.id
    let foptions = [
      'institutionId' + userid,
      'storeid' + id,
      'page' + page,
    ]
    let data = {
      institutionId: userid,
      storeid: id,
      page: page,
    }
    util.requestLoading(that.data.apis + '/api/user/storebrokerlist.aspx', foptions, data, '', function (res) {
      console.log(res)
   
      if (res.code == '200') {
        let shuju = res
        for (let i = 0; i < shuju.data.length;i++){
          shuju.data[i].name = decodeURIComponent(shuju.data[i].name)
        }
        that.setData({
          mdlist:res
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
  getmdxx(){
    var that = this
    let name = '徐州亿网'
    let id = that.data.id
    let userid = wx.getStorageSync('user').id
    let foptions = [
      'institutionId' + userid,
      'id' + id,
      'name' + name,
    ]
    let data = {
      institutionId: userid,
      id: id,
      name: name,
    }

    util.requestLoading(that.data.apis + '/api/user/addstore.aspx', foptions, data, '', function (res) {
      console.log(res)
      
      if (res.code == '200') {
        
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
  // 换门店
  gomdgh(e){
    var that =  this
    let name = that.data.name
    wx.navigateTo({
      url: '../mendiangh/index?name=' + name + '&id=' + e.currentTarget.id + '&ygname=' + e.currentTarget.dataset.name + '&phone=' + e.currentTarget.dataset.phone + '&headimg=' + e.currentTarget.dataset.headimg+"&mdid="+that.data.id,
    })
  },
  goygadd(){
    wx.navigateTo({
      url: '../addyg/index?id='+this.data.id,
    })
  },
  godel(e){
   var that = this
   let id = e.currentTarget.id
    let userid = wx.getStorageSync('user').id
    let foptions = [
      'institutionId' + userid,
      'brokerId' + id,
   
    ]
    let data = {
      institutionId: userid,
      brokerId: id,
   
    }

    util.requestLoading(that.data.apis + '/api/user/deletestorebroker.aspx', foptions, data, '', function (res) {
      console.log(res)
      wx.showToast({
        title: res.message,
        icon: 'none',
        duration: 1000,
        mask: true
      })
      if (res.code == '200') {
        that.getyglist()
      } else {
        
      }
    }, function (res) {
      console.log(res)
    })
  },
  xgname(e){
    var that = this
    let name = e.detail.value
    let id = that.data.id
    let userid = wx.getStorageSync('user').id
    let foptions = [
      'institutionId' + userid,
      'id' + id,
      'name' + name,
    ]
    let data = {
      institutionId: userid,
      id: id,
      name: name,
    }

    util.requestLoading(that.data.apis + '/api/user/addstore.aspx', foptions, data, '', function (res) {
      console.log(res)

      if (res.code == '200') {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1000,
          mask: true
        })
        that.setData({
          name: name,
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
  }
})