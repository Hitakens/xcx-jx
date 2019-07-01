App({
    onLaunch: function() {},
    globalData: {
        userInfo: null
    },
    onHide: function() {
      this.globalData.webShowed = !1;
    },
  globalData: {
    webShowed: !1,
    pathUrl:"http://192.168.2.121:8081/main",
    imgUrl: "https://www.jaiy.online/",
    //pathUrl: "https://www.jaiy.online/spring-boot-qjin"
    }
});