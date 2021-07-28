//A function that returns the horoscope Sign

var signContent = document.querySelector('#signtext');
var thesign= horoscope_sign(12,25);
console.log(thesign);
signContent.innerHTML=" <h1>Your horoscope sign is : " + thesign +"</h1>";
//return_astrological (thesign);
born_date="1969-12-25" ; //YYYY-mo-day
return_news(1969,12,25);

// RETURNS Astrological SIGNS

function return_astrological (sign){
   fetch("https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=" + sign +"&day=today", {
	"method": "POST",
	"headers": {
		"x-rapidapi-key": "9c4972a57dmshb34194303b62712p1b697fjsn85a919b3ee7d",
		"x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com"
	}
})
   .then(response => {
      if (!response.ok) {
         signContent.innerHTML="There is no data for this year";
         throw response.json();
      }
      return response.json()
     
   })
   .then(function (data) {
    console.log(data);
   })
   .catch(err => {
      console.error(err);
   });
   
}


//Wikipedia application fornews feed that happen on a given day
/* For news feed --Better info. Need to match birth year to event
https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/02/04
*/

function return_news (year,month, day){

   //For events
   var request_url="https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/" +month + "/" +day;
   // Put in the year day and month.. YYYY-mm-dd
 //  var request_url="https://en.wikipedia.org/api/rest_v1/feed/featured/" + year +"/" +month + "/" +day;
   fetch(request_url, {
      "method": "GET"
      }
   )
   .then(response => {
      if (!response.ok) {
         signContent.innerHTML="There is no data for this year";
         throw response.json();
      }
      return response.json()
     
   })
   .then(function (data) {
    console.log(data);
    console.log(" The year is "+ data.events[0].year);
    //Call a function to check the birth year against the events years
     //and display the appropriate ones in display function
    //Call a function to display the results
   })
   .catch(err => {
      console.error(err);
   });
   
}

function horoscope_sign(month,day) {
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
   return sign;
 }


