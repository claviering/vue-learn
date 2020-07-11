// 前面补零
fillZero = (num, len) => num.toString().padStart(len, "0");

/**
 * 
 * @param {String} time 倒计时 hh:mm:ss
 */
function Time(time) {
  let hour, minute, secondTenDigits;
  /**
   * 初始化开始的秒数
   * @param {Number | String} second 
   */
  function initSecond(second) {
    second = Number.parseInt(second) % 10;
    let secondDom = document.querySelector('#second');
    let innerHTML = '';
    for (let index = 0; index < 10; index++) {
      let num = (second - index + 10) % 10;
      innerHTML += `<div>${num}</div>`;
    }
    secondDom.innerHTML = innerHTML;
  }
  /**
   * 初始化开始的秒的十位数
   * @param {Number | String} second 
   */
  function initSecondTenDigits(secondTenDigits) {
    secondTenDigits = Number.parseInt(secondTenDigits)
    let secondTenDigitsDom = document.querySelector('.second-ten-digits');
    secondTenDigitsDom.textContent = secondTenDigits;
  }
  /**
   * 初始化开始的分钟数
   * @param {Number | String} minute 
   */
  function initMinute(minute) {
    let minuteDom = document.querySelector('.minute');
    minuteDom.textContent = fillZero(minute || '00', 2);
  }
  /**
   * 初始化开始的分钟数
   * @param {Number | String} hour 
   */
  function initHour(hour) {
    let secondTenDigits = document.querySelector('.hour');
    secondTenDigits.textContent = fillZero(hour || '00', 2);
  }
  /**
   * 初始化内容
   * @param {Number} second 
   * @param {Number} minute 
   * @param {Number} hour 
   */
  function initTextContent(second, tmpSecondTenDigits, tmpMinute, tmpHour) {
    if (second) {
      initSecond(second);
    }
    if (tmpSecondTenDigits < 0 && 0 < tmpMinute) {
      secondTenDigits = 5;
      minute -= 1;
      tmpSecondTenDigits = 5;
      tmpMinute -= 1;
    } else if (tmpSecondTenDigits < 0 && tmpMinute <= 0 && 0 < tmpHour) {
      secondTenDigits = 5;
      minute = 59;
      hour -= 1;
      tmpSecondTenDigits = 5;
      tmpMinute = 59;
      tmpHour -= 1;
    } else if (tmpMinute <= 0 && tmpHour <= 0) {
      minute = 0;
      tmpMinute = 0;
    }
    initSecondTenDigits(tmpSecondTenDigits);
    initMinute(tmpMinute);
    initHour(tmpHour);
  }
  /**
   * 秒数的十进制位减 1
   */
  function decrease() {
    secondTenDigits = secondTenDigits - 1;
    initTextContent(false, secondTenDigits, minute, hour);
  }
  /**
   * 设置定时器
   * @param {Number} 总的秒数 
   */
  function interval(totalSecond) {
    if (!totalSecond) return;
    // 00 秒，立即执行一次
    if (totalSecond % 10 === 0) {
      decrease();
    }
    let timeInterval = '';
    timeInterval = setInterval(() => {
      totalSecond -= 1;
      if (!totalSecond) {
        clearInterval(timeInterval);
        togglePlay();
        return;
      }
      if (totalSecond % 10) return;
      decrease();
    }, 1000);
    togglePlay();
  }
  /**
   * 暂停/开始动画
   */
  function togglePlay() {
    let secondDom = document.querySelector('#second');
    secondDom.classList.toggle('running');
  }
  function init() {
    let timeSplit = time.split(':');
    hour = Number.parseInt(timeSplit[0]);
    minute = Number.parseInt(timeSplit[1]);
    second = Number.parseInt(timeSplit[2]);
    secondTenDigits = Math.floor(second / 10);
    let totalSecond = second + minute * 60 + hour * 3600;
    initTextContent(second, secondTenDigits, minute, hour);
    interval(totalSecond);
  }
  init();
}

let app = new Time('00:10:03');