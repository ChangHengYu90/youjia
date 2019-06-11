var app = getApp()
const util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    page:1,
    xzid:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var that = this
   that.setData({
     storeId:options.id
   })
    that.getjgyg()
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
    that.getjgyg()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getjgyg(){
    var that = this
    let page = that.data.page
    let userid = wx.getStorageSync('user').id
    let foptions = [
      'institutionId' + userid,
      'page' + page
    ]
    let data = {
      institutionId: userid,
      page: page
    }

    util.requestLoading(that.data.apis + '/api/user/mybrokerlist.aspx', foptions, data, '', function (res) {
      console.log(res)

      if (res.code == '200') {
        let shuju = res.data
        for (let i = 0; i < shuju.length; i++) {
          shuju[i].isxz = false
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

      }
    }, function (res) {
      console.log(res)
    })
  },
  choosexz(e){
    let that = this
    let index =e.currentTarget.dataset.index
    let id = e.currentTarget.id
    let list = that.data.list
    let xzid = that.data.xzid
    console.log(list)
    console.log(index)
    if (list[index].isxz==false){
      list[index].isxz = true
      xzid.push(id)
    }else{
      list[index].isxz = false
      for(let i=0;i<xzid.length;i++){
        if(xzid[i]==id){
          xzid.splice(i,1)
        }
      }
      
    }
    that.setData({
      list: list,
      xzid: xzid
    })
  },
  goadd(){
    var that = this
    let userid = wx.getStorageSync('user').id
    let storeId = that.data.storeId
    let xzid = that.data.xzid
    if (xzid.length==0){
      wx.showToast({
        title: '请选择添加人员',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    let foptions = [
      'institutionId' + userid,
      'brokerId' + xzid[0],
      'storeId' + storeId
    ]
    let data = {
      institutionId: userid,
      storeId: storeId,
      brokerId: xzid[0]
    }

    util.requestLoading(that.data.apis + '/api/user/changestore.aspx', foptions, data, '', function (res) {
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
           delta:1,
         })
       },1000)
        

      } else {

      }
    }, function (res) {
      console.log(res)
    })
  }
})