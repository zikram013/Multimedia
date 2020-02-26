
var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;


(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = 
		  window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	}
 
	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
			  timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
 
	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
}());

$(window).load(function() {
	game.init();
});

var game = {
	
	init: function(){
		 
		levels.init();
		loader.init();
		mouse.init();


		game.backgroundMusicSaiyan=loader.loadSound('dragonballzbudokaitenkaichi');
		game.backgroundMusicNamek=loader.loadSound('luzfuegodestruccion');
		game.backgroundMusicCell=loader.loadSound('dbgt');
		game.backgroundMusicBuu=loader.loadSound('dragonballzbudokai3');

		game.slingshotReleasedSound = loader.loadSound("released");
		game.bounceSound = loader.loadSound('bounce');
	
		game.kiSound=loader.loadSound('dbz-ki');


		game.breakSound = {
			"glass":loader.loadSound('glassbreak'),
			"wood":loader.loadSound('woodbreak'),
			
		};


		
		$('.gamelayer').hide();
		$('#gamestartscreen').show();

		
		game.canvas = document.getElementById('gamecanvas');
		game.context = game.canvas.getContext('2d');
	},	  
	startBackgroundMusic:function(){
		var toggleImage = $("#togglemusic")[0];	
		if(game.currentLevel.number==3){
			game.backgroundMusicNamek.play();
			toggleImage.src="sound.png";

		}else if(game.currentLevel.number==2){
			game.backgroundMusicCell.play();
			toggleImage.src="sound.png";
		
		}else if(game.currentLevel.number==1){
			game.backgroundMusicBuu.play();
			toggleImage.src="sound.png";
		}else if(game.currentLevel.number==0){
			game.backgroundMusicSaiyan.play();
			toggleImage.src="sound.png";
		}/*else{
			game.backgroundMusic.play();
			toggleImage.src="sound.png";
		}*/

			
	},
	stopBackgroundMusic:function(){
		var toggleImage = $("#togglemusic")[0];	
		toggleImage.src="nosound.png";	
		if(game.currentLevel.number==3){
			game.backgroundMusicNamek.pause();
			game.backgroundMusicNamek.currTime=0;
		}else if(game.currentLevel.number==2){
			game.backgroundMusicCell.pause();
			game.backgroundMusicCell.currTime=0;
		}else if(game.currentLevel.number==1){
			game.backgroundMusicBuu.pause();
			game.backgroundMusicBuu.currentTime=0;
		}else if(game.currentLevel.number==0){
			game.backgroundMusicSaiyan.pause();
			game.backgroundMusicSaiyan.currentTime=0;
		}/*
		else{
			game.backgroundMusic.pause();
			game.backgroundMusic.currentTime = 0; 
		}*/
		
	},
	toggleBackgroundMusic:function(){
		var toggleImage = $("#togglemusic")[0];
		/*if(game.backgroundMusic.paused){
			game.backgroundMusic.play();
			toggleImage.src="sound.png";	
		} else {
			game.backgroundMusic.pause();	
			$("#togglemusic")[0].src="nosound.png";
		}*/

		if(game.backgroundMusicNamek.paused){
			game.backgroundMusicNamek.play();
			toggleImage.src="sound.png";
		}else{
			game.backgroundMusicNamek.pause();
			$("#togglemusic")[0].src="nosound.png";
		}

		if(game.backgroundMusicBuu.paused){
			game.backgroundMusicBuu.play();
			toggleImage.src="sound.png";
		}else{
			game.backgroundMusicBuu.pause();
			$("#togglemusic")[0].src="nosound.png";
		}

		if(game.backgroundMusicCell.paused){
			game.backgroundMusicCell.play();
			toggleImage.src="sound.png";
		}else{
			game.backgroundMusicCell.pause();
			$("#togglemusic")[0].src="sound.png";
		}

		if(game.backgroundMusicSaiyan.paused){
			game.backgroundMusicSaiyan.play();
			toggleImage.src="sound.png";
		}else{
			game.backgroundMusicSaiyan.pause();
			$("#togglemusic")[0].src="sound.png";
		}

	},
	showLevelScreen:function(){
		$('.gamelayer').hide();
		$('#levelselectscreen').show('slow');

	},

	//volver a pantalla inicio
	mainScreen:function(){
		$('.gamelayer').hide();
		$('#gamestartscreen').show();
	},

	//pantalla de settings
	showSettingsScreen:function(){
		$('.gamelayer').hide();
		$('#settingsscreen').show('slow');
	},

	launchFullScreen:function(element){
		if(element.requestFullScreen) {
			element.requestFullScreen();
		  } else if(element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		  } else if(element.webkitRequestFullScreen) {
			element.webkitRequestFullScreen();
		  }
	},

	exitFullScreen:function(element){
		if(document.cancelFullScreen) {
			document.cancelFullScreen();
		} else if(document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if(document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}
	},

	restartLevel:function(){
		window.cancelAnimationFrame(game.animationFrame);		
		game.lastUpdateTime = undefined;
		levels.load(game.currentLevel.number);
	},
	startNextLevel:function(){
		window.cancelAnimationFrame(game.animationFrame);		
		game.lastUpdateTime = undefined;
		levels.load(game.currentLevel.number+1);
	},
	
	mode:"intro", 

	slingshotX:140,
	slingshotY:280,
	start:function(){
		$('.gamelayer').hide();
		
		$('#gamecanvas').show();
		$('#scorescreen').show();
	
		game.startBackgroundMusic();
	
		game.mode = "intro";	
		game.offsetLeft = 0;
		game.ended = false;
		game.animationFrame = window.requestAnimationFrame(game.animate,game.canvas);
	},		

	

	maxSpeed:3,

	minOffset:0,
	maxOffset:300,

	offsetLeft:0,

	score:0,

	
	panTo:function(newCenter){
		if (Math.abs(newCenter-game.offsetLeft-game.canvas.width/4)>0 
			&& game.offsetLeft <= game.maxOffset && game.offsetLeft >= game.minOffset){
		
			var deltaX = Math.round((newCenter-game.offsetLeft-game.canvas.width/4)/2);
			if (deltaX && Math.abs(deltaX)>game.maxSpeed){
				deltaX = game.maxSpeed*Math.abs(deltaX)/(deltaX);
			}
			game.offsetLeft += deltaX; 
		} else {
			
			return true;
		}
		if (game.offsetLeft <game.minOffset){
			game.offsetLeft = game.minOffset;
			return true;
		} else if (game.offsetLeft > game.maxOffset){
			game.offsetLeft = game.maxOffset;
			return true;
		}		
		return false;
	},
	countHeroesAndVillains:function(){
		game.heroes = [];
		game.villains = [];
		for (var body = box2d.world.GetBodyList(); body; body = body.GetNext()) {
			var entity = body.GetUserData();
			if(entity){
				if(entity.type == "hero"){				
					game.heroes.push(body);			
				} else if (entity.type =="villain"){
					game.villains.push(body);
				}
			}
		}
	},
  	mouseOnCurrentHero:function(){
		if(!game.currentHero){
			return false;
		}
		var position = game.currentHero.GetPosition();
		var distanceSquared = Math.pow(position.x*box2d.scale - mouse.x-game.offsetLeft,2) + Math.pow(position.y*box2d.scale-mouse.y,2);
		var radiusSquared = Math.pow(game.currentHero.GetUserData().radius,2);		
		return (distanceSquared<= radiusSquared);	
	},
	handlePanning:function(){
		   if(game.mode=="intro"){		
			   if(game.panTo(700)){
				   game.mode = "load-next-hero";
			   }			 
		   }	   

		   if (game.mode=="wait-for-firing"){  
			if (mouse.dragging){
				if (game.mouseOnCurrentHero()){
					game.mode = "firing";
				} else {
					game.panTo(mouse.x + game.offsetLeft)
				}
			} else {
				game.panTo(game.slingshotX);
			}
		}

		if (game.mode == "firing"){  
			if(mouse.down){
				game.panTo(game.slingshotX);
				var distance = Math.sqrt(Math.pow(mouse.x-mouse.downX,2) + Math.pow(mouse.y-mouse.downY,2));
				var maxDistance = 130;
				if (maxDistance > distance){
					game.currentHero.SetPosition({x:(mouse.x+game.offsetLeft)/box2d.scale,y:mouse.y/box2d.scale});
				} else {
					var angle = Math.atan2(mouse.y-mouse.downY,mouse.x-mouse.downX);
					game.currentHero.SetPosition({x:(mouse.downX + maxDistance * Math.cos(angle)+game.offsetLeft)/box2d.scale,y:(mouse.downY + maxDistance * Math.sin(angle))/box2d.scale});
				}				
				//game.currentHero.SetPosition({x:(mouse.x+game.offsetLeft)/box2d.scale,y:mouse.y/box2d.scale});
			} else {
				game.mode = "fired";
				game.slingshotReleasedSound.play();								
				var impulseScaleFactor = 0.75;
				
				
				var slingshotCenterX = game.slingshotX + 35;
				var slingshotCenterY = game.slingshotY+25;
				var impulse = new b2Vec2((slingshotCenterX -mouse.x-game.offsetLeft)*impulseScaleFactor,(slingshotCenterY-mouse.y)*impulseScaleFactor);
				game.currentHero.ApplyImpulse(impulse,game.currentHero.GetWorldCenter());

			}
		}

		if (game.mode == "fired"){		
		
			var heroX = game.currentHero.GetPosition().x*box2d.scale;
			game.panTo(heroX);

		
			if(!game.currentHero.IsAwake() || heroX<0 || heroX >game.currentLevel.foregroundImage.width ){
			
				box2d.world.DestroyBody(game.currentHero);
				game.currentHero = undefined;
			
				game.mode = "load-next-hero";
			}
		}
		

		if (game.mode == "load-next-hero"){
			game.countHeroesAndVillains();

		
			if (game.villains.length == 0){
				game.mode = "level-success";
				return;
			}

			
			if (game.heroes.length == 0){
				game.mode = "level-failure"	
				return;		
			}

			
			if(!game.currentHero){
				game.currentHero = game.heroes[game.heroes.length-1];
				game.currentHero.SetPosition({x:180/box2d.scale,y:200/box2d.scale});
	 			game.currentHero.SetLinearVelocity({x:0,y:0});
	 			game.currentHero.SetAngularVelocity(0);
				game.currentHero.SetAwake(true);				
			} else {
		
				game.panTo(game.slingshotX);
				if(!game.currentHero.IsAwake()){
					game.mode = "wait-for-firing";
				}
			}
		   }	
   
			if(game.mode=="level-success" || game.mode=="level-failure"){		
				if(game.panTo(0)){
					game.ended = true;					
					game.showEndingScreen();
				}			 
			}
			

	  	},
		showEndingScreen:function(){
			game.stopBackgroundMusic();				
			if (game.mode=="level-success"){			
				if(game.currentLevel.number<levels.data.length-1){
					$('#endingmessage').html('Level Complete. Well Done!!!');
					$("#playnextlevel").show();
				} else {
					$('#endingmessage').html('All Levels Complete. Well Done!!!');
					$("#playnextlevel").hide();
				}
			} else if (game.mode=="level-failure"){			
				$('#endingmessage').html('Failed. Play Again?');
				$("#playnextlevel").hide();
			}		
	
			$('#endingscreen').show();
		},
	
	animate:function(){
		
		game.handlePanning();

	
			var currentTime = new Date().getTime();
			var timeStep;
			if (game.lastUpdateTime){
				timeStep = (currentTime - game.lastUpdateTime)/1000;
				if(timeStep >2/60){
					timeStep = 2/60
				}
				box2d.step(timeStep);
			} 
			game.lastUpdateTime = currentTime;
	

	
		game.context.drawImage(game.currentLevel.backgroundImage,game.offsetLeft/4,0,640,480,0,0,640,480);
		game.context.drawImage(game.currentLevel.foregroundImage,game.offsetLeft,0,640,480,0,0,640,480);

	
		game.context.drawImage(game.slingshotImage,game.slingshotX-game.offsetLeft,game.slingshotY);

		game.drawAllBodies();
	
		
		if(game.mode == "wait-for-firing" || game.mode == "firing"){  
			game.drawSlingshotBand();
		}

	
		game.context.drawImage(game.slingshotFrontImage,game.slingshotX-game.offsetLeft,game.slingshotY);

		if (!game.ended){
			game.animationFrame = window.requestAnimationFrame(game.animate,game.canvas);
		}	
	},
	drawAllBodies:function(){  
		box2d.world.DrawDebugData();	

				  
		for (var body = box2d.world.GetBodyList(); body; body = body.GetNext()) {
			var entity = body.GetUserData();
  
			if(entity){
				var entityX = body.GetPosition().x*box2d.scale;
				if(entityX<0|| entityX>game.currentLevel.foregroundImage.width||(entity.health && entity.health <0)){
					box2d.world.DestroyBody(body);
					if (entity.type=="villain"){
						game.score += entity.calories;
						$('#score').html('Score: '+game.score);
					}
					if (entity.breakSound){
						entity.breakSound.play();
					}
				} else {
					entities.draw(entity,body.GetPosition(),body.GetAngle())				
				}	
			}
		}
	},
	drawSlingshotBand:function(){
		game.context.strokeStyle = "rgb(68,31,11)"; // Color marrÃ³n oscuro
		game.context.lineWidth = 6; // Dibuja una lÃ­nea gruesa

		
		var radius = game.currentHero.GetUserData().radius;
		var heroX = game.currentHero.GetPosition().x*box2d.scale;
		var heroY = game.currentHero.GetPosition().y*box2d.scale;			
		var angle = Math.atan2(game.slingshotY+25-heroY,game.slingshotX+50-heroX);	
	
		var heroFarEdgeX = heroX - radius * Math.cos(angle);
		var heroFarEdgeY = heroY - radius * Math.sin(angle);
	
	
	
		game.context.beginPath();
	
		game.context.moveTo(game.slingshotX+50-game.offsetLeft, game.slingshotY+25);	

	
		game.context.lineTo(heroX-game.offsetLeft,heroY);
		game.context.stroke();		
	
		
		entities.draw(game.currentHero.GetUserData(),game.currentHero.GetPosition(),game.currentHero.GetAngle());
			
		game.context.beginPath();		
	
		game.context.moveTo(heroFarEdgeX-game.offsetLeft,heroFarEdgeY);
	
		
		game.context.lineTo(game.slingshotX-game.offsetLeft +10,game.slingshotY+30)
		game.context.stroke();
	},

}

var levels = {

	data:[
	 {   // Primer nivel 
		foreground:'PaprikaWasteland-foreground',
		background:'clouds-background',
		entities:[
			
			{type:"ground", name:"dirt", x:500,y:440,width:1000,height:20,isStatic:true},
			{type:"ground", name:"wood", x:185,y:390,width:30,height:80,isStatic:true},

			/*vegeta*/ 
			{type:"block", name:"wood", x:830,y:380,angle:90,width:100,height:25},
			{type:"block", name:"wood", x:900,y:380,angle:90,width:100,height:25},
			{type:"block", name:"glass", x:865,y:317.5,width:100,height:25},

			//pedestales saibaman
			{type:"block", name:"glass", x:450,y:320,width:100,height:25,isStatic:true},
			{type:"block", name:"glass", x:450,y:220,width:100,height:25,isStatic:true},
			{type:"block", name:"glass", x:450,y:120,width:100,height:25,isStatic:true},

			/*raditz*/
			{type:"block", name:"glass", x:607,y:300,angle:45,width:100,height:25,isStatic:true},
			{type:"block", name:"glass", x:695,y:300,angle:135,width:100,height:25,isStatic:true},
			{type:"block", name:"wood", x:651.5,y:247,width:130,height:25},
			/**nappa */
			{type:"block", name:"glass", x:687,y:135,angle:45,width:100,height:25,isStatic:true},
			{type:"block", name:"glass", x:775,y:135,angle:135,width:100,height:25,isStatic:true},
			{type:"block", name:"wood", x:731.5,y:82,width:130,height:25},

			//heroes
			{type:"hero",name:"SagaSaiyanGohan",x:150,y:405},
			{type:"hero",name:"carapiccolo2",x:120,y:405},
			{type:"hero",name:"krilinRecortadoCircular",x:90,y:405},
			//{type:"hero",name:"chaosCaraRecortada",x:60,y:405},
			{type:"hero",name:"yamchacararecortada",x:0,y:405},
			{type:"hero",name:"tenshinhancararecortada",x:60,y:405},
			{type:"hero",name:"caragokurecortadacircular",x:30,y:405},

			//villain
			{type:"villain", name:"Saibaman", x:450,y:277,calories:50},
			{type:"villain", name:"Saibaman", x:450,y:177,calories:50},
			{type:"villain", name:"Saibaman", x:450,y:77,calories:50,},
			{type:"villain", name:"nappa", x:731.5,y:39,calories:500},
			{type:"villain", name:"Raditz", x:651.5,y:204,calories:250},
			{type:"villain", name:"vegetasagasaiyan", x:865,y:274.5,calories:1000},
		]
	 },
		{   // Segundo nivel
			foreground:'namek-foreground',
			background:'namek-background',
			
			entities:[
				{type:"ground", name:"dirt", x:500,y:440,width:1000,height:20,isStatic:true},
				{type:"ground", name:"wood", x:185,y:390,width:30,height:80,isStatic:true},

				/*primera estructura*/ 
				{type:"block", name:"glass", x:457,y:385,angle:45,width:100,height:25,isStatic:true},
				{type:"block", name:"glass", x:545,y:385,angle:135,width:100,height:25,isStatic:true},
				{type:"block", name:"wood", x:501.5,y:332,width:130,height:25},
				{type:"block", name:"glass", x:449,y:275,angle:90,width:90,height:25},
				{type:"block", name:"glass", x:550,y:275,angle:90,width:90,height:25},
				{type:"block", name:"glass", x:457,y:205,angle:45,width:100,height:25,isStatic:true},
				{type:"block", name:"glass", x:545,y:205,angle:135,width:100,height:25,isStatic:true},
				{type:"block", name:"wood", x:501.5,y:152,width:130,height:25},

				/*segunda estructura*/ 
				{type:"block", name:"glass", x:665,y:418,width:100,height:25,isStatic:true},
				{type:"block", name:"wood", x:705,y:392,width:100,height:25,isStatic:true},
				{type:"block", name:"wood", x:745,y:366,width:100,height:25,isStatic:true},
				{type:"block", name:"glass", x:785,y:340,width:100,height:25},
				{type:"block", name:"wood", x:745,y:314,width:100,height:25,isStatic:true},
				{type:"block", name:"glass", x:705,y:288,width:100,height:25},
				{type:"block", name:"wood", x:745,y:262,width:100,height:25,isStatic:true},
				{type:"block", name:"glass", x:785,y:233.5,width:100,height:25},

				/*pedestal freezer*/ 
				{type:"block", name:"wood", x:900,y:380,angle:90,width:100,height:25,isStatic:true},	



				{type:"hero",name:"krilinRecortadoCircular",x:130,y:405},
				{type:"hero",name:"SagaSaiyanGohan",x:100,y:405},
				{type:"hero",name:"caravegetarecortadacircular",x:70,y:405},
				{type:"hero",name:"caragokusaiyan1recortadacircular",x:40,y:405},

				{type:"villain", name:"freezerKi", x:900,y:300,calories:1000},
				{type:"villain", name:"Ginyu", x:780,y:195,calories:1000},
				{type:"villain", name:"dodoria", x:501.5,y:290,calories:1000},
				{type:"villain", name:"burter", x:501.5,y:109.5,calories:1000},
				{type:"villain",name:"jeice", x:675,y:350,calories:1000},

			]
	},
		{//Tercer nivel
			foreground:'Cell-foreground',
			background:'clouds-background',
			entities:[
				{type:"ground", name:"dirt", x:500,y:440,width:1000,height:20,isStatic:true},
				{type:"ground", name:"wood", x:185,y:390,width:30,height:80,isStatic:true},

				//base
				{type:"block", name:"wood", x:470,y:417,width:100,height:25},
				//primera parte diagonal y su apoyo
				{type:"block", name:"wood", x:514,y:360,angle:135,width:100,height:25},
				{type:"block", name:"glass", x:565,y:385,angle:90,width:88,height:25},
				//segunda parte diagonal y su apoyo
				{type:"block", name:"wood", x:427,y:360,angle:45,width:100,height:25},
				{type:"block", name:"glass", x:375,y:385,angle:90,width:88,height:25},
				//tercera parte casita cercana
				{type:"block", name:"wood", x:650,y:385,angle:90,width:88,height:25},
				{type:"block", name:"wood", x:612,y:330,width:100,height:25},
				//cuarta parte casita alta
				{type:"block", name:"wood", x:750,y:385,angle:90,width:88,height:25},
				{type:"block", name:"glass", x:750,y:297,angle:90,width:88,height:25},
				{type:"block", name:"glass", x:698,y:240,width:130,height:25},
				{type:"block", name:"glass", x:650,y:285,angle:90,width:65,height:25},
				//tejado de la parte cuarta
				{type:"block", name:"glass", x:675,y:175,angle:110,width:100,height:25,isStatic:true},
				{type:"block", name:"glass", x:730,y:175,angle:70,width:100,height:25,isStatic:true},

				//pedestal para celljr
				{type:"block", name:"glass", x:475,y:300,width:100,height:25,isStatic:true},

				//pedestal cell
				{type:"block", name:"wood", x:870,y:300,width:100,height:25,isStatic:true},

				//heroes
				{type:"hero",name:"caragohanssj2recortecircular",x:130,y:405},
				{type:"hero",name:"caragokusaiyan1recortadacircular",x:100,y:405},
				{type:"hero",name:"caraVegetaSuperSaiyanrecortadacircular",x:70,y:405},
				{type:"hero",name:"trunksrecortadacircular",x:40,y:405},

				//villanos
				{type:"villain", name:"android17",x:703.05,y:96,calories:590},
				{type:"villain", name:"android18",x:702.5,y:400,calories:590},
				{type:"villain", name:"CellJR",x:475,y:257,calories:590},
				{type:"villain", name:"CellJR",x:605,y:285,calories:590},
				{type:"villain", name:"perfectCell",x:870,y:257,calories:590},
			]
			
	},
		{
			//Cuarto nivel
			foreground:'planetaSagrado-foreground',
			background:'clouds-background',
			

			entities:[
				{type:"ground", name:"dirt", x:500,y:440,width:1000,height:20,isStatic:true},
				{type:"ground", name:"wood", x:185,y:390,width:30,height:80,isStatic:true},

				//Barrera de ki
				{type:"ki", name:"ki-morado", x:350,y:315,width:40,height:100,isStatic:true},

				//Hace la casa del medio
				{type:"block", name:"glass", x:520,y:380,angle:90,width:100,height:25},
				{type:"block", name:"glass", x:470,y:317.5,width:100,height:25},
				{type:"block", name:"glass", x:420,y:380,angle:90,width:100,height:25},	

				//conexion de la casa con el muro
				{type:"block", name:"wood", x:470,y:253.5,angle:90,width:100,height:25},
				{type:"block", name:"wood", x:520,y:190,width:100,height:25},
				{type:"block", name:"glass", x:600,y:380,angle:90,width:100,height:25},
				{type:"block", name:"glass", x:570,y:317.5,width:100,height:25},
				{type:"block", name:"wood", x:565,y:253.5,angle:90,width:100,height:25},
				{type:"block", name:"wood", x:517.5,y:253.5,angle:90,width:100,height:25},
				//{type:"block", name:"wood", x:485,y:160,width:100,height:25,isStatic:true},

				//Hacemos la segunda parte
				{type:"block", name:"glass", x:715,y:380,angle:90,width:100,height:25},
				{type:"block", name:"glass", x:715,y:280,angle:90,width:100,height:25},
				{type:"block", name:"glass", x:715,y:180,angle:90,width:85,height:25},
				{type:"block", name:"glass", x:677,y:135,width:100,height:25,isStatic:true},
				{type:"block", name:"glass", x:577,y:135,width:100,height:25,isStatic:true},

				{type:"hero", name:"Gotenksrecortadocircular",x:130,y:415},
				{type:"hero", name:"gohanadultorecortadacircular",x:100,y:405},
				{type:"hero", name:"caraVegetaSuperSaiyanrecortadacircular",x:70,y:405},
				{type:"hero",name:"caragokusaiyan1recortadacircular",x:40,y:405},

				
				{type:"villain", name:"kidbuu",x:775,y:405,calories:1000},
				{type:"villain", name:"majinbuu",x:500,y:148,calories:1000},
				{type:"villain", name:"superbuu",x:625,y:93,calories:1000},
				{type:"villain", name:"babidi",x:480,y:400,calories:1000},
				{type:"villain", name:"dabra",x:560,y:400,calories:1000},
			]
		}
	],


	init:function(){
		var html = "";
		for (var i=0; i < levels.data.length; i++) {
			var level = levels.data[i];
			html += '<input type="button" value="'+(i+1)+'">';
		};
		$('#levelselectscreen').html(html);
		
	
		$('#levelselectscreen input').click(function(){
			levels.load(this.value-1);
			$('#levelselectscreen').hide();
		});
	},


	load:function(number){

		box2d.init();

	
		game.currentLevel = {number:number,hero:[]};
		game.score=0;
		$('#score').html('Score: '+game.score);
		game.currentHero = undefined;
		var level = levels.data[number];


	
		game.currentLevel.backgroundImage = loader.loadImage(level.background+".png");
		game.currentLevel.foregroundImage = loader.loadImage(level.foreground+".png");
		
	

		game.slingshotImage = loader.loadImage("slingshot.png");
		game.slingshotFrontImage = loader.loadImage("slingshot-front.png");

	
		for (var i = level.entities.length - 1; i >= 0; i--){	
			var entity = level.entities[i];
			entities.create(entity);			
		};

	   if(loader.loaded){
		   game.start()
	   } else {
		   loader.onload = game.start;
	   }
	}
}

var entities = {
	definitions:{
		"glass":{
			fullHealth:100,
			density:2.4,
			friction:0.4,
			restitution:0.15,
		},
		"wood":{
			fullHealth:500,
			density:0.7,
			friction:0.4,
			restitution:0.4,
		},
		"ki-morado":{
			density:3.0,
			friction:1.5,
			restitution:0.2,
		},
		"dirt":{
			density:3.0,
			friction:1.5,
			restitution:0.2,	
		},/*
		"burger":{
			shape:"circle",
			fullHealth:40,
			radius:25,
			density:1,
			friction:0.5,
			restitution:0.4,	
		},
		"sodacan":{
			shape:"rectangle",
			fullHealth:80,
			width:40,
			height:60,
			density:1,
			friction:0.5,
			restitution:0.7,	
		},
		"fries":{
			shape:"rectangle",
			fullHealth:50,
			width:40,
			height:50,
			density:1,
			friction:0.5,
			restitution:0.6,	
		},
		"apple":{
			shape:"circle",
			radius:25,
			density:1.5,
			friction:0.5,
			restitution:0.4,	
		},
		"orange":{
			shape:"circle",
			radius:25,
			density:1.5,
			friction:0.5,
			restitution:0.4,	
		},
		"strawberry":{
			shape:"circle",
			radius:15,
			density:2.0,
			friction:0.5,
			restitution:0.4,	
		},*/
		/*Personajes de bola de dragon*/
		"babidi":{
			shape:"rectangle",
			fullHealth:120,
			width:40,
			height:60,
			density:1,
			friction:0.5,
			restitution:0.7,
		},

		"dabra":{
			shape:"rectangle",
			fullHealth:120,
			width:40,
			height:60,
			density:1,
			friction:0.5,
			restitution:0.7,
		},

		"superbuu":{
			shape:"rectangle",
			fullHealth:120,
			width:40,
			height:60,
			density:1,
			friction:0.5,
			restitution:0.7,
		},

		"majinbuu":{
			shape:"rectangle",
			fullHealth:120,
			width:40,
			height:60,
			density:1,
			friction:0.5,
			restitution:0.7,
		},

		"kidbuu":{
			shape:"rectangle",
			fullHealth:120,
			width:40,
			height:60,
			density:1,
			friction:0.5,
			restitution:0.7,
		},

		"android18":{
			shape:"rectangle",
			fullHealth:120,
			width:40,
			height:60,
			density:1,
			friction:0.5,
			restitution:0.7,
		},

		"android17":{
			shape:"rectangle",
			fullHealth:120,
			width:40,
			height:60,
			density:1,
			friction:0.5,
			restitution:0.7,
		},

		"CellJR":{
			shape:"rectangle",
			fullHealth:120,
			width:40,
			height:60,
			density:1,
			friction:0.5,
			restitution:0.7,
		},

		"perfectCell":{
			shape:"rectangle",
			fullHealth:120,
			width:40,
			height:60,
			density:1,
			friction:0.5,
			restitution:0.7,
		},

		"dodoria":{
			shape:"rectangle",
			fullHealth:120,
			width:40,
			height:60,
			density:1,
			friction:0.5,
			restitution:0.7,
		},

		"jeice":{
			shape:"rectangle",
			fullHealth:120,
			width:40,
			height:60,
			density:1,
			friction:0.5,
			restitution:0.7,
		},

		"burter":{
			shape:"rectangle",
			fullHealth:120,
			width:40,
			height:60,
			density:1,
			friction:0.5,
			restitution:0.7,
		},

		"Ginyu":{
			shape:"rectangle",
			fullHealth:120,
			width:40,
			height:60,
			density:1,
			friction:0.5,
			restitution:0.7,
		},

		"freezerKi":{
			shape:"rectangle",
			fullHealth:120,
			width:40,
			height:60,
			density:1,
			friction:0.5,
			restitution:0.7,
		},

		"Raditz":{
			shape:"rectangle",
			fullHealth:120,
			width:40,
			height:60,
			density:1,
			friction:0.5,
			restitution:0.7,
		},

		"nappa":{
			shape:"rectangle",
			fullHealth:120,
			width:40,
			height:60,
			density:1,
			friction:0.5,
			restitution:0.7,
		},

		"vegetasagasaiyan":{
			shape:"rectangle",
			fullHealth:200,
			width:40,
			height:60,
			density:1,
			friction:0.5,
			restitution:0.7,
		},

		"Saibaman":{
			shape:"rectangle",
			fullHealth:50,
			width:40,
			height:60,
			density:1,
			friction:0.5,
			restitution:0.7,	
		},

		"Gotenksrecortadocircular":{
			shape:"circle",
			radius:15,
			density:2,
			friction:0.5,
			restitution:0.4,
		},
		
		"gohanadultorecortadacircular":{
			shape:"circle",
			radius:15,
			density:2,
			friction:0.5,
			restitution:0.4,
		},

		"trunksrecortadacircular":{
			shape:"circle",
			radius:15,
			density:2,
			friction:0.5,
			restitution:0.4,	
		},

		"caraVegetaSuperSaiyanrecortadacircular":{
			shape:"circle",
			radius:15,
			density:2,
			friction:0.5,
			restitution:0.4,
		},

		"caragohanssj2recortecircular":{
			shape:"circle",
			radius:15,
			density:2,
			friction:0.5,
			restitution:0.4,
		},

		"caragokusaiyan1recortadacircular":{
			shape:"circle",
			radius:15,
			density:2,
			friction:0.5,
			restitution:0.4,
		},

		"caravegetarecortadacircular":{
			shape:"circle",
			radius:15,
			density:2,
			friction:0.5,
			restitution:0.4,
		},

		"caragokurecortadacircular":{
			shape:"circle",
			radius:15,
			density:2,
			friction:0.5,
			restitution:0.4,
		},

		"carapiccolo2":{
			shape:"circle",
			radius:15,
			density:2,
			friction:0.5,
			restitution:0.4,
		},

		"krilinRecortadoCircular":{
			shape:"circle",
			radius:15,
			density:2,
			friction:0.5,
			restitution:0.4,
		},

		"SagaSaiyanGohan":{
			shape:"circle",
			radius:15,
			density:2,
			friction:0.5,
			restitution:0.4,
		},

		"chaosCaraRecortada":{
			shape:"circle",
			radius:15,
			density:2,
			friction:0.5,
			restitution:0.4,
		},

		"yamchacararecortada":{
			shape:"circle",
			radius:15,
			density:2,
			friction:0.5,
			restitution:0.4,
		},
		"tenshinhancararecortada":{
			shape:"circle",
			radius:15,
			density:2,
			friction:0.5,
			restitution:0.4,
		},
		
	},
	
	create:function(entity){
		var definition = entities.definitions[entity.name];	
		if(!definition){
			console.log ("Undefined entity name",entity.name);
			return;
		}	
		switch(entity.type){

			case "ki": // entidad ki
				entity.shape = "rectangle";	
				entity.sprite = loader.loadImage(entity.name+".png");						
				entity.kiSound = game.kiSound;
				box2d.createRectangle(entity,definition);				
				break;

			case "block": 
				entity.health = definition.fullHealth;
				entity.fullHealth = definition.fullHealth;
				entity.shape = "rectangle";	
				entity.sprite = loader.loadImage(entity.name+".png");						
				entity.breakSound = game.breakSound[entity.name];
				box2d.createRectangle(entity,definition);				
				break;
			case "ground": 
				entity.shape = "rectangle";  
				box2d.createRectangle(entity,definition);			   
				break;	
			case "hero":	
			case "villain": 
				entity.health = definition.fullHealth;
				entity.fullHealth = definition.fullHealth;
				entity.sprite = loader.loadImage(entity.name+".png");
				entity.shape = definition.shape;  
				entity.bounceSound = game.bounceSound;
				if(definition.shape == "circle"){
					entity.radius = definition.radius;
					box2d.createCircle(entity,definition);					
				} else if(definition.shape == "rectangle"){
					entity.width = definition.width;
					entity.height = definition.height;
					box2d.createRectangle(entity,definition);					
				}												 
				break;							
			default:
				console.log("Undefined entity type",entity.type);
				break;
		}		
	},


	draw:function(entity,position,angle){
		game.context.translate(position.x*box2d.scale-game.offsetLeft,position.y*box2d.scale);
		game.context.rotate(angle);
		switch (entity.type){
			//dibujo ki
			case "ki":
				game.context.drawImage(entity.sprite,0,0,entity.sprite.width,entity.sprite.height,
						-entity.width/2-1,-entity.height/2-1,entity.width+2,entity.height+2);	
			break;

			case "block":
				game.context.drawImage(entity.sprite,0,0,entity.sprite.width,entity.sprite.height,
						-entity.width/2-1,-entity.height/2-1,entity.width+2,entity.height+2);	
			break;
			case "villain":
			case "hero": 
				if (entity.shape=="circle"){
					game.context.drawImage(entity.sprite,0,0,entity.sprite.width,entity.sprite.height,
							-entity.radius-1,-entity.radius-1,entity.radius*2+2,entity.radius*2+2);	
				} else if (entity.shape=="rectangle"){
					game.context.drawImage(entity.sprite,0,0,entity.sprite.width,entity.sprite.height,
							-entity.width/2-1,-entity.height/2-1,entity.width+2,entity.height+2);
				}
				break;				
			case "ground":
			
				break;
		}

		game.context.rotate(-angle);
		game.context.translate(-position.x*box2d.scale+game.offsetLeft,-position.y*box2d.scale);
	}

}

var box2d = {
	scale:30,
	init:function(){
		
		var gravity = new b2Vec2(0,9.8); 
		var allowSleep = true; 
		box2d.world = new b2World(gravity,allowSleep);

		// Configurar depuraciÃ³n de dibujo
		var debugContext = document.getElementById('debugcanvas').getContext('2d');
		var debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(debugContext);
		debugDraw.SetDrawScale(box2d.scale);
		debugDraw.SetFillAlpha(0.3);
		debugDraw.SetLineThickness(1.0);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);	
		box2d.world.SetDebugDraw(debugDraw);
	
		var listener = new Box2D.Dynamics.b2ContactListener;
		listener.PostSolve = function(contact,impulse){
			var body1 = contact.GetFixtureA().GetBody();
			var body2 = contact.GetFixtureB().GetBody();
			var body3= contact.GetFixtureA().GetBody();
			var entity1 = body1.GetUserData();
			var entity2 = body2.GetUserData();
			var entity3 = body3.GetUserData();

			var impulseAlongNormal = Math.abs(impulse.normalImpulses[0]);
			
			if(impulseAlongNormal>5){
					
				if (entity1.health){
					entity1.health -= impulseAlongNormal;
				}	

				if (entity2.health){
					entity2.health -= impulseAlongNormal;
				}	
		
							
				if (entity1.bounceSound){
					entity1.bounceSound.play();
				}

				if (entity2.bounceSound){
					entity2.bounceSound.play();
				}
				
				if (entity3.kiSound){
					entity3.kiSound.play();
				}
			} 
		};
		box2d.world.SetContactListener(listener);
	},  
	step:function(timeStep){

		box2d.world.Step(timeStep,8,3);
	},
	createRectangle:function(entity,definition){
			var bodyDef = new b2BodyDef;
			if(entity.isStatic){
				bodyDef.type = b2Body.b2_staticBody;
			} else {
				bodyDef.type = b2Body.b2_dynamicBody;
			}
			
			bodyDef.position.x = entity.x/box2d.scale;
			bodyDef.position.y = entity.y/box2d.scale;
			if (entity.angle) {
				bodyDef.angle = Math.PI*entity.angle/180;
			}
			
			var fixtureDef = new b2FixtureDef;
			fixtureDef.density = definition.density;
			fixtureDef.friction = definition.friction;
			fixtureDef.restitution = definition.restitution;

			fixtureDef.shape = new b2PolygonShape;
			fixtureDef.shape.SetAsBox(entity.width/2/box2d.scale,entity.height/2/box2d.scale);
			
			var body = box2d.world.CreateBody(bodyDef);	
			body.SetUserData(entity);
			
			var fixture = body.CreateFixture(fixtureDef);
			return body;
	},
	
	createCircle:function(entity,definition){
			var bodyDef = new b2BodyDef;
			if(entity.isStatic){
				bodyDef.type = b2Body.b2_staticBody;
			} else {
				bodyDef.type = b2Body.b2_dynamicBody;
			}
			
			bodyDef.position.x = entity.x/box2d.scale;
			bodyDef.position.y = entity.y/box2d.scale;
			
			if (entity.angle) {
				bodyDef.angle = Math.PI*entity.angle/180;
			}			
			var fixtureDef = new b2FixtureDef;
			fixtureDef.density = definition.density;
			fixtureDef.friction = definition.friction;
			fixtureDef.restitution = definition.restitution;

			fixtureDef.shape = new b2CircleShape(entity.radius/box2d.scale);
			
			var body = box2d.world.CreateBody(bodyDef);	
			body.SetUserData(entity);

			var fixture = body.CreateFixture(fixtureDef);
			return body;
	}
}


var loader = {
	loaded:true,
	loadedCount:0, 
	totalCount:0, 
	
	init:function(){
		
		var mp3Support,oggSupport;
		var audio = document.createElement('audio');
		if (audio.canPlayType) {
	   		
	  		mp3Support = "" != audio.canPlayType('audio/mpeg');
	  		oggSupport = "" != audio.canPlayType('audio/ogg; codecs="vorbis"');
		} else {
			
			mp3Support = false;
			oggSupport = false;	
		}

		
		loader.soundFileExtn = oggSupport?".ogg":mp3Support?".mp3":undefined;		
	},
	
	loadImage:function(url){
		this.totalCount++;
		this.loaded = false;
		$('#loadingscreen').show();
		var image = new Image();
		image.src = url;
		image.onload = loader.itemLoaded;
		return image;
	},
	soundFileExtn:".ogg",
	loadSound:function(url){
		this.totalCount++;
		this.loaded = false;
		$('#loadingscreen').show();
		var audio = new Audio();
		audio.src = url+loader.soundFileExtn;
		audio.addEventListener("canplaythrough", loader.itemLoaded, false);
		return audio;   
	},
	itemLoaded:function(){
		loader.loadedCount++;
		$('#loadingmessage').html('Loaded '+loader.loadedCount+' of '+loader.totalCount);
		if (loader.loadedCount === loader.totalCount){
			
			loader.loaded = true;
			
			$('#loadingscreen').hide();
			
			if(loader.onload){
				loader.onload();
				loader.onload = undefined;
			}
		}
	}
}

var mouse = {
	x:0,
	y:0,
	down:false,
	init:function(){
		$('#gamecanvas').mousemove(mouse.mousemovehandler);
		$('#gamecanvas').mousedown(mouse.mousedownhandler);
		$('#gamecanvas').mouseup(mouse.mouseuphandler);
		$('#gamecanvas').mouseout(mouse.mouseuphandler);
	},
	mousemovehandler:function(ev){
		var offset = $('#gamecanvas').offset();
		
		mouse.x = ev.pageX - offset.left;
		mouse.y = ev.pageY - offset.top;
		
		if (mouse.down) {
			mouse.dragging = true;
		}
	},
	mousedownhandler:function(ev){
		mouse.down = true;
		mouse.downX = mouse.x;
		mouse.downY = mouse.y;
		ev.originalEvent.preventDefault();
		
	},
	mouseuphandler:function(ev){
		mouse.down = false;
		mouse.dragging = false;
	}
}
