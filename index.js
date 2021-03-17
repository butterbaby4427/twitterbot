const Twit = require('twit')
const config = require('./config.js');
const merriamKey = "05464a4d-097a-466d-b42c-c8afe4aa6a8b";
const newsKey = "Bf6a1033fd4049c2bb341767126f5ee3";

var T = new Twit(config);
var title;
var titleArray = [];
var Nurl;
var Turl;
var Mdata;
var Tdata;
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
		console.log(title);
		shmix(title);
		// 
	}

	function tweeted(error,data,response){
		if(error){
			console.log(error);
		}
	}
}

function shmix(words){//LOOPS THROUGH WORDS IN TITLE AND SWITCHES THEM OUT 
	var currWord;
	var currSyn; 
	
	function getTData(error,response,body){
		if(error){
			console.log(error);
		}
		TData = JSON.parse(body);
		//NEWSAPI IS WEIRD. THIS NEEDS TO BE HERE AS A RESULT. :)
		if(TData[0] === undefined){
		 	currSyn = currWord;
		} else 
		if(typeof TData[0] === 'string'){
			currSyn = TData[0];
		} else if ("meta" in TData[0]){
			currSyn = TData[0].meta.syns[0][Math.floor(Math.random()*TData[0].meta.syns[0].length)];
		} 
		if (typeof currSyn != 'string'){
			currSyn = currWord;
		}
		console.log(currWord);
		console.log(currSyn);
		titleArray.splice(number,1,currSyn);
		tweet = titleArray.join(" ");
		console.log(tweet);
		T.post('statuses/update', {status: tweet}, tweeted);
		function tweeted(error,data,response){
			if(error){
				console.log(error);
			}
		}
	}

	var longest;
	var lgth = 0;
	var number;
	titleArray = words.split(" ");

	for (var i = 0; i < titleArray.length; i++) {
	  if (titleArray[i].length > lgth) {
	    lgth = titleArray[i].length;
	    longest = titleArray[i];
	    number = i;
	  }
	}

	currWord = longest;
	Turl = "https://dictionaryapi.com/api/v3/references/thesaurus/json/"+currWord+"?key="+merriamKey;
	request(Turl, getTData);
}