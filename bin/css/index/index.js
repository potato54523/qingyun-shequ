const btn2 = document.getElementById('downloadBtn1');
 btn2.onclick = function(){
   // 文件地址
   const url = "user_download_assets/qingyunshequ/qingyun_shequ_Vs_1.apk";
   // 创建隐藏a标签触发下载
   const a = document.createElement('a');
   a.href = url;
   a.download = "qingyun_shequ_Vs_1.apk";
   document.body.appendChild(a);
   a.click();
   a.remove();
 }