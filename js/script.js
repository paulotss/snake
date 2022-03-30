'use strict';

$(document).ready(function() {
    let container = $("#container");
    container.css('height', window.innerHeight + 'px');

    let screen = $("#screen");
    let style = "width:20px; height:20px; background-color:#000000";
    for(let x = 1; x <= 30; x++) {
        for(let y = 1; y <= 30; y++) {
            screen.append("<div id='s"+ "x" + x + "y" + y +"' style='"+ style +"'></div>");
        }
    }

    const snake = {
        'y' : 14,
        'x' : 14,
        'control' : 0,
        'lastKey' : 39,
        'pause' : false,
        'speed': "fast",
        'body' : [], //This array will be the body. With this we can get head e tail
        'food' : "",
        'area' : [],
        'setFood' : function() {
            let adr = "";
            let vrf = false;
            for(let x = 1; x <= 30; x++) {
                for(let y = 1; y <= 30; y++) {
                    adr = "#s" + x + y;
                    vrf = this.body.includes(adr);
                    if(!vrf) {
                        this.area.push("#s"+ "x" + x + "y" + y);
                        vrf = false;
                    }
                }
            }

            let pos = Math.floor(Math.random() * (this.area.length - 1)) + 1;
            this.food = this.area[pos];
            $(this.food).css({'opacity' : "0.1"});
            //console.log(this.area);
        },
        'moveDefault' : function() {
            switch(this.lastKey) {
                case 38 : snake.x--; break; //top
                case 40 : snake.x++; break; //down
                case 37 : snake.y--; break; //left
                case 39 : snake.y++; break; //right
            }

        },
        'const' : function() {
            this.body.push("#s" + "x" + this.x.toString() + "y" + (this.y - 2).toString());
            this.body.push("#s" + "x" + this.x.toString() + "y" + (this.y - 1).toString());
            this.body.push("#s" + "x" + this.x.toString() + "y" + this.y.toString());  

            this.body.forEach(function(value) {
                $(value).css({'opacity' : "0.1"})
            });


        },
        'check' : function() {
            switch(snake.control) {
                case 38 : 
                    if(snake.x > 1 && snake.lastKey != 40) { 
                        snake.x--; 
                        snake.lastKey = snake.control;
                        snake.move()
                    } else if(snake.x > 1) {
                        snake.moveDefault();
                        snake.move()
                    } break; //top
                case 40 : 
                    if(snake.x < 30 && snake.lastKey != 38) { 
                        snake.x++; 
                        snake.lastKey = snake.control;
                        snake.move()
                    } else if(snake.x < 30) {
                        snake.moveDefault();
                        snake.move()
                    } break; //down
                case 37 : 
                    if(snake.y > 1 && snake.lastKey != 39) { 
                        snake.y--; 
                        snake.lastKey = snake.control;
                        snake.move()
                    } else if(snake.y > 1) {
                        snake.moveDefault();
                        snake.move()
                    } break; //left
                case 39 : 
                    if(snake.y < 30 && snake.lastKey != 37) { 
                        snake.y++; 
                        snake.lastKey = snake.control;
                        snake.move()
                    } else if(snake.y < 30) {
                        snake.moveDefault();
                        snake.move()
                    } break; //right
                default : 
                    if(snake.x > 1 && snake.x < 30 && snake.y > 1 && snake.y < 30) { 
                        snake.moveDefault();
                        snake.move()
                    };
            }
                    
        },
        'move' : function() {
            let vrf = snake.body.includes("#s" + "x" + snake.x.toString() + "y" + snake.y.toString());

            if(!vrf && !snake.pause) {
                snake.body.push("#s" + "x" + snake.x.toString() + "y" + snake.y.toString());
                $(snake.body[snake.body.length - 1]).css({'opacity' : "0.1"});

                if(snake.body[snake.body.length - 1] === this.food) {
                    $(this.food).css({'opacity' : '0.1'});
                    $(this.food).animate({opacity : '0.1'}, snake.speed, function() {
                        snake.setFood();
                        snake.check();
                    });
                } else {
                    $(snake.body[0]).animate({opacity : '1'},snake.speed, function() {

                        $(snake.body[0]).css({'opacity' : "1"});
                        snake.body.shift();
        
                        snake.check();
                    });
                }
            }
            
        }
    }

    $("#start").click(function() {
        if($(this).text() === "START") {
            snake.const();
            snake.setFood();
            snake.check();
            $(this).text("PAUSE");
        } else if ($(this).text() === "PAUSE") {
            snake.pause = true;
            $(this).text("CONTINUE");
        } else if($(this).text() === "CONTINUE") {
            snake.pause = false;
            snake.move();
            $(this).text("PAUSE");
        }
    });


    $("#reset").click(function() {
        window.location.assign(window.location.href);
    });

    

    $(document).keydown(function(e) {
        snake.control = e.keyCode;
    });
        

});