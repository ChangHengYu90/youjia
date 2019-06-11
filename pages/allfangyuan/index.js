var app = getApp()
const util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    isshowid:0,
    xzid:0,
    xzname: '性质',
    quyuname:'区域',
    quyuindex: 0,
    quyuid:0,
    lxid:0,
    lxname: '类型',
    sortid:0,
    page:1,
    lpname:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let city = wx.getStorageSync('city')
    let cityid = wx.getStorageSync('cityid')
   
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
    let city = wx.getStorageSync('city')
    that.getlplist()
    that.getxz()
    that.getqy()
    that.getlx()
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
    let yeshu = that.data.page
    yeshu++
    that.setData({
      page: yeshu
    })
    that.getlplist()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getxz(){
    var that = this
    let foptions = [
    ]
    let data = {
    }

    util.requestLoading(that.data.apis + '/api/basic/propertytypelist.aspx', foptions, data, '', function (res) {
      console.log(res)

      if (res.code == '200') {
        let shuju = res.data
        for (let i = 0; i < shuju.length; i++) {
          shuju[i].name = decodeURIComponent(shuju[i].name)
        }
        that.setData({
          xingzhi: shuju
        })
      } else {

      }
    }, function (res) {
      console.log(res)
    })
  },
  getqy() {
    var that = this
    let foptions = [
    ]
    let data = {
    }

    util.requestLoading(that.data.apis + '/api/basic/citystreetlist.aspx', foptions, data, '', function (res) {
      console.log(res)

      if (res.code == '200') {
        let shuju = res.data
        
        let cityid = wx.getStorageSync('cityid')
        for (let i = 0; i < shuju.length; i++) {
          if (cityid==shuju[i].id){
            shuju[i].district.unshift({ id: 0, name: '不限', urbanStreet:[{id:0,name:'不限'}]})
            that.setData({
              quyu: shuju[i],
              // qyid: shuju[i].district[0].id
            })
            }
        }
        
      } else {

      }
    }, function (res) {
      console.log(res)
    })
  },
  getlx() {
    var that = this
    let foptions = [
    ]
    let data = {
    }

    util.requestLoading(that.data.apis + '/api/basic/salestatelist.aspx', foptions, data, '', function (res) {
      console.log(res)

      if (res.code == '200') {
        let shuju = res.data
        for (let i = 0; i < shuju.length; i++) {
          shuju[i].name = decodeURIComponent(shuju[i].name)
        }
        that.setData({
          leixing: shuju
        })
      } else {

      }
    }, function (res) {
      console.log(res)
    })
  },
  choosetype(e){
   var that = this
   let id = e.currentTarget.id
    if (id == that.data.isshowid){
      that.setData({
        isshowid: 0
      })
   }else{
      that.setData({
        isshowid: id
      })
   }
  },
  choosexz(e){
    var that = this
    let id = e.currentTarget.id
    let name = e.currentTarget.dataset.name
    that.setData({
      xzid:id,
      isshowid:0,
      xzname: name,
      page:1
    })
    that.getlplist()
  },
  choosepx(e){
    var that = this
    let id = e.currentTarget.id
    that.setData({
      sortid:id,
      isshowid: 0,
      page:1
    })
    that.getlplist()
  },
  chooselx(e) {
    var that = this
    let id = e.currentTarget.id
    let name = e.currentTarget.dataset.name
    that.setData({
      lxid: id,
      isshowid: 0,
      lxname: name,
      page:1
    })
    that.getlplist()
  },
  choosequ(e){
    var that = this
    let id = e.currentTarget.id
    let index = e.currentTarget.dataset.index
    that.setData({
      quyuindex: index,
      qyid:id
    })
  },
  choosejd(e) {
    var that = this
    let id = e.currentTarget.id
    let name = e.currentTarget.dataset.name
    if(name=='不限'){
       name = '区域'
    }
    that.setData({
      quyuname:name,
      quyuid: id,
      isshowid: 0,
      page:1,
    })
    that.getlplist()
  },
  choosecity(){
    wx.navigateTo({
      url: '../choosecity/index',
    })
  },
  getlplist(){
    var that = this
    let quyuid = that.data.quyuid
    let qyid = that.data.qyid
    let lpname = that.data.lpname
    let foptions = [
      'cityId' + wx.getStorageSync('cityid'),
      'sortType' + that.data.sortid,
      'page' + that.data.page,
    ]
    let data = {
      cityId: wx.getStorageSync('cityid'),
      sortType: that.data.sortid,
      page: that.data.page
    }
    let userid = wx.getStorageSync('user').id
    if (userid){
      foptions.push('brokerId' + userid)
      data.brokerId = userid
    }
    if (quyuid!=0){
      foptions.push('districtId' + qyid)
      foptions.push('streetId' + quyuid)
      data.districtId = qyid
      data.streetId = quyuid
    }
    let xzid = that.data.xzid
    let lxid = that.data.lxid
    if (xzid!=0){
      foptions.push('propertyTypeId' + xzid)
      data.propertyTypeId = xzid
    }
    if (lxid!=0){
      foptions.push('saleStateId' + lxid)
      data.saleStateId = lxid
    }
    if (lpname!=''){
      foptions.push('name' + lpname)
      data.name = lpname
    }
    util.requestLoading(that.data.apis + '/api/hourse/hourselist.aspx', foptions, data, '', function (res) {
      console.log(res)
   
      if (res.code == '200') {
       let shuju = res.data
       for(let i=0;i<shuju.length;i++){
         shuju[i].name = decodeURIComponent(shuju[i].name)
       }
       if(that.data.page==1){
         that.setData({
           lplist: shuju,
           isdl: userid
         })
       }else{
         that.setData({
           lplist: that.data.lplist.concat(shuju)
         })
       }
      } else {

      }
    }, function (res) {
      console.log(res)
    })
  },
  gosearch(e){
   var that = this
   let con = e.detail.value
   that.setData({
     lpname:con,
     page:1,
   })
   that.getlplist()
  },
  golookxq(e){
    // let id = e.currentTarget.id
    // wx.navigateTo({
    //   url: '../loupanxq/index?id='+id,
    // })
      var that = this
      let id = e.currentTarget.id
      let user = wx.getStorageSync('user')
      if (user) {
        wx.navigateTo({
          url: '../loupanxq/index?id=' + id,
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '您未登录，请登录',
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../login/index',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
  }
})