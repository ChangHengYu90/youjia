// pages/login/index.js
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
      var that = this
      that.setData({
        id: options.id
      })
    that.getloupan()
    that.getallpic()
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
  onShareAppMessage: function (ops) {
  
  },
  getallpic() {
    var that = this
    let id = that.data.id
    let foptions = [
      'id' + id,
    ]
    let data = {
      id: id,
    }
    util.requestLoading(that.data.apis + '/api/hourse/albumlist.aspx', foptions, data, '', function (res) {
      console.log(res)
      if (res.code == '200') {
        // that.setData({
        //   alllist: res.data
        // })
        let shuju = res.data
        let loupanpic = []
        for (let i = 0; i < shuju.length; i++) {
          for (let j = 0; j < shuju[i].imageList.length; j++) {
            loupanpic.push(shuju[i].imageList[j])
          }
        }
        that.setData({
          loupanpic: loupanpic
        })


      } else {

      }

    }, function (res) {
      console.log(res)
    })
  },
  getloupan(){
   var that = this
    let userid = wx.getStorageSync('user').id
    let foptions = [
      'id' + that.data.id,
      'leadId' + userid
    ]
    let data = {
      id: that.data.id,
      leadId: userid
    }

    util.requestLoading(that.data.apis + '/api/project/hoursedetail.aspx', foptions, data, '', function (res) {
      console.log(res)
      if (res.code == '200') {
        let shuju = res.data
        // shuju.accurateCustomer = decodeURIComponent(shuju.accurateCustomer)
        shuju.address = decodeURIComponent(shuju.address)
        shuju.developer = decodeURIComponent(shuju.developer)
        shuju.name = decodeURIComponent(shuju.name)
        shuju.parkingPlace = decodeURIComponent(shuju.parkingPlace)
        // shuju.rateIntroduce = decodeURIComponent(shuju.rateIntroduce)
        shuju.salesOfficeAddress = decodeURIComponent(shuju.salesOfficeAddress)

        shuju.newsFirst.title = decodeURIComponent(shuju.newsFirst.title)
        // shuju.rateIntroduce1 = decodeURIComponent(shuju.rateIntroduce1)
        // shuju.rateIntroduce2 = decodeURIComponent(shuju.rateIntroduce2)
        // shuju.rateIntroduce3 = decodeURIComponent(shuju.rateIntroduce3)
        // for (let j = 0; j < shuju.recList.length; j++) {
        //   shuju.recList[j].name = decodeURIComponent(shuju.recList[j].name)
        // }
        wx.setStorageSync('loupan', shuju)
        that.setData({
          loupan: shuju
        })

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
  gollokyj(e){
    var that = this
    let shuju = that.data.loupan
    let id = e.currentTarget.id
    if(id==1){
      wx.navigateTo({
        url: '../yjgz/index?type=1&gz=' + shuju.rateIntroduce1 + '&phone=' + shuju.leadingOfficialMobile + '&rate=' + encodeURIComponent(shuju.rate1)
      })
    }
    if (id == 2) {
      wx.navigateTo({
        url: '../yjgz/index?type=1&gz=' + shuju.rateIntroduce2 + '&phone=' + shuju.leadingOfficialMobile + '&rate=' + encodeURIComponent(shuju.rate2)
      })
    }
    if (id == 3) {
      wx.navigateTo({
        url: '../yjgz/index?type=1&gz=' + shuju.rateIntroduce3 + '&phone=' + shuju.leadingOfficialMobile + '&rate=' + encodeURIComponent(shuju.rate3)
      })
    }
    
  },
  golookqk(){
    var that = this
    let shuju = that.data.loupan
    wx.navigateTo({
      url: '../qkgz/index?type=1&gz=' + shuju.accurateCustomer + '&phone=' + shuju.leadingOfficialMobile
    })
  },
  bdphone(){
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.loupan.leadingOfficialMobile,
    })
  },
  goyibaobei(e){
    var that = this
    let id = e.currentTarget.id
    if(id==0){
      wx.showToast({
        title: '暂无报备数据',
        icon:'none',
        duration:1000,
        mask:true
      })
      return
    }
    wx.navigateTo({
      url: '../yibaobei/index?id='+that.data.id,
    })
  },
  gobaobeikh(){
    var that = this
    wx.navigateTo({
      url: '../baobeikh/index?id=' + that.data.id + '&name=' + that.data.loupan.name,
    })
  },
  goguanzhu(e){
    var that = this
    let userid = wx.getStorageSync('user').id
    let id = that.data.id
    let type = 0
    let isFollow = e.currentTarget.dataset.isfollow
    console.log(e)
    if (isFollow==0){
      type = 1
    }
    let foptions = [
      'id' + id,
      'brokerId' + userid,
      'type' + type
    ]
    let data = {
      id: id,
      brokerId: userid,
      type: type
    }

    util.requestLoading(that.data.apis + '/api/hourse/attention.aspx', foptions, data, '', function (res) {
      console.log(res)
      if (res.code == '200') {
        that.getloupan()

      } 
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1000
        })
      

    }, function (res) {
      console.log(res)
    })
  },
  golookpic(){
    var that = this
   wx.navigateTo({
     url: '../allpic/index?id='+that.data.id,
   })
  },
  godaohang(e){
    var that = this
    let salesOfficeAddressLongLat = that.data.loupan.salesOfficeAddressLongLat
    let name = e.currentTarget.id
    wx.navigateTo({
      url: '../daohang/index?jwd=' + salesOfficeAddressLongLat + '&name=' + name,
    })
  },
  golookzb(e){
    var that = this
    let longlat = that.data.loupan.longlat
    let name = e.currentTarget.id
    wx.navigateTo({
      url: '../loupandzxq/index?jwd=' + longlat + '&name=' + name,
    })
  },
  gomorelp(){
    var that = this
      wx.navigateTo({
        url: '../loupanxx/index?id='+that.data.id+'&isshow=2',
      })
  },
  goloupandt(){
    wx.navigateTo({
      url: '../loupandt/index?type=1',
    })
  }
})