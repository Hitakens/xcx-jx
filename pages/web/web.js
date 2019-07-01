Page({
    data: {
        tempurl: "",
        jumpurl: ""
    },
    onLoad: function(n) {
        this.setData({
            tempurl: decodeURIComponent(n.url)
        }), wx.hideShareMenu({});
    },
    onReady: function() {},
    onShow: function() {
      getApp().globalData.webShowed = !0, this.setData({
            jumpurl: this.data.tempurl
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});