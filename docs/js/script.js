
// declre search varibales
var birthLocation = document.querySelector("#birthLocation");
var birthDate = document.querySelector("#birthDate");
var submitEl = document.querySelector("#submit");


// Declare variable containers to fill

// News container
var mostReadEl = document.querySelector("#newsContent");

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

//declare location input

var city;


//function to render search results

function renderSearch(event) {
  // Prevent default action
  event.preventDefault();
  
  // convert input date into separate variables

  year = birthDate.value.substring(0,4);
  month = birthDate.value.substring(5,7);
  day = birthDate.value.substring(8,10);
  city =birthLocation.value;
//   console.log(year, month, day, city);

  // pass variables into sign finder
  document.getElementById('newsContent').innerHTML = "";
   horoscopeSignFinder(month, day);
   displayNews(year, month, day);
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
   // console.log(sign);
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
         // signContent.innerHTML="There is no data for this year";
         throw response.json();
      }
      return response.json()
   })
   .then(function (data) {
      console.log(data);
      displayAstrological(data);
   })
   .catch(err => {
      console.error(err);
   });
   
}

function displayAstrological(astroData) {
   console.log(astroData.color);
      colorEl.innerHTML = "<span style='color:gold; font-weight: bold;'>Your color: </span>" + astroData.color;
      compatibilityEl.innerHTML = "<span style='color:gold;; font-weight: bold;'>Your compatibility : </span>" +astroData.compatibility;
      descriptionEl.innerHTML = "<span style='color:gold;; font-weight: bold;'>Description: </span>" + astroData.description;
      luckyNumberEl.innerHTML = "<span style='color:gold;; font-weight: bold;'>Lucky Number: </span>" + astroData.lucky_number;
      luckyTimeEl.innerHTML = "<span style='color:gold;; font-weight: bold;'>Lucky Time: </span>" + astroData.lucky_time;
      moodEl.innerHTML = "<span style='color:gold;; font-weight: bold;'>Mood: </span>"  + astroData.mood;
}


//Wikipedia application fornews feed that happen on a given day
/* For news feed --Better info. Need to match birth year to event
https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/02/04
*/

// uses Wikipedia api to return results for givne month and day

function displayNews (year, month, day){

   // generate api query for day and month
   // var request_url="https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/" + month + "/" + day;
   // generate qpi query for year day and month
  var request_url="https://en.wikipedia.org/api/rest_v1/feed/featured/" + year +"/" + month + "/" +day + "?per_page=9";
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
    for (var i = 0; i < 7; i++) {

         // create link to insert data
         
         var liIndex=document.createElement("li");
         
         var eventEl = document.createElement('a');

         // turn result into link to article
         eventEl.setAttribute("href", data.mostread.articles[i].content_urls.desktop.page);
         eventEl.setAttribute("target", "_blank");
   

         var eventTitle = document.createElement("span");
          eventTitle.setAttribute('style','color:white;padding-left:5px;');
         eventTitle.textContent = data.mostread.articles[i].description;

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
      console.error(err);
   });
   
}


// Add listener to submit element for searhc function
submitEl.addEventListener("click", renderSearch);



//A function that returns the horoscope Sign

// var signContent = document.querySelector('#signtext');
// var thesign= horoscope_sign(12,25);
// console.log(thesign);
// signContent.innerHTML=" <h1>Your horoscope sign is : " + thesign +"</h1>";
//return_astrological (thesign);
// born_date="1969-12-25" ; //YYYY-mo-day
// return_news(1969,12,25);
