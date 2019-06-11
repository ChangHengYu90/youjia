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
    array:['美的乐城','弘阳结庐'],
    index:0,
    loupanid:'',
    page:1,
    dfpnum: 0,
    zygwnum: 0,
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
    var that = this

    template.tabbar2("tabBar", 2, that)//0表示第一个tabbar
    that.setData({
      page:1
    })
    that.getlplist()
    
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
    page:yeshu
    })
    that.getlist()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getlplist(){
    var that = this
    let id = wx.getStorageSync('user').id
    let foptions = [
      
      'leadId' + id,
     
    ]
    let data = {
   
      leadId: id,
  
    }
    util.requestLoading(that.data.apis + '/api/project/myhourselist.aspx', foptions, data, '加载中...', function (res) {
      console.log(res)
      
      if (res.code == '200') {
        let shuju = res.data
        let array=[]
        for(let i=0;i<shuju.length;i++){
          shuju[i].name = decodeURIComponent(shuju[i].name)
          array.push(decodeURIComponent(shuju[i].name))
        }
        if (that.data.loupanid==''){
          that.setData({
            array: array,
            yarray: shuju,
            loupanid: shuju[0].id
          })
        }else{
          that.setData({
            array: array,
            yarray: shuju,
           
          })
        }
         
        that.getlist()
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
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this
    let yarray = that.data.yarray
    that.setData({
      index: e.detail.value,
      loupanid: yarray[e.detail.value].id,
      page:1
    })
   that.getlist()
  },
  getlist() {
    var that = this
    let id = wx.getStorageSync('user').id
    let foptions = [

      'leadId' + id,
      'housingResourcesId'+that.data.loupanid,
      'page'+that.data.page

    ]
    let data = {

      leadId: id,
      page: that.data.page,
      housingResourcesId: that.data.loupanid

    }
    util.requestLoading(that.data.apis + '/api/project/propertyconsultantlist.aspx', foptions, data, '加载中...', function (res) {
      console.log(res)

      if (res.code == '200') {
        let shuju = res.data
        for(let i=0;i<shuju.length;i++){
          shuju[i].name = decodeURIComponent(shuju[i].name)
          shuju[i].housingResourcesName = decodeURIComponent(shuju[i].housingResourcesName)
        }
        if (that.data.page==1){
          that.setData({
            dfpnum: res.dataCount1,
            zygwnum: res.dataCount0,
            list: shuju
          })
        }else{
          that.setData({
            dfpnum: res.dataCount1,
            zygwnum: res.dataCount0,
            list: that.data.list.concat(shuju)
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
  },
  goadd(){
    var that = this
    let id = that.data.loupanid
    let name = that.data.array[that.data.index]
    wx.navigateTo({
      url: '../addadviser/index?id='+id+'&name='+name,
    })
  },
  gofenpei(){
    var that = this
    let loupanid = that.data.loupanid
    wx.navigateTo({
      url: '../distributionkh/index?id=' + loupanid,
    })
  },
  gogh(e){
   var that = this
   let index = e.currentTarget.dataset.index
   let list = that.data.list
    wx.setStorageSync('zygwgh', list[index])
    wx.navigateTo({
      url: '../replacelp/index',
    })
  },
  godel(e){
    var that = this
    let zyid = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '您确定删除吗',
      success(res) {
        if (res.confirm) {
          let id = wx.getStorageSync('user').id
          let foptions = [

            'leadId' + id,
            'id' + zyid

          ]
          let data = {

            leadId: id,
            id: zyid

          }
          util.requestLoading(that.data.apis + '/api/project/deletepropertyconsultant.aspx', foptions, data, '加载中...', function (res) {
            console.log(res)
            wx.showToast({
              title: res.message,
              icon: 'none',
              duration: 1000
            })
            if (res.code == '200') {
            that.setData({
              page:1
            })
              that.getlist()

            } else {
              
            }
          }, function (res) {
            console.log(res)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})