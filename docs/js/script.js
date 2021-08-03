// declre search varibales
var birthDate = document.querySelector("#birthDate");
var submitEl = document.querySelector("#submit");


// Declare variable containers to fill

// News containers
var mostReadEl = document.querySelector("#newsContent");
var newsOnDay = document.querySelector("#newsContentDay");

//Astrological containers

var colorEl = document.querySelector("#color");
var compatibilityEl = document.querySelector("#compatibility");
var descriptionEl = document.querySelector("#description");
var luckyNumberEl = document.querySelector("#luckyNumber");
var luckyTimeEl = document.querySelector("#luckyTime");
var moodEl = document.querySelector("#mood");

// delacre date values

var year; 
var month;
var day;

// limit calendar to past dates

var currentDate = moment().format("YYYY-MM-DD");
console.log(currentDate);
document.getElementById("birthDate").max = currentDate


//function to render search results

function renderSearch(event) {
  // Prevent default action
  event.preventDefault();
  
  // convert input date into separate variables

  year = birthDate.value.substring(0,4);
  month = birthDate.value.substring(5,7);
  day = birthDate.value.substring(8,10);


  // clear containers
   document.getElementById("newsContentDay").innerHTML = "";
   document.getElementById("newsContent").innerHTML = "";

   colorEl.innerHTML = "";
   compatibilityEl.innerHTML = "";
   descriptionEl.innerHTML = "";
   luckyNumberEl.innerHTML = "";
   luckyTimeEl.innerHTML = "";
   moodEl.innerHTML = "";


    // pass variables into sign finder

   horoscopeSignFinder(month, day);
   displayNews(year, month, day);
   displayNewsDay(year, month, day);
   
}

// generate astrological sign form date input
function horoscopeSignFinder(month,day) {
   var sign="";
   if (month == 1 && day <=19) {sign = "Capricorn";}
   if (month == 1 && day >=20) {sign = "Aquarius";}
   if (month == 2 && day <=18) {sign = "Aquarius";}
   if (month == 2 && day >=19) {sign = "Pisces";}
   if (month == 3 && day <=20) {sign = "Pisces";}
   if (month == 3 && day >=21) {sign = "Aries";}
   if (month == 4 && day <=20) {sign = "Aries";}
   if (month == 4 && day >=21) {sign = "Taurus";}
   if (month == 5 && day <=20) {sign = "Taurus";}
   if (month == 5 && day >=21) {sign = "Gemini";}
   if (month == 6 && day <=20) {sign = "Gemini";}
   if (month == 6 && day >=21) {sign = "Cancer";}
   if (month == 7 && day <=21) {sign = "Cancer";}
   if (month == 7 && day >=22) {sign = "Leo";}
   if (month == 8 && day <=21) {sign = "Leo";}
   if (month == 8 && day >=22) {sign = "Virgo";}
   if (month == 9 && day <=21) {sign = "Virgo";}
   if (month == 9 && day >=22) {sign = "Libra";}
   if (month == 10 && day <=21) {sign = "Libra";}
   if (month == 10 && day >=22) {sign = "Scorpio";}
   if (month == 11 && day <=21) {sign = "Scorpio";}
   if (month == 11 && day >=22) {sign = "Sagittarius";}
   if (month == 12 && day <=20) {sign = "Sagittarius";}
   if (month == 12 && day >=21) {sign = "Capricorn";}

   if (month == "x" || day == "y") return;
   // pass sign into function to generate horoscope
   generateAstrological(sign);
 }

// fetches astrological data from third party API

function generateAstrological (sign) {
   fetch("https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=" + sign + "&day=today", {
	"method": "POST",
	"headers": {
		"x-rapidapi-key": "9c4972a57dmshb34194303b62712p1b697fjsn85a919b3ee7d",
		"x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com"
	}
})
   .then(response => {
      if (!response.ok) {
         throw response.json();
      }
      return response.json()
   })
   .then(function (data) {
      console.log(data);
      // sends astrological data into display function
      displayAstrological(data);
   })
   .catch(err => {
      console.error(err);
   });
   
}

// displays astrological data
function displayAstrological(astroData) {
   console.log(astroData.color);
      colorEl.innerHTML = "<span style='color:gold; font-weight: bold;'>Your color: </span>" + astroData.color;
      compatibilityEl.innerHTML = "<span style='color:gold;; font-weight: bold;'>Your compatibility: </span>" +astroData.compatibility;
      descriptionEl.innerHTML = "<span style='color:gold;; font-weight: bold;'>Description: </span>" + astroData.description;
      luckyNumberEl.innerHTML = "<span style='color:gold;; font-weight: bold;'>Lucky Number: </span>" + astroData.lucky_number;
      luckyTimeEl.innerHTML = "<span style='color:gold;; font-weight: bold;'>Lucky Time: </span>" + astroData.lucky_time;
      moodEl.innerHTML = "<span style='color:gold;; font-weight: bold;'>Mood: </span>"  + astroData.mood;
}

// uses Wikipedia api to return results for given month and day

function displayNews (year, month, day){
  var request_url="https://en.wikipedia.org/api/rest_v1/feed/featured/" + year +"/" + month + "/" +day ;
   fetch(request_url, {
      "method": "GET"
      }
   )
   .then(response => {
      if (!response.ok) {
         throw response.json();
      }
      return response.json()
   })
   .then(function (data) {
      console.log(data);
      if (data.mostread.articles.length === 0) {
         mostReadEl = "There are no events for this day"
         return;
      }
         var Ulist=document.createElement("div");
         var ulIndex=document.createElement("ul");
    for (var i = 0; i < 6; i++) {

         // create link to insert data
         
         var liIndex=document.createElement("li");
         
         var eventEl = document.createElement('a');

         // turn result into link to article
         eventEl.setAttribute("href", data.mostread.articles[i].content_urls.desktop.page);
         eventEl.setAttribute("target", "_blank");
   

         var eventTitle = document.createElement("span");
         eventTitle.setAttribute('style','color:white;padding-left:5px;');          
         eventTitle.innerHTML = "<span style='color:gold; font-weight: bold;'>Description: </span>" + data.mostread.articles[i].description + "<br />";
         eventEl.appendChild(eventTitle);

       var displayEvent = document.createElement("span");

         eventEl.appendChild(displayEvent);
         liIndex.append(eventEl);
         ulIndex.append(liIndex);
    }
   
    Ulist.append(ulIndex);
    mostReadEl.appendChild(Ulist);
   })
   .catch(err => {
      mostReadEl.innerHTML="<span style='color:gold; font-weight: bold;'>No data available: </span> <span style='padding:30px 0px'>This feature was implemented in 2016</span>";
      console.error(err);
   });
   
}

// function to display news that happened on given date

function displayNewsDay (year, month, day){
  var request_url="https://en.wikipedia.org/api/rest_v1/feed/featured/" + year +"/" + month + "/" +day ;
   fetch(request_url, {
      "method": "GET"
      }
   )
   .then(response => {
      if (!response.ok) {
         throw response.json();
      }
      return response.json()
   })
   .then(function (data) {
      console.log(data);
      if (data.onthisday.length === 0) {
         newsOnDay = "There are no events for this day"
         return;
      }
         var Ulist=document.createElement("div");

         var ulIndex=document.createElement("ul");
    for (var i = 0; i < 5; i++) {

         // create link to insert data
         var liIndex=document.createElement("li");
         
         var eventEl = document.createElement('a');

        // turn result into link to article
        eventEl.setAttribute("href", data.onthisday[i].pages[0].content_urls.desktop.page);
        eventEl.setAttribute("target", "_blank");
   

         var eventTitle = document.createElement("span");
         eventTitle.setAttribute('style','color:white;padding-left:5px;');          
         eventTitle.innerHTML = "<span style='color:gold; font-weight: bold;'>News: </span>" + data.onthisday[i].text + "<br />";
         eventEl.appendChild(eventTitle);

       var displayEvent = document.createElement("span");

         eventEl.appendChild(displayEvent);
         liIndex.append(eventEl);
         ulIndex.append(liIndex);
    }
   
    Ulist.append(ulIndex);
    console.log(newsOnDay);
    newsOnDay.appendChild(Ulist);
   })
   .catch(err => {
      newsOnDay.innerHTML="<span style='color:gold; font-weight: bold;'>No data available: </span> <span style='padding:30px 0px'>This feature was implemented in 2000</span>";;
      console.error(err);
   });
   
}

// Add listener to submit element for search function
submitEl.addEventListener("click", renderSearch);