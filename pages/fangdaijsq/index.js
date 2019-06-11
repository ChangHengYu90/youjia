// pages/fangdaijsq/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dktype:1,
    array: ['按房价总额', '按贷款总额'],
    array2: ['1成', '2成', '3成','4成', '5成', '6成', '7成'],
    array3: ['1年（12期）', '2年（24期）', '3年（36期）', '4年（48期）', '5年（60期）', '6年（72期）', '7年（84期）', '8年（96期）', '9年（108期）', '10年（120期）', '11年（132期）', '12年（144期）', '13年（156期）', '14年（168期）', '15年（180期）', '16年（192期）', '17年（204期）', '18年（216期）', '19年（228期）', '20年（240期）', '21年（252期）', '22年（264期）', '23年（276期）', '24年（288期）', '25年（300期）', '26年（312期）', '27年（324期）', '28年（336期）', '29年（348期）',  '30年（360期）'],
    index:0,
    index2: 6,
    index3: 19,
    index4: 0,
    array4: ['3.25%'],
    index5: 0,
    array5: ['4.9%', '基准利率1.1倍', '基准利率1.2倍'],

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
  choosetype(e){
   var that = this
   let id = e.currentTarget.id
   that.setData({
     dktype:id
   })
   
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange2(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  bindPickerChange3(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value
    })
  },
  bindPickerChange4(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index4: e.detail.value
    })
  },
  bindPickerChange5(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index5: e.detail.value
    })
  },
  hqdkze(e){
    var that = this
    that.setData({
       dkze:e.detail.value
    })
  }, 
  hqfjze(e) {
    var that = this
    that.setData({
      fjze: e.detail.value
    })
  },
  hqgjj(e) {
    var that = this
    that.setData({
      gjj: e.detail.value
    })
  },
  hqsy(e) {
    var that = this
    that.setData({
      sydk: e.detail.value
    })
  },
  // 计算
  gojs(){
    var that = this
    let dktype = that.data.dktype
    console.log(dktype)
    if (dktype==1){
      let index = that.data.index
      let fjze = that.data.fjze
      let index2 = that.data.index2
      let dkze = fjze * (index2+1)/10
      let index3 = that.data.index3
      let nian = 1
      console.log(232)
    
        nian = parseInt(index3) +1
    
      let array4 = that.data.array4
      let index4 = that.data.index4
      if (index==0){
        if (fjze == '' || fjze == undefined || fjze == null) {
          wx.showToast({
            title: '请输入房价总额',
            icon: 'none',
            duration: 1000,
            mask: true
          })
          return
        }
        let daikuanlv = array4[index4].replace("%", "");
        daikuanlv = daikuanlv/100
        let yuelixi = daikuanlv / 12
        // 等额本金
        let yueshu = nian * 12//总月数
        //月还款利息
        let yhklx = dkze * 10000 * daikuanlv / 12;

        let debjyhk = (dkze * 10000 / yueshu + yhklx).toFixed(2)
        let debjyhkjs = (dkze * 10000 / yueshu * daikuanlv / 12).toFixed(2)
        // 等额本金总利息
        let debjzlx = ((yueshu + 1) * dkze * 10000 * yuelixi / 2).toFixed(2)
        console.log(debjzlx)
        // console.log(dkze * 10000 * yuelx * (1 + yuelx) ^ yueshu / [(1 + yuelx ^yueshu -1)])
        // 等额本息

        let debxyhk = (dkze * 10000 * (yuelixi * (Math.pow(1 + yuelixi, yueshu)) / ((Math.pow(1 + yuelixi, yueshu)) - 1))).toFixed(2)
        // 等额本息总还款
        let debxzlx = (debxyhk * yueshu - dkze * 10000).toFixed(2)
        console.log(debxzlx)
        let shuju = {
          zongje: dkze,
          zongys: yueshu,
          debx: {
            lx: debxzlx,
            yhk: debxyhk,
            hkze: (Number(debxzlx) + dkze * 10000).toFixed(2)
          },
          debj: {
            lx: debjzlx,
            yhk: debjyhk,
            hkze: (Number(debjzlx) + dkze * 10000).toFixed(2),
            yjs: debjyhkjs
          }

        }
        wx.setStorageSync('jsjg', shuju)
        wx.navigateTo({
          url: '../jsjg/index',
        })
        }else{
        if (dkze == '' || dkze == undefined || dkze == null) {
          wx.showToast({
            title: '请输入贷款总额',
            icon: 'none',
            duration: 1000,
            mask: true
          })
          return
        }
        let daikuanlv = array4[index4].replace("%", "");
        daikuanlv = daikuanlv/100
        let yuelixi = daikuanlv / 12
        // 等额本金
        let yueshu = nian*12//总月数
        //月还款利息
        let yhklx = dkze * 10000 * daikuanlv/12;
     
        let debjyhk = (dkze * 10000 / yueshu + yhklx).toFixed(2)
        let debjyhkjs = (dkze * 10000 / yueshu * daikuanlv / 12).toFixed(2)
        // 等额本金总利息
        let debjzlx = ((yueshu + 1) * dkze * 10000 * yuelixi / 2).toFixed(2)
        console.log(debjzlx)
        // console.log(dkze * 10000 * yuelx * (1 + yuelx) ^ yueshu / [(1 + yuelx ^yueshu -1)])
        // 等额本息
       
        let debxyhk = (dkze * 10000 * (yuelixi * (Math.pow(1 + yuelixi, yueshu)) / ((Math.pow(1 + yuelixi, yueshu)) - 1))).toFixed(2)
        // 等额本息总还款
        let debxzlx = (debxyhk * yueshu - dkze * 10000).toFixed(2)
        console.log(debxzlx)
        let shuju = {
          zongje: dkze,
          zongys: yueshu,
          debx:{
            lx: debxzlx,
            yhk: debxyhk,
            hkze: (Number(debxzlx) + dkze*10000).toFixed(2)
          },
          debj:{
            lx: debjzlx,
            yhk: debjyhk,
            hkze: (Number(debjzlx) + dkze * 10000).toFixed(2),
            yjs: debjyhkjs
          }
         
        }
        wx.setStorageSync('jsjg', shuju)
        wx.navigateTo({
          url: '../jsjg/index',
        })
        }
    } else if(dktype == 2){
      let index = that.data.index
      let fjze = that.data.fjze
      let index2 = that.data.index2
      let dkze = fjze * (index2 + 1) / 10
      let index3 = that.data.index3
      let nian = 1
      console.log(232)

      nian = parseInt(index3) + 1

      let array5 = that.data.array5
      let index5 = that.data.index5
      let daikuanlv = 4.9
      if (index5 == 0) {
        daikuanlv = array5[index5].replace("%", "");
        daikuanlv = daikuanlv / 100
      } else if (index5 == 1){
        daikuanlv = array5[0].replace("%", "");
        daikuanlv = daikuanlv / 100*1.1
      } else if (index5 == 2) {
        daikuanlv = array5[0].replace("%", "");
        daikuanlv = daikuanlv / 100 * 1.2
      }
      if (index == 0) {
        if (fjze == '' || fjze == undefined || fjze == null) {
          wx.showToast({
            title: '请输入房价总额',
            icon: 'none',
            duration: 1000,
            mask: true
          })
          return
        }
       
        let yuelixi = daikuanlv / 12
        // 等额本金
        let yueshu = nian * 12//总月数
        //月还款利息
        let yhklx = dkze * 10000 * daikuanlv / 12;

        let debjyhk = (dkze * 10000 / yueshu + yhklx).toFixed(2)
        let debjyhkjs = (dkze * 10000 / yueshu * daikuanlv / 12).toFixed(2)
        // 等额本金总利息
        let debjzlx = ((yueshu + 1) * dkze * 10000 * yuelixi / 2).toFixed(2)
        console.log(debjzlx)
        // console.log(dkze * 10000 * yuelx * (1 + yuelx) ^ yueshu / [(1 + yuelx ^yueshu -1)])
        // 等额本息

        let debxyhk = (dkze * 10000 * (yuelixi * (Math.pow(1 + yuelixi, yueshu)) / ((Math.pow(1 + yuelixi, yueshu)) - 1))).toFixed(2)
        // 等额本息总还款
        let debxzlx = (debxyhk * yueshu - dkze * 10000).toFixed(2)
        console.log(debxzlx)
        let shuju = {
          zongje: dkze,
          zongys: yueshu,
          debx: {
            lx: debxzlx,
            yhk: debxyhk,
            hkze: (Number(debxzlx) + dkze * 10000).toFixed(2)
          },
          debj: {
            lx: debjzlx,
            yhk: debjyhk,
            hkze: (Number(debjzlx) + dkze * 10000).toFixed(2),
            yjs: debjyhkjs
          }

        }
        wx.setStorageSync('jsjg', shuju)
        wx.navigateTo({
          url: '../jsjg/index',
        })
      } else {
        if (dkze == '' || dkze == undefined || dkze == null) {
          wx.showToast({
            title: '请输入贷款总额',
            icon: 'none',
            duration: 1000,
            mask: true
          })
          return
        }
        let yuelixi = daikuanlv / 12
        // 等额本金
        let yueshu = nian * 12//总月数
        //月还款利息
        let yhklx = dkze * 10000 * daikuanlv / 12;

        let debjyhk = (dkze * 10000 / yueshu + yhklx).toFixed(2)
        let debjyhkjs = (dkze * 10000 / yueshu * daikuanlv / 12).toFixed(2)
        // 等额本金总利息
        let debjzlx = ((yueshu + 1) * dkze * 10000 * yuelixi / 2).toFixed(2)
        console.log(debjzlx)
        // console.log(dkze * 10000 * yuelx * (1 + yuelx) ^ yueshu / [(1 + yuelx ^yueshu -1)])
        // 等额本息

        let debxyhk = (dkze * 10000 * (yuelixi * (Math.pow(1 + yuelixi, yueshu)) / ((Math.pow(1 + yuelixi, yueshu)) - 1))).toFixed(2)
        // 等额本息总还款
        let debxzlx = (debxyhk * yueshu - dkze * 10000).toFixed(2)
        console.log(debxzlx)
        let shuju = {
          zongje: dkze,
          zongys: yueshu,
          debx: {
            lx: debxzlx,
            yhk: debxyhk,
            hkze: (Number(debxzlx) + dkze * 10000).toFixed(2)
          },
          debj: {
            lx: debjzlx,
            yhk: debjyhk,
            hkze: (Number(debjzlx) + dkze * 10000).toFixed(2),
            yjs: debjyhkjs
          }

        }
        wx.setStorageSync('jsjg', shuju)
        wx.navigateTo({
          url: '../jsjg/index',
        })
      }

    } else if (dktype == 3) {
      let gjj = that.data.gjj
      let sydk = that.data.sydk
      let index3 = that.data.index3
      let nian = 1
      console.log(232)

      nian = parseInt(index3) + 1
      let array4 = that.data.array4
      let index4 = that.data.index4
      let array5 = that.data.array5
      let index5 = that.data.index5
      let gjjdaikuanlv = 3.25
      let sydaikuanlv = 4.9
      if (index4 == 0) {
        gjjdaikuanlv = array4[index4].replace("%", "");
        gjjdaikuanlv = gjjdaikuanlv / 100
      } else if (index4 == 1) {
        gjjdaikuanlv = array4[0].replace("%", "");
        gjjdaikuanlv = gjjdaikuanlv / 100 * 1.1
      } else if (index4 == 2) {
        gjjdaikuanlv = array4[0].replace("%", "");
        gjjdaikuanlv = gjjdaikuanlv / 100 * 1.2
      }
      if (index5 == 0) {
        sydaikuanlv = array5[index5].replace("%", "");
        sydaikuanlv = sydaikuanlv / 100
      } else if (index5 == 1) {
        sydaikuanlv = array5[0].replace("%", "");
        sydaikuanlv = sydaikuanlv / 100 * 1.1
      } else if (index5 == 2) {
        sydaikuanlv = array5[0].replace("%", "");
        sydaikuanlv = sydaikuanlv / 100 * 1.2
      }
      if (gjj == '' || gjj == undefined || gjj == null) {
        wx.showToast({
          title: '请输入公积金贷款额度',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        return
      }
      if (sydk == '' || sydk == undefined || sydk == null) {
        wx.showToast({
          title: '请输入商业贷款额度',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        return
      }
      let gjjyuelixi = gjjdaikuanlv / 12
      let syyuelixi = sydaikuanlv / 12
      // 等额本金
      let yueshu = nian * 12//总月数
      //月还款利息
      let yhklx = gjj * 10000 * gjjdaikuanlv / 12;
      let debjyhk = (gjj * 10000 / yueshu + yhklx).toFixed(2)
      let debjyhkjs = (gjj * 10000 / yueshu * gjjdaikuanlv / 12).toFixed(2)
      let yhklx2 = sydk * 10000 * gjjdaikuanlv / 12;
      let debjyhk2 = (sydk * 10000 / yueshu + yhklx).toFixed(2)
      let debjyhkjs2 = (sydk * 10000 / yueshu * gjjdaikuanlv / 12).toFixed(2)
      // 等额本金总利息
      let debjzlx = Number(((yueshu + 1) * gjj * 10000 * gjjyuelixi / 2).toFixed(2)) + Number(((yueshu + 1) * sydk * 10000 * syyuelixi / 2).toFixed(2))

      // 等额本息

      let debxyhk = (gjj * 10000 * (gjjyuelixi * (Math.pow(1 + gjjyuelixi, yueshu)) / ((Math.pow(1 + gjjyuelixi, yueshu)) - 1))).toFixed(2)
      let debxyhk2 = (sydk * 10000 * (syyuelixi * (Math.pow(1 + syyuelixi, yueshu)) / ((Math.pow(1 + syyuelixi, yueshu)) - 1))).toFixed(2)
      // 等额本息总还款
      let debxzlx = (debxyhk * yueshu - gjj * 10000).toFixed(2)
      console.log(debxzlx)
      let shuju = {
        zongje: parseInt(gjj) + parseInt(sydk),
        zongys: yueshu,
        debx: {
          lx: debxzlx,
          yhk: (Number(debxyhk) + Number(debxyhk2)).toFixed(2),
          hkze: (Number(debxzlx)+ Number(sydk)*10000 + Number(gjj)*10000).toFixed(2),
        },
        debj: {
          lx: debjzlx,
          yhk: Number(debjyhk) + Number(debjyhk2),
          hkze: (Number(debjzlx)+ Number(sydk)*10000 + Number(gjj)*10000).toFixed(2),
          yjs: (Number(debjyhkjs) + Number(debjyhkjs2)).toFixed(2)
        }

      }
      wx.setStorageSync('jsjg', shuju)
      wx.navigateTo({
        url: '../jsjg/index',
      })
    }
  }
})