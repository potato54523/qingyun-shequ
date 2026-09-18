const rippleBtns = document.querySelectorAll('.ripple-btn');
let touchFlag = false;

// 全局监听鼠标点击，重置标记，解决空白点击后按钮失效
document.addEventListener('click', () => {
  touchFlag = false;
});

rippleBtns.forEach(btn => {
  btn.addEventListener('touchstart', function(e) {
    touchFlag = true;
    createRipple(e, this);
  })

  btn.addEventListener('click', function(e) {
    if(touchFlag){
      return;
    }
    createRipple(e, this);
  })
})

function createRipple(event, btnDom) {
  const rect = btnDom.getBoundingClientRect();
  let x, y;

  if(event.touches){
    x = event.touches[0].clientX - rect.left;
    y = event.touches[0].clientY - rect.top;
  }else{
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
  }

  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = size + 'px';
  ripple.style.height = size + 'px';
  ripple.style.left = (x - size/2) + 'px';
  ripple.style.top = (y - size/2) + 'px';

  btnDom.appendChild(ripple);

  ripple.addEventListener('animationend', ()=>{
    ripple.remove();
  })
}