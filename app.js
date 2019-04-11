'use strict';

//global variables
var allPic = [];
var roundOfTurn = 25;
var leftPic = document.getElementById('left');
var middlePic = document.getElementById('middle');
var rightPic = document.getElementById('right');


function Picture(name) {
  // images/sassy-goat.jpg
  this.filepath = `img/${name}.jpg`;
  this.name = name;
  this.view = 0;
  this.click = 0;
  allPic.push(this);
}

new Picture('bag');
new Picture('banana');
new Picture('bathroom');
new Picture('boots');
new Picture('breakfast');
new Picture('bubblegum');
new Picture('chair');
new Picture('cthulhu');
new Picture('dog-duck');
new Picture('dragon');
new Picture('pen');
new Picture('pet-sweep');
new Picture('scissors');
new Picture('shark');
new Picture('sweep');
new Picture('tauntaun');
new Picture('unicorn');
new Picture('usb');
new Picture('water-can');
new Picture('wine-glass');

//Arrays to hold data for the chart
var clicks = [];
var names = [];

function updateChartArrays(){
  for (var i = 0; i < allPic.length;i++){
    clicks[i] = allPic[i].click;
    names[i] = allPic[i].name;
  }
}

function showRandomPic(){
  var myMap = new Map();
  myMap.set(leftPic.title, '');
  myMap.set(middlePic.title, '');
  myMap.set(rightPic.title, '');
  console.log(myMap);

  var ramdom1 = Math.floor(Math.random() * allPic.length);
  var ramdom2 = Math.floor(Math.random() * allPic.length);
  var ramdom3 = Math.floor(Math.random() * allPic.length);
  //get rid of the duplicates in 3 pics
  console.log(myMap.size);
  while (ramdom1 === ramdom2 || ramdom1 === ramdom3 || ramdom2 === ramdom3 ||
      myMap.has(allPic[ramdom1].name)||
      myMap.has(allPic[ramdom2].name)||
      myMap.has(allPic[ramdom3].name)) {
    ramdom1 = Math.floor(Math.random() * allPic.length);
    ramdom2 = Math.floor(Math.random() * allPic.length);
    ramdom3 = Math.floor(Math.random() * allPic.length);
    console.log('duplicate found');
  }

  //increment of views
  allPic[ramdom1].view += 1;
  allPic[ramdom2].view += 1;
  allPic[ramdom3].view += 1;
  //left random pictures
  leftPic.src = allPic[ramdom1].filepath;
  leftPic.alt = allPic[ramdom1].name;
  leftPic.title = allPic[ramdom1].name;
  //middle random pictures
  middlePic.src = allPic[ramdom2].filepath;
  middlePic.alt = allPic[ramdom2].name;
  middlePic.title = allPic[ramdom2].name;
  //right random pictures
  rightPic.src = allPic[ramdom3].filepath;
  rightPic.alt = allPic[ramdom3].name;
  rightPic.title = allPic[ramdom3].name;
  console.log('currently showing before generating new ramdom: ', leftPic.alt,middlePic.alt,rightPic.alt);

}
function handlePicClick(event) {
  for(var i = 0; i < allPic.length;i++){
    if( allPic[i].name === event.target.title){
      allPic[i].click++;
      updateChartArrays();
    }
  }
  if(roundOfTurn > 1){
    showRandomPic();
    console.log(event.target);
  }
  //last chance
  else{
    console.log('you hit the last chance');
    leftPic.removeEventListener('click',handlePicClick);
    middlePic.removeEventListener('click',handlePicClick);
    rightPic.removeEventListener('click',handlePicClick);
    //list of vote info
    var votesInfo = document.getElementById('votes');
    for(var j = 0; j < allPic.length; j++){
      console.log(allPic[j].click + ' votes for the ' + allPic[j].name);
      var liEL = document.createElement('li');
      liEL.textContent = allPic[j].click + ' votes for the ' + allPic[j].name;
      votesInfo.appendChild(liEL);
    }
    drawChart();
    localStorage.setItem('imgData', JSON.stringify(allPic));
  }
  roundOfTurn --;
}

showRandomPic();

leftPic.addEventListener('click', handlePicClick);
middlePic.addEventListener('click', handlePicClick);
rightPic.addEventListener('click', handlePicClick);

// function checkStorage
if(localStorage.imgData){
  console.log('data exists.');
  allPic= JSON.parse(localStorage.imgData);
}
else{
  console.log('Storage doesn\'t exist.');
}

// event to clear storage
var clearStorage = document.getElementById('clear');
if(clearStorage){
  clearStorage.addEventListener('click', clearAll);
}
function clearAll(){
  localStorage.clear();
  alert('You just clear all data!');
}


// ++++++++++++++++++++++++++++++++++++++++++++
// CHART STUFF
// Charts rendered using Chart JS v.2.7.2
// http://www.chartjs.org/
// ++++++++++++++++++++++++++++++++++++++++++++

var data = {
  labels: names, // names array we declared earlier
  datasets: [{
    label: 'Votes',
    data: clicks, // clicks array we declared earlier
    backgroundColor: [
      'bisque',
      'darkgray',
      'burlywood',
      'lightblue',
      'navy',
      'salmon',
      'darksalmon',
      'lightcoral',
      'indianred',
      'crimson',
      'lightgoldenrodyellow',
      'papayawhip',
      'moccasin',
      'peachpuff',
      'palegoldenrod',
      'aqua',
      'aquamarine',
      'lightskyblue',
      'skyblue',
      'deepskyblue',
    ],
    hoverBackgroundColor: [
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
    ]
  }]
};

function drawChart() {
  var ctx = document.getElementById('funky-chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}




