var config = {
    apiKey: "AIzaSyAUhckuI7eonmR3kNmUC3vBOrnoz2NLscY",
    authDomain: "yeah-8ac6b.firebaseapp.com",
    databaseURL: "https://yeah-8ac6b.firebaseio.com/",
    projectId: "yeah-8ac6b",
    storageBucket: "yeah-8ac6b.appspot.com",
    messagingSenderId: "1051077492767"
  };
  var dataInt = firebase.initializeApp(config);
  var database = firebase.database();
  var app = firebase.initializeApp(config, "app");


//NAVBAR
$(function () {
    $('.navbar-toggler').on('click', function(event) {
    	event.preventDefault();
		$(this).closest('.navbar-minimal').toggleClass('open');
	});
});
function htmlbodyHeightUpdate(){
    	var height3 = $( window ).height();
		var height1 = $('.nav').height()+50;
		height2 = $('.main').height();
		if(height2 > height3){
			$('html').height(Math.max(height1,height3,height2)+10);
			$('body').height(Math.max(height1,height3,height2)+10);
		}
		else
		{
			$('html').height(Math.max(height1,height3,height2));
			$('body').height(Math.max(height1,height3,height2));
		}
		
	}
	$(document).ready(function () {
		htmlbodyHeightUpdate();
		$( window ).resize(function() {
			htmlbodyHeightUpdate();
		});
		$( window ).scroll(function() {
			height2 = $('.main').height();
  			htmlbodyHeightUpdate();
		});
	});


	var name;

var avatar;
function writeUserData(name, avatar) {
  firebase.database().ref('users/' + name + avatar).set({
    label1:"loading",
    label2:"loading",
    label3:"loading",
    label4:"loading"
  });
}





//First screen on click
$("#go").on("click", function(){
	//Save the name feild to firebase
	name = $("#name").val();  //////////////Save Variable in firebase!
	$(".screen1").addClass("rotateOutUpRight");
	$(".screen1").removeClass("fadeIn");
	$(".name").hide(2000);
	$(".screen1").hide(2000);
	$(".screen2").show();
	$("#screen2").show();
	$("#camera").show();
	$("#camera").addClass("bounceIn");
	$("#screen2text").css("display", "inline-block");
	$("#screen2text").addClass("bounceIn");
	$("#hi").text("Hello, " + name);





avatar = "piggy"
writeUserData(name,avatar)
// database.ref('users/' + name + avatar).set(null);
database.ref('users/' + name + avatar).on("value", function(snapshot) {
console.log(name + avatar)
console.log("snapshot.val().label1 " + snapshot.val().label1)
console.log("snapshot" + snapshot)
console.log("snapshot.val() " + snapshot.val() )
    // if (snapshot.val() !== null){
    $("#w1selected").html("<p id='w1selected' class='white-text'>" + snapshot.val().label1 + "</p>");
    $("#w2selected").html("<p id='w2selected' class='white-text'>" + snapshot.val().label2 + "</p>");
    $("#w3selected").html("<p id='w3selected' class='white-text'>" + snapshot.val().label3 + "</p>");
    $("#w4selected").html("<p id='w4selected' class='white-text'>" + snapshot.val().label4 + "</p>");
});
// });






});



//When user uploads a photo
$('input[name=userImage]').change(function(ev) {


    $(".screen2").hide(2000);
    $(".screen3").show(2000);
    $("#word3,#word2,#word1,#word4").show();
    $("#word1,#word2,#word3,#word4").removeClass("slideOutLeft");
});
var urlI;
//Image Results-Show image
document.getElementById('file-input').addEventListener('change', readURL, true);
function readURL(){
    var file = document.getElementById("file-input").files[0];
    var uploader = document.getElementById("file-input");
    var storageRef = firebase.storage(app).ref(name + avatar + "-" + file.name);
    storageRef.put(file);

    var reader = new FileReader();
    reader.onloadend = function(){
    	urlI = "url(" + reader.result + ")";
        document.getElementById('image').style.backgroundImage = urlI;        
    };
    if(file){
        reader.readAsDataURL(file);
    }else{
    }
}



//If you click a word to learn the rest disappear
var currentWord="";

$("#word1").on("click", function(){
	$("#word2,#word3,#word4").addClass("slideOutLeft");
	$("#word2,#word3,#word4").hide(2000);
	$("#chooseWord").hide();
	$("#spanishWord").show();
	$("#learnedWord").show();
	$("#again").css("display","block");
	currentWord=$("#w1selected").html();
});
$("#word2").on("click", function(){
	$("#word1,#word3,#word4").addClass("slideOutLeft");
	$("#word1,#word3,#word4").hide(2000);
	$("#chooseWord").hide();
	$("#spanishWord").show();
	$("#learnedWord").show();
	$("#again").css("display","block");
	currentWord=$("#w2selected").html();
});
$("#word3").on("click", function(){
	$("#word2,#word1,#word4").addClass("slideOutLeft");
	$("#word2,#word1,#word4").hide(2000);
	$("#chooseWord").hide();
	$("#spanishWord").show();
	$("#learnedWord").show();
	$("#again").css("display","block");
	currentWord=$("#w3selected").html();
});
$("#word4").on("click", function(){
	$("#word2,#word3,#word1").addClass("slideOutLeft");
	$("#word2,#word3,#word1").hide(2000);
	$("#chooseWord").hide();
	$("#spanishWord").show();
	$("#learnedWord").show();
	$("#again").css("display", "block");
	currentWord=$("#w4selected").html();
});

$("#again").on("click",function(){
	photoReset();
	firebase.database().ref('users/' + name + avatar).set({
    label1:"loading",
    label2:"loading",
    label3:"loading",
    label4:"loading"
  });

});


//Translate word and Text to Speech
$(document).on('click', '.card-block', function(){
//toTrans = $(this).text());
            var toTrans = currentWord;//This is for testing
            console.log(toTrans);
            var queryUrl = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170717T055534Z.fafe5687552c2a8e.cd5a229178514ac69372d803a9ee77478464085b&lang=en-es&text=" + toTrans ;
            $.ajax({
            url: queryUrl,
            dataType: 'json',
            success: function (data) {
            console.log(data);
      
            $("#spokenSpanish").html(data.text[0]);
            

            //Text to Speech -VOICERRS
			//Speak translated spanish word after you have clicked on the english word
			var spanish = $("#spokenSpanish").html();
	
			$("audio").attr("src","http://api.voicerss.org/?key=87273ff6f9054afc9379fe0b04c92efa&hl=es-mx&src=" +spanish+ ">");

            }
            });
            });





function photoReset(){
	$(".screen2").show();
	$("#screen2").show();
	$("#camera").show();
	$("#camera").addClass("bounceIn");
	$("#screen2text").css("display", "inline-block");
	$("#screen2text").addClass("bounceIn");
	$("#hi").text("Hello, " + name);
	$("#spanishWord").hide();
	$("#learnedWord").hide();
	$("#again").hide();
	$("#image").css("background-image","");
	$(".screen3").hide();
	urlI=" ";
}
