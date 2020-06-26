/**
 * 
 * @param {Object} config 相关参数
 * app: 容器 id，渲染 9x9
 * play 按钮 id, 绑定点击事件
 * time 动画时间 单位 s
 * timingFunction transition-timing-function: 动画速度函数
 */
function flip(config) {
  let app = ''; // 缓存容器
  let numberList = []; // 保存数字
  let firstPostion = {}; // 初始位置信息
  let lastPostion = {}; // 结束位置信息
  let isPlaying = false; // 防止多次点击
  // 洗牌算法
  function randomList(list) {
    for (let index = list.length - 1; index >= 0; index--) {
      const lastItem = list[index];
      const randomIndex = Math.floor(Math.random() * index);
      const randomItem = list[randomIndex];
      list[index] = randomItem;
      list[randomIndex] = lastItem;
    }
    return list;
  }
  /**
   * 初始化容器 id，数字，按钮事件
   */
  function init() {
    app = document.getElementById(config.app);
    if (!app) throw new Error('容器元素 id 错误')
    var btn = document.getElementById(config.play);
    if (!btn) throw new Error('按钮 id 错误')
    btn.addEventListener('click', function () {
      play(config);
    }, false);
    firstPostion = render(initList());
    lastPostion = render(randomList(numberList));
    invert();
  }
  /**
   * 初始化随机列表
   */
  function initList() {
    for (let i = 0; i < 81; i++) {
      let key = Math.random().toString(36).substring(2);
      let value = i % 9 + 1;
      numberList.push({ key, value });
    }
    numberList = randomList(numberList);
    return numberList;
  }
  /**
   * 渲染 dom
   * @param {List<Object>} 列表
   */
  function render(list) {
    if (!list || !Array.isArray(list)) throw new Error('渲染列表必须是数组');
    let numberDom = "";
    list.forEach(item => {
      numberDom += `<div class='number' id='${item.key}'>${item.value}</div>`;
    })
    app.innerHTML = numberDom;
    let domList = app.querySelectorAll(`div`);
    let postionList = getPostion(domList);
    return postionList;
  }
  /**
   * 获取dom列表位置信息
   * @param {Array} domList 元素的 dom 列表
   */
  function getPostion(domList) {
    let firstInfo = {};
    domList.forEach(item => {
      let rectInfo = item.getBoundingClientRect();
      firstInfo[item.id] = {
        left: rectInfo.left,
        top: rectInfo.top
      }
    });
    return firstInfo;
  }
  /**
   * invert元素的位置
   */
  function invert() {
    let domList = app.querySelectorAll(`div`);
    let trans = {};
    for (const key in firstPostion) {
      let trX = firstPostion[key].left - lastPostion[key].left;
      let trY = firstPostion[key].top - lastPostion[key].top;
      trans[key] = `translateX(${trX}px) translateY(${trY}px)`;
    }
    domList.forEach(item => {
      item.style.transform = trans[item.id];
    });
  }
  /**
   * play:添加 transition, 移除 transform
   */
  function play() {
    if (isPlaying) return;
    isPlaying = true;
    setTimeout(() => {
      replay();
      isPlaying = false;
    }, config.time * 1000);
    let transition = `all ${config.time}s ${config.timingFunction}`;
    let domList = app.querySelectorAll(`div`);
    domList.forEach(item => {
      item.style.transform = 'none';
      item.style.transition = transition;
    });
  }
  /**
   * 重复动画
   */
  function replay() {
    firstPostion = lastPostion;
    lastPostion = render(randomList(numberList));
    invert();
  }
  init();
}
