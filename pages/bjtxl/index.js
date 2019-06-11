var template = require('../../template/index.js');
const util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    isyc:0,
    zt:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      id: options.id,
      name: options.name,
      phone: options.phone,
      phone2: options.phone,
      phone11: options.phone,
      isyc:1
    })
    if (options.phone.indexOf('*')!=-1){
       that.setData({
         zt: true
       })
    }

    

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
  hqname(e){
   var that =this
    let name = e.detail.value.replace(/\s+/g, '')
   that.setData({
     name: name
   })
  },
  hqphone(e) {
    var that = this
    let phone = e.detail.value.replace(/\s+/g, '')
    let phone2 = that.data.phone
    let phone3 = that.data.phone2
    if (phone.length==11){
      if (!(/^1[345789]\d{9}$/.test(phone))) {
        wx.showToast({
          title: '请输入正确的手机号',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        that.setData({
          phone: phone,
          phone2: phone,
         
        })
      }else{
       
        that.setData({
          phone: phone,
          phone2: phone,
          isyc: 1
        })
      }
      
    }else{
      console.log(phone2)
      if (that.data.phone11.indexOf('*') != -1){
      
          that.setData({
            phone: '',
            phone11: '',
            phone2: '',
            isyc: 0,
            zt: false
          })
      
      }else{
        if (phone3.length == 11 && phone2.indexOf('*') != -1) {
          that.setData({
            phone: phone3,
            phone2: phone3,
            isyc: 1,
            zt: false
          })
        } else {
          that.setData({
            phone: phone,
            phone2: phone,
            isyc: 0
          })
        }
      }
      
      
    }
   
  },
  changeSwitch1(e){
    var that = this
    console.log(e.detail.value)
 
    let zt = e.detail.value
    let sj = that.data.phone2
    console.log(that.data.phone11)
    if (that.data.phone11.indexOf('*') != -1 && that.data.phone11!=''){
      that.setData({
        zt: true
      })
      return
    }
    if (zt==true){
      console.log(22)
        that.setData({
          phone: sj.substring(0, 3) + '****' + sj.substring(7, 11),
          zt:true
        })
    }else{
      that.setData({
        phone: sj,
        zt: false
      })
    }
  },
  submit() {
    var that = this
    let name = that.data.name
    let phone = that.data.phone2
    if (name == '' || name == null || name==undefined){
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 1000,
        mask:true,
      })
      return
    }
    if (phone == '' || phone == null || phone == undefined) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 1000,
        mask: true,
      })
      return
    }
    if (!(/^1[345789]\d{9}$/.test(phone))&&that.data.phone11.indexOf('*')==-1) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    let zt = that.data.zt
    let isHide = 0
    if (zt==true){
      isHide=1
    }
    let brokerId = wx.getStorageSync('user').id
    let foptions = [
      'brokerId' + brokerId,
      'id'+that.data.id,
      'name' + name,
      'mobile' + phone,
      'isHide' + isHide
    ]
    let data = {
      brokerId: brokerId,
      id:that.data.id,
      name: name,
      mobile: phone,
      isHide: isHide
    }
    util.requestLoading(that.data.apis + '/api/user/addphonebook.aspx', foptions, data, '', function (res) {
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