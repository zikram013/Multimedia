$(window).load(function(){
    game.init();
});

var game = {
    init:function(){
        levels.init();
        $('.gamelayer').hide();
        $('#gamestartscreen').show();

        game.canvas=$('#gamecanvas')[0];
        //game.canvas=document.getElementById('gamecanvas');
        game.context = game.canvas.getContext('2d');    
    },

    showLevelScreen:function () {
        $('.gamelayer').hide();
        $('#levelselectscreen').show('slow');
    },
}



var levels = {
    data:[
        {
            foreground:'desert-foreground',
            background: 'clouds-background',
            entities:[]
        },
        {
            foreground:'desert-foreground',
            background:'clouds-background',
            entities:[]
        }
    ],

    init:function(){ 
        var html="";
        for(var i=0;i<levels.data.length;i++){
            var level=levels.data[i];
            html += '<input type="button" value="'+(i+1)+'">';
        };
        $('#levelselectscreen').html(html);

        $('#levelselectscreen input').click(function() {
            levels.load(this.value-1);
            $('#levelselectscreen').hide();
          });
     },
     load:function(number){
        game.currentLevel={number:number,hero:[]};
        game.score=0;
        $('#score').html('Score: '+game.score);
        var level=levels.data[number];
        game.currentLevel.backgroundImage=loader.loadImage(level.background+".png");
        game.currentLevel.foregroundImage=loader.loadImage(level.foreground+".png");
        game.slingshotImage=loader.loadImage("slingshot.png");
        game.slingshotFrontImage=loader.loadImage("slingshot-front.png");

        if(loader.loaded){
            game.start();
        }else{
            loader.onload=game.start;
        }
    }
}

var loader={
    loaded:true,
    loadedCount:0,//Assets que han sido cargados antes
    totalCount:0,//numero total de assets que es necesario cargar

    init:function(){
        //compureba el soporte para sonido
        var mp3Support,oggSupport;
        var audio=document.createElement('audio');
        if(audio.canPlayType){
            mp3Support="" != audio.canPlayType('audio/mpeg');
            oggSupport="" != audio.canPlayType('audio/ogg;codecs="vorbis"');
        }else{
            mp3Support=false;
            oggSupport=false;
        }
        loader.soundFileExtn=oggSupport?".ogg":mp3Support?".mp3":undefined;
    },

    loadImage:function(url){
        this.totalCount++;
        this.loaded=false;
        $('#loadingscreen').show('slow');
        var image=new Image();
        image.src=url;
        image.onload=loader.itemLoaded;
        console.log(image);
        return image;
    },

    soundFileExtn:".ogg",
    loadSound:function(url){
        this.totalCount++;
        this.loaded=false;
        $('#loadingscreen').show('slow');
        var audio=new Audio();
        audio.src=url+loader.soundFileExtn;
        audio.addEventListener("canplaythrough",loader.itemLoaded,false);
        return audio;
    },
   /* itemLoaded:function(){
        loader.loadedCount++;
        $('#loadingmessage').html('Loaded'+loader.loadedCount+'of'+loader.itemLoaded,false);
        return audio;
    },*/
    itemLoaded:function(){
        
        loader.loadedCount++;
        $('#loadingmessage').html('Loaded'+loader.loadedCount+'of'+loader.totalCount);
        if(loader.loadedCount === loader.totalCount){
            loader.loaded=true;
            $('#loadingscreen').hide();
            if(loader.onload){
                loader.onload();
                loader.onload=undefined;
            }
        }
    },

   
}

