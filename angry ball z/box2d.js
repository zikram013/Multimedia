//Declarar objetos utilizados como variables
var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
var b2RevoluteJointDef=Box2D.Dynamics.Joints.b2RevoluteJointDef;

var world;
var scale=30;

var context;

var timeStep=1/60;
var velocityiterations=8;
var positionIterations=3;

var specialBody;

function init(){
    var gravity=new b2Vec2(0,9.8);
    var allowSleep=true;

    world=new b2World(gravity,allowSleep);

    createFloor();
    createRectangularBody();
    createCircularBody();
    createSimplePolygonBody();
    createComplexBody();
    createRevolutionJoint();
    createSpecialBody();
    listenForContact();
    setupDebugDraw();
    animate();
}

function animate(){
    world.Step(timeStep,velocityiterations,positionIterations);
    world.ClearForces();
    world.DrawDebugData();

    if(specialBody){
        drawSpecialBody();
    }

    if(specialBody && specialBody.GetUserData().life<=0){
        world.DestroyBody(specialBody);
        specialBody=undefined;
        console.log("The special body was destroyed");
    }
    setTimeout(animate,timeStep);
}

function createFloor(){
    var bodyDef =new b2BodyDef;
    bodyDef.type=b2Body.b2_staticBody;
    bodyDef.position.x=640/2/scale;
    bodyDef.position.y=450/scale;

    var fixtureDef=new b2FixtureDef;
    fixtureDef.density=1.0;
    fixtureDef.friction=0.5;
    fixtureDef.restitution=0.2;

    fixtureDef.shape=new b2PolygonShape;
    fixtureDef.shape.SetAsBox(320/scale,10/scale);

    var body=world.CreateBody(bodyDef);
    var fixture=body.CreateFixture(fixtureDef);
}

var context;
function setupDebugDraw(){
    context=document.getElementById('canvas').getContext('2d');

    var debugDraw=new b2DebugDraw();
    debugDraw.SetSprite(context);
    debugDraw.SetDrawScale(scale);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_joinBit);
    world.SetDebugDraw(debugDraw);
}

function createRectangularBody(){
    var bodyDef=new b2BodyDef;
    bodyDef.type=b2Body.b2_dynamicBody;
    bodyDef.position.x=40/scale;
    bodyDef.position.y=100/scale;

    var fixtureDef=new b2FixtureDef;
    fixtureDef.density=1.0;
    fixtureDef.friction=0.5;
    fixtureDef.restitution=0.3;

    fixtureDef.shape=new b2PolygonShape;
    fixtureDef.shape.SetAsBox(30/scale,50/scale);

    var body=world.CreateBody(bodyDef);
    var fixture=body.CreateFixture(fixtureDef);
}

function createCircularBody(){
    var bodyDef=new  b2BodyDef;
    bodyDef.type=b2Body.b2_dynamicBody;
    bodyDef.position.x=130/scale;
    bodyDef.position.y=100/scale;

    var fixtureDef=new b2FixtureDef;
    fixtureDef.density=1.0;
    fixtureDef.friction=0.5;
    fixtureDef.restitution=0.7;

    fixtureDef.shape=new b2CircleShape(30/scale);
    //fixtureDef.shape.SetAsBox(30/scale,50/scale);

    var body=world.CreateBody(bodyDef);
    var fixture=body.CreateFixture(fixtureDef);
}

function createSimplePolygonBody(){
    var bodyDef=new  b2BodyDef;
    bodyDef.type=b2Body.b2_dynamicBody;
    bodyDef.position.x=230/scale;
    bodyDef.position.y=50/scale;

    var fixtureDef=new b2FixtureDef;
    fixtureDef.density=1.0;
    fixtureDef.friction=0.5;
    fixtureDef.restitution=0.2;

    fixtureDef.shape=new b2PolygonShape;

    var points=[
        new b2Vec2(0,0),
        new b2Vec2(40/scale,50/scale),
        new b2Vec2(50/scale,100/scale),
        new b2Vec2(-50/scale,100/scale),
        new b2Vec2(-40/scale,50/scale),
    ];

    fixtureDef.shape.SetAsArray(points,points.length);

    var body=world.CreateBody(bodyDef);
    var fixture=body.CreateFixture(fixtureDef);
}

function createComplexBody(){
    var bodyDef=new  b2BodyDef;
    bodyDef.type=b2Body.b2_dynamicBody;
    bodyDef.position.x=350/scale;
    bodyDef.position.y=50/scale;
    var body=world.CreateBody(bodyDef);

    var fixtureDef=new b2FixtureDef;
    fixtureDef.density=1.0;
    fixtureDef.friction=0.5;
    fixtureDef.restitution=0.7;
    fixtureDef.shape=new b2CircleShape(40/scale);

    fixtureDef.shape=new b2PolygonShape;
    var points=[
        new b2Vec2(0,0),
        new b2Vec2(40/scale,50/scale),
        new b2Vec2(50/scale,100/scale),
        new b2Vec2(-50/scale,100/scale),
        new b2Vec2(-40/scale,50/scale),
    ];

    fixtureDef.shape.SetAsArray(points,points.length);
    body.CreateFixture(fixtureDef);
}

function createRevolutionJoint(){
    var bodyDef1=new  b2BodyDef;
    bodyDef1.type=b2Body.b2_dynamicBody;
    bodyDef1.position.x=480/scale;
    bodyDef1.position.y=50/scale;
    var body1=world.CreateBody(bodyDef1);

    var fixtureDef1=new b2FixtureDef;
    fixtureDef1.density=1.0;
    fixtureDef1.friction=0.5;
    fixtureDef1.restitution=0.5
    fixtureDef1.shape=new b2PolygonShape;
    fixtureDef1.shape.SetAsBox(50/scale,10/scale);

    body1.CreateFixture(fixtureDef1);

    var bodyDef2=new  b2BodyDef;
    bodyDef2.type=b2Body.b2_dynamicBody;
    bodyDef2.position.x=470/scale;
    bodyDef2.position.y=50/scale;
    var body2=world.CreateBody(bodyDef2);

    var fixtureDef2=new b2FixtureDef;
    fixtureDef2.density=1.0;
    fixtureDef2.friction=0.5;
    fixtureDef2.restitution=0.5
    fixtureDef2.shape=new b2PolygonShape;

    var points=[
        new b2Vec2(0,0),
        new b2Vec2(40/scale,50/scale),
        new b2Vec2(50/scale,100/scale),
        new b2Vec2(-50/scale,100/scale),
        new b2Vec2(-40/scale,50/scale),
    ];

    fixtureDef2.shape.SetAsArray(points,points.length);
    body2.CreateFixture(fixtureDef2);

    var jointDef=new b2RevoluteJointDef;
    var jointCenter=new b2Vec2(470/scale,50/scale);

    jointDef.Initialize(body1,body2,jointCenter);
    world.CreateJoint(jointDef);
}

function createSpecialBody(){
    var bodyDef=new b2BodyDef;
    bodyDef.type=b2Body.b2_dynamicBody;
    bodyDef.position.x=450/scale;
    bodyDef.position.y=0/scale;

    specialBody=world.CreateBody(bodyDef);
    specialBody.SetUserData({name:"special",life:250});

    var fixtureDef=new b2FixtureDef;
    fixtureDef.density=1.0;
    fixtureDef.friction=0.5;
    fixtureDef.restitution=0.5;

    fixtureDef.shape=new b2CircleShape(30/scale);
    var fixture=specialBody.CreateFixture(fixtureDef);
}

function listenForContact(){
    var listener=new Box2D.Dynamics.b2ContactListener;
    listener.PostSolve=function(contact,impulse){
        var body1=contact.GetFixtureA().GetBody();
        var body2=contact.GetFixtureB().GetBody();

        if(body1==specialBody || body2==specialBody){
            var impulseAlongNormal=impulse.normalImpulses[0];
            specialBody.GetUserData().life-=impulseAlongNormal;
            console.log("the special body was in a collision with impulse",impulseAlongNormal,"and its life has now become ",specialBody.GetUserData().life);
        }
    };
    world.SetContactListener(listener);
}

function drawSpecialBody(){
    var position=specialBody.GetPosition();
    var angle=specialBody.GetAngle();

    context.translate(position.x*scale,position.y*scale);
    context.rotate(angle);

    context.fillStyle="rgb(200,150,250);";
    context.beginPath();
    context.arc(0,0,30,0,2*Math.PI,false);
    context.fill();

    context.fillStyle="rgb(255,255,255);";
    context.fillRect(-15,-15,10,5);
    context.fillRect(5,-15,10,5);

    context.strokeStyle="rgb(255,255,255);";
    context.beginPath();
    if(specialBody.GetUserData().life>100){
        context.arc(0,0,10,Math.PI,true);
    }else{
        context.arc(0,10,10,Math.PI,false);
    }
    context.stroke();

    context.rotate(-angle);
    context.translate(-position.x*scale,-position.y*scale);
}