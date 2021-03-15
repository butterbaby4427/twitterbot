const Twit = require('twit')
const config = require('./config.js');
const merriamKey = "05464a4d-097a-466d-b42c-c8afe4aa6a8b";
const newsKey = "Bf6a1033fd4049c2bb341767126f5ee3";

var T = new Twit(config);
var title;
var titleArray;
var newArray = [];
var Nurl;
var Turl;
var Mdata;
var Tdata;
var currWord;
var currSyn;
var tweet = "";

const request = require('request');

botTweet();
setInterval(botTweet,1000*60*5); //TWEETS EVERY 5 MIN!!!

function botTweet(error,response,body){
	Nurl = "https://newsapi.org/v2/top-headlines?country=us&apiKey=" + newsKey;
  	
  	request(Nurl, getMData);

	function getMData(error,response,body){
		if(error){
			console.log(error);
		}
		MData = JSON.parse(body);
		title = MData.articles[Math.floor(Math.random()*MData.articles.length)].title;
		//title = MData.articles[1].title;
		console.log(title);
		console.log(shmix(title));
		tweet = newArray.join(" ");
	}

	function tweeted(error,data,response){
		if(error){
			console.log(error);
		}
	}
}

function shmix(words){
	var index;

	function getTData(error,response,body){
		if(error){
			console.log(error);
		}
		TData = JSON.parse(body);
		//console.log(TData);
		currSyn = TData[0];
		console.log(currSyn);
		//console.log(index);
		newArray[index] = currSyn;
		tweet = newArray.join(" ");
		console.log("tweet");
		T.post('statuses/update', {status: tweet}, tweeted);

		function tweeted(error, data, response){
	        if(error){
	        console.log(error);
	        } else {
	        console.log("You're doing great! " + data.text);
	        }
	    } 
	}

	var i;
	titleArray = words.split(" ");
	newArray = titleArray;
	//for(i =0; i < 1; i++){
		//console.log(titleArray.length);
		index = Math.floor(Math.random()*titleArray.length);
		currWord = titleArray[index];
		Turl = "https://dictionaryapi.com/api/v3/references/thesaurus/json/"+currWord+"?key="+merriamKey;
		request(Turl, getTData);
	//}
	//console.log(newArray);
	return newArray.join(' ');
}