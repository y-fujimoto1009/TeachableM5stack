let classifier;
let video;
let flippedVideo;
let label = "";
let modelURL, EZDataToken;
let isClassifying = false;
let interval;
const EZDataURL = "https://ezdata.m5stack.com/api/store/"
const EZDataTopic = "/result"

function setup() {
  //video canvas
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  //event listener
  select('#startButton').mousePressed(startClassification);
  select('#stopButton').mousePressed(stopClassification);
}

function startClassification() {
  modelURL = select('#modelURL').value();
  EZDataToken = select('#EZDataToken').value();
  
  if (!modelURL || !EZDataToken) {
    appendLog('サーバーURLまたはラベルが設定されていません。');
    return;
  }

  //load model
  classifier = ml5.imageClassifier(modelURL + 'model.json', video, modelLoaded);
  isClassifying = true;
  
  //interval needs to be about 5 seconds.
  interval = setInterval(() => {
    if (EZDataToken && label) {
      sendData();
    }
  }, 5000);
}

function stopClassification() {
  isClassifying = false;
  if (interval) {
    clearInterval(interval);
  }
  appendLog("停止しました。");
}

function modelLoaded() {
  appendLog("モデルが読み込まれました。");
  classifyVideo();
}

function draw() {
  background(0);
  if (video && isClassifying) {
    flippedVideo = ml5.flipImage(video);
    image(flippedVideo, 0, 0);
  }
  
  //label display
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

function classifyVideo() {
   if (isClassifying) {
    classifier.classify(flippedVideo, gotResult);
  }
}

function gotResult(error, results) {
  if (error) {
    appendLog(error);
    appendLog("モデル読み込みに失敗しました。");
    return;
  }
  label = results[0].label;
  classifyVideo();
}

function sendData() {
  //ezData
  let contentType = 'application/json';
  httpPost(EZDataURL + EZDataToken + EZDataTopic, contentType, { value: label }, function (result) {
    appendLog("送信結果:「 " + label + "」を送信");
  }, function (error) {
    appendLog(error);
    appendLog("送信に失敗しました。");
    return;
  });
}

function appendLog(message) {
  let logElem = select('#log');
  logElem.value(logElem.value() + message + '\n');
  logElem.elt.scrollTop = logElem.elt.scrollHeight;
}