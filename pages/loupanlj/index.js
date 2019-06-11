// pages/customer/index.js
var template = require('../../template/index.js');
var app = getApp()
const util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    state: 0,
    page: 1,
    name:'',
    num:0,
    khmsid:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      lpid: options.id,
      state: options.state
    })
    if (options.state == 0) {
      wx.setNavigationBarTitle({
        title: '待确认',
      })

    }else if (options.state == 1) {
      wx.setNavigationBarTitle({
        title: '报备',
      })

    } else if (options.state == 2) {
      wx.setNavigationBarTitle({
        title: '到访',
      })
    } else if (options.state == 3) {
      wx.setNavigationBarTitle({
        title: '认购',
      })
    } else if (options.state == 4) {
      wx.setNavigationBarTitle({
        title: '成交',
      })
    } else if (options.state == 5) {
      wx.setNavigationBarTitle({
        title: '结佣',
      })
    }
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
    let yeshu = parseInt(that.data.page) +1
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
  getlist() {
    var that = this
    let id = wx.getStorageSync('user').id
    let name = that.data.name
    let lpid = that.data.lpid
    let foptions = [

      'leadId' + id,
      'id'+lpid,
      'page' + that.data.page,
      'state' + that.data.state
    ]
    let data = {
      leadId: id,
      id: lpid,
      state: that.data.state,
      page: that.data.page
    }
    if (name!=''){
      foptions.push('name' + name)
      data.name=name
    }
    util.requestLoading(that.data.apis + '/api/project/hoursereportlist.aspx', foptions, data, '', function (res) {
      console.log(res)
      if (res.code == '200') {
        let shuju = res
        for (let i = 0; i < shuju.data.length;i++){
          shuju.data[i].hourseName = decodeURIComponent(shuju.data[i].hourseName)
          shuju.data[i].name = decodeURIComponent(shuju.data[i].name)
          shuju.data[i].brokerName = decodeURIComponent(shuju.data[i].brokerName)
          shuju.data[i].description = decodeURIComponent(shuju.data[i].description)
      } 
      console.log(shuju)
       if(that.data.page==1){
         let num = that.data.num
         num++
         if(num==1){
           that.setData({
             bblist: shuju.data,
             toplist: shuju,
             num: num
           })
         }else{
           that.setData({
             bblist: shuju.data,
             toplist: shuju,
           })
         }
         
       }else{
         let ysj = that.data.bblist
   
         let a = ysj.concat(shuju.data)
         console.log(a)
         that.setData({
           bblist: a,
           toplist: shuju,
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
  hqname(e){
   var that = this
   that.setData({
     name: e.detail.value.replace(/\s+/g, '')
   })
    that.getlist()
  },
  goqhtype(e){
     var that = this
     that.setData({
       state:e.currentTarget.id,
       page:1,

     })
    that.getlist()
  },
  godel(e){
   var that = this
   let bbid = e.currentTarget.id
    let id = wx.getStorageSync('user').id
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
          page:1,
          num:0,
        })
        that.getlist()
      } else {
        
      }
    }, function (res) {
      console.log(res)
    })
  },
  bdphone(e){
     let phone = e.currentTarget.id
     wx.makePhoneCall({
       phoneNumber: phone,
     })
  },
  goqueren(e) {
    var that = this
    let id = e.currentTarget.id
    let type = e.currentTarget.dataset.type
    let userid = wx.getStorageSync('user').id
    let foptions = [
      'leadId' + userid,
      'id' + id,
      'type' + type
    ]
    let data = {
      leadId: userid,
      id: id,
      type: type
    }

    util.requestLoading(that.data.apis + '/api/project/changereport.aspx', foptions, data, '', function (res) {
      console.log(res)
      wx.showToast({
        title: res.message,
        icon: 'none',
        duration: 1000
      })
      if (res.code == '200') {
        that.setData({
          page: 1
        })
        that.getlist()
      } else {

      }
    }, function (res) {
      console.log(res)
    })
  },
  qrdf(e) {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        let img = res.tempFilePaths[0]
        let userid = wx.getStorageSync('user').id
        let id = e.currentTarget.id
        let foptions = [
          'leadId' + userid,
          'id' + id,
        ]
        let data = {
          leadId: userid,
          id: id,
        }
        let timeStamp = new Date().getTime();
        foptions.sort();
        let newstr = foptions.join("");
        let requestCheck = newstr + timeStamp + '3c4510874e6407bf53bbe';

        requestCheck = util.md5(requestCheck).toLocaleLowerCase();
        console.log(requestCheck)
        let headerData = {
          "timeStamp": timeStamp,
          "requestCheck": requestCheck,
          "Content-Type": "application/x-www-form-urlencoded"
        };
        wx.showLoading({
          title: '上传中...',
        })
        wx.uploadFile({
          url: that.data.apis + '/api/project/confirmvisit.aspx', // 仅为示例，非真实的接口地址
          filePath: img,
          name: 'image',
          formData: {
            leadId: userid,
            id: id
          },
          header: headerData,
          success(res) {
            wx.hideLoading()
            let shuju = JSON.parse(res.data)
            wx.showToast({
              title: shuju.message,
              icon: 'none',
              duration: 1000
            })
            if (shuju.code == '200') {
              that.setData({
                page: 1
              })
              that.getlist()
            }
            console.log(res)
          },
          fail: function () {
            wx.hideLoading()
          }
        })

      }
    })
  },
  showkhms(e) {
    var that = this
    let content = e.currentTarget.dataset.content
    that.setData({
      khmsid: 1,
      description: content
    })
  },
  closekhms() {
    var that = this
    that.setData({
      khmsid: 0
    })
  },
  jjrgjjl(e) {
    wx.navigateTo({
      url: '../khjjrgjjl/index?id=' + e.currentTarget.dataset.id + '&name=' + e.currentTarget.dataset.name + '&phone=' + e.currentTarget.dataset.phone,
    })
  },
})