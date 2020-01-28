$(window).load(function(){
    game.init();
});

var game = {
    init:function(){
        $('.gamelayer').hide();
        $('#gamestartscreen').show();

        //game.canvas=$('#gamecanvas')[0];
        game.canvas=document.getElementById('gamecanvas');
        game.context = game.canvas.getContext('2d');
        var levels = {
            data:[
                {
                    foreground:'desert-foreground',
                    background: 'clouds.background',
                    entities:[]
                },
                {
                    foreground:'desert-foreground',
                    background:'clouds-background',
                    entities:[]
                }
            ],
            init:function () { 
                var htmk="";
                for(var i=0;i<levels.data.length;i++){
                    var level=level.data[i];
                    html+='<input type="button" value="'+(i+1)+'">';
                };
                $('levelselectscreen').htmk(html);

                $('#levelselectscreen input').click(function () {
                    levels.load(this.value-1);
                    $('#levelselectscreen').hide();
                  });
             },
             load:function(number){

             }
        }
        
    }
}