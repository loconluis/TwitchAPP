var chn = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function getInfo(){
	chn.forEach(function(chn){
		function makeURL(type, name){
			return 'https://wind-bow.glitch.me/twitch-api/'+ type +'/'+ name +'?callback=?';
		};

		$.getJSON(makeURL("streams", chn), function(data){
			var game, status;
			if(data.stream === null){
				game = "Offline";
				status = "offline";
			} else if(data.stream === undefined){
				game = "Account Closed";
				status = "offline";
			}else{
				game = data.stream.game;
				status = "online";
			};
			$.getJSON(makeURL("channels", chn), function(data){
				var logo = data.logo != null ? data.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F",
					name = data.display_name != null ? data.display_name : chn,
					description = status === "online" ? ': ' + data.status : "";
					html = '<div class="row ' +
          status + '"><div class="col-xs-2 col-sm-1" id="icon"><img src="' +
          logo + '" class="logo"></div><div class="col-xs-10 col-sm-3" id="name"><a href="' +
          data.url + '" target="_blank">' +
          name + '</a></div><div class="col-xs-10 col-sm-8" id="streaming">'+
          game + '<span class="hidden-xs">' +
          description + '</span></div></div>';
				status === "online" ? $("#display").prepend(html) : $("#display").append(html);
			});
		});
	});
};


$(document).ready(function(){
	getInfo();
});
