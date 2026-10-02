 (function () {
    const overlay = document.getElementById('loadingOverlay');
    const content = document.getElementById('content');

    // 监听字体加载（若浏览器支持 FontFaceSet.ready）
    const fontsReady =
      document.fonts && document.fonts.ready
        ? document.fonts.ready
        : Promise.resolve();

    // 监听页面内所有图片加载完成
    const imagesReady = new Promise((resolve) => {
      const images = Array.from(document.images);
      if (images.length === 0) return resolve();

      let loaded = 0;
      const done = () => {
        loaded++;
        if (loaded === images.length) resolve();
      };

      images.forEach((img) => {
        if (img.complete) {
          done();
        } else {
          img.addEventListener('load', done);
          img.addEventListener('error', done); // 加载失败也算完成，避免卡死
        }
      });
    });

    // 两者都完成后再隐藏动画
    Promise.all([fontsReady, imagesReady]).then(() => {
      overlay.classList.add('is-hidden');
      content.classList.add('is-visible');

      // 过渡结束后从 DOM 移除，彻底释放
      overlay.addEventListener('transitionend', () => {
        overlay.remove();
      }, { once: true });
    });
  })();