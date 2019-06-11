// pages/loupandzxq/index.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
var app = getApp()
const util = require('../../utils/util.js');
const base64 = require('../../utils/base64.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    stateid:0,
    name:'公交'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        let ratio = 750 / clientWidth;
        let height = clientHeight * ratio;
        that.setData({
          height: clientHeight-50,
          jwd:options.jwd,
          name: options.name
        });
        that.getfj()
      }
    });
  
    
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
  godaohang(){
    var that = this
    wx.navigateTo({
      url: '../daohang/index?jwd=' + that.data.jwd+'&name='+that.data.name,
    })
  },
  getfj(){
    var that = this
    var demo = new QQMapWX({
      key: 'YVSBZ-D5WW6-JPLS3-EO65N-6ODAK-INFTJ' // 必填
    });
    let jwd = that.data.jwd.split(',')
    console.log(jwd)

    // 经纬度

    var latitude = Number(jwd[1])
    var longitude = Number(jwd[0])
    console.log(latitude)
    console.log(longitude)
    // 调用接口
    demo.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log(res)
        demo.search({
          keyword: that.data.name,  //搜索关键词
          location: res.result.location.lat + ',' + res.result.location.lng,  //设置周边搜索中心点
          success: function (res2) { //搜索成功后的回调
            console.log(res2)

            var mks = [{
              title: '当前位置',
              id: 0,
              latitude: latitude,
              longitude: longitude,
              iconPath: "/image/15.png", //图标路径
              width: 30,
              height: 30
            }]
            for (var i = 0; i < res2.data.length; i++) {
              mks.push({ // 获取返回结果，放到mks数组中
                title: res2.data[i].title,
                id: res2.data[i].id,
                latitude: res2.data[i].location.lat,
                longitude: res2.data[i].location.lng,
                iconPath: "/image/18.png", //图标路径
                width: 30,
                height: 30
              })
            }
            that.setData({ //设置markers属性，将搜索结果显示在地图中
              markers: mks,
              latitude: res.result.location.lat,
              longitude: res.result.location.lng,
              dzlist: res2.data
            })
          },
          fail: function (res) {
            console.log('z最外层3')
          },
          complete: function (res) {
            console.log(res);
          }
        });
      },
      fail: function (res) {
        console.log('z最外层2')

      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  choosetype(e){
    var that = this
   let id =e.currentTarget.id
   let name = e.currentTarget.dataset.name
   that.setData({
     stateid:id,
     name:name
   })
    that.getfj()
  }
})