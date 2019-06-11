var template = require('../../template/index.js');
const util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apis: app.data.href,
    items: [],
    startX: 0, //开始坐标
    startY: 0,
    page:1,
    sscon:'',

  }, 

  onLoad: function (e) {

    var that = this;

    //common是自己写的公共JS方法，可忽略

    // for (var i = 0; i < 10; i++) {

    //   this.data.items.push({

    //     content: i + " 向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦",

    //     isTouchMove: false //默认隐藏删除

    //   })

    // }

    // this.setData({

    //   items: this.data.items

    // });
   

  },
  /**
    * 生命周期函数--监听页面显示
    */
  onShow: function () {
    var that = this
    that.gettxllist()
  },

  //手指触摸动作开始 记录起点X坐标

  touchstart: function (e) {

    //开始触摸时 重置所有删除

    this.data.items.forEach(function (v, i) {

      if (v.isTouchMove)//只操作为true的

        v.isTouchMove = false;

    })

    this.setData({

      startX: e.changedTouches[0].clientX,

      startY: e.changedTouches[0].clientY,

      items: this.data.items

    })

  },

  //滑动事件处理

  touchmove: function (e) {

    var that = this,

      index = e.currentTarget.dataset.index,//当前索引

      startX = that.data.startX,//开始X坐标

      startY = that.data.startY,//开始Y坐标

      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标

      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标

      //获取滑动角度

      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });

    that.data.items.forEach(function (v, i) {

      v.isTouchMove = false

      //滑动超过30度角 return

      if (Math.abs(angle) > 30) return;

      if (i == index) {

        if (touchMoveX > startX) //右滑

          v.isTouchMove = false

        else //左滑

          v.isTouchMove = true

      }

    })

    //更新数据

    that.setData({

      items: that.data.items

    })

  },

  /**
  
  * 计算滑动角度
  
  * @param {Object} start 起点坐标
  
  * @param {Object} end 终点坐标
  
  */

  angle: function (start, end) {

    var _X = end.X - start.X,

      _Y = end.Y - start.Y

    //返回角度 /Math.atan()返回数字的反正切值

    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);

  },

  //删除事件

  del: function (e) {
    var that = this
    let id = e.currentTarget.id
   
    let brokerId = wx.getStorageSync('user').id
    let foptions = [
      'brokerId' + brokerId,
      'id' + id
    ]
    let data = {
      brokerId: brokerId,
      id: id
    }
    util.requestLoading(that.data.apis + '/api/user/deletephonebook.aspx', foptions, data, '', function (res) {
      console.log(res)
      if (res.code == '200') {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1000
        })
         
        that.gettxllist()

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
  onReachBottom: function () {
    var that = this
    let yeshu = parseInt(that.data.page) + 1
    that.setData({
      page: yeshu
    })
    that.gettxllist()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  gettxllist() {
    var that = this
    let page = that.data.page
    let brokerId = wx.getStorageSync('user').id
    let sscon = that.data.sscon
    let foptions = [
      'brokerId' + brokerId,
      'page' + page
    ]
    let data = {
      brokerId: brokerId,
      page: page
    }
    if (sscon!=''){
      foptions.push('key' + sscon)
      data.key = sscon
    }
    util.requestLoading(that.data.apis + '/api/user/phonebooklist.aspx', foptions, data, '', function (res) {
      console.log(res)
      if (res.code == '200') {
        let shuju = res.data
        for(let i=0;i<shuju.length;i++){
          shuju[i].name = decodeURIComponent(shuju[i].name)
          shuju[i].isTouchMove==false
        }
        if (page == 1) {
          that.setData({
            items: res.data
          })
        } else {
          that.setData({
            items: that.data.items.concat(res.data)
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
  gotjtxl(){
    wx.navigateTo({
      url: '../tjtxl/index',
    })
  },
  gosearch(e){
   var that = this
   let con = e.detail.value
   that.setData({
     sscon: con,
     page:1
   })
    that.gettxllist()

  },
  gobdphone(e){
   var that = this
   let phone = e.currentTarget.id
   wx.makePhoneCall({
     phoneNumber: phone,
   })
  },
  gogenjin(e){
    let num = e.currentTarget.id
    let name = e.currentTarget.dataset.name
    let phone = e.currentTarget.dataset.phone
    // if(num==0){
    //    wx.showToast({
    //      title: '暂无记录',
    //      icon:'none',
    //      duration:1000,
    //      mask:true,
    //    })
    // }else{
      wx.navigateTo({
        url: '../gjjl/index?id=' + num + '&name=' + name +'&phone='+phone,
      })
    // }
    
  },
  bianji(e){
   var that = this
   let id = e.currentTarget.id
    let name = e.currentTarget.dataset.name
    let phone = e.currentTarget.dataset.phone
   wx.navigateTo({
     url: '../bjtxl/index?id=' + id + '&name=' + name + '&phone=' + phone,
   })
  }

})
