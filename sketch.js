var ball;
var position, datebase;

function setup(){
    createCanvas(500,500);
    datebase = firebase.database();
    console.log(datebase);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var ballPosition = datebase.ref("ball/position");
    ballPosition.on("value",readPostion,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    datebase.ref("ball/position").set({
    "x": position.x + x,
    "y": position.y + y
    })
}

function readPostion(date){
    position = date.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showError(){
    console.log("houve um erro na escrita para o banco de dados");

}
