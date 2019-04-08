'use strict';

//global variables
var allPic = [];
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



// var previous;
function showRandomPic(){
  var ramdom1 = Math.floor(Math.random() * allPic.length);
  var ramdom2 = Math.floor(Math.random() * allPic.length);
  var ramdom3 = Math.floor(Math.random() * allPic.length);
  
  // console.log('currently showing before generating new ramdom', allPic.alt);
  // while (goatpic.alt === allGoats[ramdom].name) {
  //   var ramdom = Math.floor(Math.random() * allGoats.length);
  //   console.log('duplicate found');
  // }
  // previous = ramdom;
  // allPic[ramdom].view += 1;
  leftPic.src = allPic[ramdom1].filepath;
  leftPic.alt = allPic[ramdom1].name;
  leftPic.title = allPic[ramdom1].name;

  middlePic.src = allPic[ramdom2].filepath;
  middlePic.alt = allPic[ramdom2].name;
  middlePic.title = allPic[ramdom2].name;

  rightPic.src = allPic[ramdom3].filepath;
  rightPic.alt = allPic[ramdom3].name;
  rightPic.title = allPic[ramdom3].name;

}

function handlePicClick(event) {
  console.log(event.target);
  showRandomPic();
}

showRandomPic();

leftPic.addEventListener('click', handlePicClick);
middlePic.addEventListener('click', handlePicClick);
rightPic.addEventListener('click', handlePicClick);
