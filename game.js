'use strict';

//var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;


window.onload = function run()
{
        game.parseXML();
        game.update();
}

var keys = 
{
    up: false,
    down: false,
    right: false,
    left: false
};



var game =
 {
    character: null,
    mapProperties: null,
    xmlinfoz: null,
    currentMap: "TileMap.tmx",
    tileSets: null,
    that: this,
	bool: false,
    browserWidth: document.documentElement.clientWidth,
	browserHeight: document.documentElement.clientHeight,
    
    init: function(tileSets)
    {
        game.character = new Character("bruno", 10, 40, 5);
        game.tileSets = tileSets;
        game.canvas2 = document.getElementById("foregroundCanvas");
        game.context2 = game.canvas2.getContext("2d");
        game.canvas3 = document.getElementById("grassCanvas");
        game.context3 = game.canvas3.getContext("2d");
        game.canvas = document.getElementById("backgroundCanvas");
        game.context = game.canvas.getContext("2d");
		
		game.canvas.width = game.browserWidth;
		game.canvas.height = game.browserHeight;
		
		game.canvasWidth = game.canvas.width;
		game.canvasHeight = game.canvas.height;
		game.canvasX = 0;
		game.canvasY = 0;
		
        renderBackground();
    },
    
    parseXML: function()
    {
        return xmlParse(game.currentMap, game.init);
    },
    
    update: function()
    {
            requestAnimationFrame(game.update, game.canvas2);
            updateData();
            renderForeground();
    },
};

function animateBackground(tileSets)
{
	var toBeAnimated = [];
	var animationInfo = [];
    for(var i = 0; i<game.tileSets[0].tileLocations.length; i++)
	{
		for(var j = 0; j<game.tileSets[0].animatedTiles.length; j++)
		{
			if(game.tileSets[0].tileLocations[i].id == game.tileSets[0].animatedTiles[j].id)
			{
				toBeAnimated.push(game.tileSets[0].tileLocations[i]);
				animationInfo.push(game.tileSets[0].animatedTiles[j]);
			}
		}
	}
	
	//console.log(animationInfo[0].attributes[0].value.nodeValue);
	

game.lavaFlag = false;
//console.log(game.lavaFlag);
	function animate()
	{	
		//console.log("in 1");
		for(i=0; i<toBeAnimated.length; i++)
		{
			for(j=0; j<toBeAnimated[i].tileXY.length; j++)
			{
					game.context.drawImage(tileSets[0].image, ((88)%16)*32, Math.floor(88/16.1)*32, tileSets[0].tileWidth, tileSets[0].tileHeight, toBeAnimated[i].tileXY[j].x, toBeAnimated[i].tileXY[j].y, 32, 32);		
			}

		}
	}
	function animate2()
	{
		//console.log("in 2");
		for(i=0; i<toBeAnimated.length; i++)
		{
			for(j=0; j<toBeAnimated[i].tileXY.length; j++)
			{
				game.context.drawImage(tileSets[0].image, ((87)%16)*32, Math.floor(87/16.1)*32, tileSets[0].tileWidth, tileSets[0].tileHeight, toBeAnimated[i].tileXY[j].x, toBeAnimated[i].tileXY[j].y, 32, 32);
			}
			
		}
	}
	
	setInterval(animate2, 500);
	setInterval(animate, 1000);
	//setTimeout(thing, 250);
	//thing = setInterval(animate, 500);



	/*
	game.context.drawImage(tileSets[z].image, ((gidpair[1]-1)%16)*32, 
	Math.floor(gidpair[1]/16.1)*32,tileSets[z].tileWidth, tileSets[z].tileHeight, 
	(gidpair[0]%100)*32, Math.floor(gidpair[0]/100)*32, 32, 32);
	*/
}

function renderBackground()
{
		for(var i = 0; i<game.tileSets.length; i++)
		{
			if(game.tileSets[i].isLoaded == false)
			{
				game.tileSets[i].load();
			}			
		}
        if(game.tileSets!=null && game.tileSets[0].isLoaded == true)
        {
            renderTiles(game.tileSets);				
            animateBackground(game.tileSets);
        }
}
function renderForeground()
{
    if(game.character!=null)
        animate(game.character);
}
function moveMap(x, y)
{
		console.log("in here");
		game.canvasX = x*32;
		game.canvasY = y*32;
}
function moveChar(x, y)
{
		console.log("in here");
		game.character.x = x*32;
		game.character.y = y*32;
}

//map
function renderTiles(tileSets)
{

    for(var z = 0; z<1; z++)
    {
			/*if(tileSets[z].isLoaded == false)
			{
				tileSets[z].load();
			}*/
            for(var i = 0; i<tileSets[z].gidList.length; i++)
            {
                for(var gidpair of tileSets[z].gidList[i])
                {
                    if(i == 2)
                    {
						game.tileSets[z].newLocation(gidpair[1]-1,(gidpair[0]%100)*32 ,Math.floor(gidpair[0]/100)*32);
                        game.context.drawImage(tileSets[z].image, ((gidpair[1]-1)%16)*32, (Math.floor(gidpair[1]/16.1)*32),tileSets[z].tileWidth, tileSets[z].tileHeight/2, (gidpair[0]%100)*32, Math.floor(gidpair[0]/100)*32, 32, 16);
                        game.context3.drawImage(tileSets[z].image, ((gidpair[1]-1)%16)*32, (Math.floor(gidpair[1]/16.1)*32)+16, tileSets[z].tileWidth, tileSets[z].tileHeight/2, (gidpair[0]%100)*32, Math.floor(gidpair[0]/100)*32+16, 32, 16);
                    }
                    else 
                    {
						game.tileSets[z].newLocation(gidpair[1]-1,(gidpair[0]%100)*32 ,Math.floor(gidpair[0]/100)*32);
                        game.context.drawImage(tileSets[z].image, ((gidpair[1]-1)%16)*32, Math.floor(gidpair[1]/16.1)*32,tileSets[z].tileWidth, tileSets[z].tileHeight, ((gidpair[0]%100)*32), (Math.floor(gidpair[0]/100)*32), 32, 32);
                    }
                    
                }
            }
    }
}

//stats, collisions(?), everything else
function updateData()
{	 
    if(game.tileSets!=null)
    {
        checkCollisions();
    }
}

function getTileSet(gid, tileset) 
{
        var zerogid = xmlinfoz[0].firstGid;
        var onegid = xmlinfoz[1].firstGid;
        //console.log(gid);
        if(gid<onegid)
        {
            console.log(zerogid);
            tileset.src = xmlinfoz[0].tileImagePath;	
        }
        else if(gid>onegid)
        {	
            console.log(onegid);	
            tileset.src = xmlinfoz[1].tileImagePath;
        }
        
        return tileset;
}

function rectangle()
{
        this.right = null;
        this.left = null;
        this.top = null;
        this.bottom = null;
}

//check for collisions by creating the collision parameters and comparing them to the player location 
function checkCollisions()
{
    if(collisions!='undefined');
        var collisions = new Array();
        var objectLayer = game.tileSets[0].collisionList;
        //console.log("in here");
        //console.log(objectLayer);
        //var rect = new rectangle();
        for(var i = 0; i<objectLayer.length;i++)
        {
                if(objectLayer[i].name == "Collision")
                {
                        var rect = new rectangle();
                        rect.left = objectLayer[i].x;
                        rect.top = objectLayer[i].y;
                        rect.right = parseInt(objectLayer[i].x) + parseInt(objectLayer[i].width);
                        rect.bottom = parseInt(objectLayer[i].y) + parseInt(objectLayer[i].height);
                        collisions.push(rect);
                }
        }
        for(i = 0; i<collisions.length; i++)
        {
            if(intersects(game.character.getRect(), collisions[i])=="up")
            {
                    game.character.sety(game.character.gety()-game.character.getSpeed());
            }
            if(intersects(game.character.getRect(), collisions[i])=="down")
            {
                game.character.sety(game.character.gety()+game.character.getSpeed());
            }
            if(intersects(game.character.getRect(), collisions[i])=="left")
            {
                game.character.setx(game.character.getx()-game.character.getSpeed());
            }
            if(intersects(game.character.getRect(), collisions[i])=="right")
            {
                game.character.setx(game.character.getx()+game.character.getSpeed());
            }
        }
}


function intersects(player, object2)
{
        if(player.left<object2.left && player.right>object2.left &&  player.top<object2.bottom && player.bottom>object2.top)
        {
                return "left";
        }
        if(player.right>object2.right && player.left<object2.right && player.top<object2.bottom && player.bottom>object2.top)
        {
                return "right"
        }
		if(player.bottom>object2.bottom && player.top<object2.bottom && player.right>object2.left && player.left < object2.right)
		{
			return "down";
		}
        if(player.top<object2.top && player.bottom>object2.top && player.right>object2.left && player.left < object2.right)
        {
            return "up";
        }
}

function runningAnimation()
{

        /*
        // <-----------------------Right Jump------------------------->
        if (this.jump == true && this.right == true && this.isPunching == false)
        {
            if (num > 4)
            {
                num = 1;
            }
            Width = 110;
            context2.drawImage(15 + (60 * (num - 1)), -4 + (5 * 60), 60, 70, 100, 100);
        } // <--------------------------Left Jump----------------------->
        else
        {
            if (this.jump == true && right == false && isPunching == false)
            {
                if (num > 4)
                {
                    num = 1;
                }
                spriteMovement = charSpriteLeft.getSubimage(1034 - (15 + (60 * (num))), -4 + (5 * 60), 60, 70);
                Width = 110;
                return spriteMovement;
            }
        }
        */
        // Running Right--------------------------->
        // 
        if (this.running == true && this.jump == false && this.isPunching == false && this.right == true)
        {
                    //context2.drawImage(15 + (60 * (num - 1)), -4 + (5 * 60), 60, 70);
                    
            //var Width = 90;
        } /*
        // <-------------------------------Running Left
        else
        {
            if (this.running == true && this.jump == false && this.isPunching == false && this.right == false)
            {
                spriteMovement = charSpriteLeft.getSubimage(1034 - (21 + ((8 + num) * 45)), -30 + (4 * 60), 46, 70);
                Width = 90;
                return spriteMovement;
            } 
            // Stationary 
            //Right
            else
            {
                if (this.running == false && this.jump == false && this.isPunching == false && right == true)
                {
                    spriteMovement = charSpriteRight.getSubimage(349, -30 + (4 * 60), 46, 70);
                    Width = 90;
                    return spriteMovement;
                }
                //Stationary
                // Left
                else
                {
                    if (this.running == false && this.jump == false && this.isPunching == false && right == false)
                    {
                        spriteMovement = charSpriteLeft.getSubimage(1034 - 390, -30 + (4 * 60), 46, 70);
                        Width = 90;
                        return spriteMovement;
                    } // Right
                    // Punch---------------------->
                    else
                    {
                        if (this.isPunching == true && this.right == true && this.jump == false)
                        {
                            spriteMovement = charSpriteRight.getSubimage(286 + (55 * (num - 1)), -4 + (5 * 60), 55, 70);
                            Width = 110;
                            return spriteMovement;
                        } // <-------------------------Left
                        // 									Punch
                        else
                        {
                            if (this.isPunching == true && this.right == false && this.jump == false)
                            {
                                spriteMovement = charSpriteLeft.getSubimage(1034 - (286 + (55 * num - 1)), -4 + (5 * 60), 55, 70);
                                Width = 110;
                                return spriteMovement;
                            }
                        }
                    }
                }
            }
        }*/
        return null;
}

//will animate each object individually
function animate(actor)
{			
    //move the character
    if (keys.up == true)
    {
        actor.sety(actor.gety() - actor.getSpeed());
    }
    if(keys.right== true)
    {
        actor.setx(actor.getx()+ actor.getSpeed());
    }
    if(keys.left== true)
    {
        actor.setx(actor.getx()- actor.getSpeed());
    }
    if (keys.down== true) 
    {
        actor.sety(actor.gety() + actor.getSpeed());
    }

    //on key down
    window.onkeydown = function(e)
    {
        var key = e.keyCode ? e.keyCode : e.which;
        e.preventDefault();
        if (key == 87)
        {
            keys.up = true;
        }
        else if(key == 68)
        {
            keys.right = true;
        }
        else if(key ==65)
        {
            keys.left = true;
        }
        else if (key == 83) 
        {
            keys.down = true;
        }
    }
    
    //on key up
    window.onkeyup = function(e)
    {
        var key = e.keyCode ? e.keyCode : e.which;
        e.preventDefault();

        if (key == 87)
        {
            keys.up = false;
        }
        else if(key == 68)
        {
            keys.right = false;
        }
        else if(key == 65)
        {
            keys.left = false;
        }
        else if (key == 83) 
        {
            keys.down = false;
        }
    }
    

    
    actor.refreshRect();
	
	//console.log(game.canvas.width);
	if(actor.x == 4*32 && actor.y == 3*32)
	{
			//console.log("yo");
			moveChar(23, 88);
			moveMap(0, 81);
	}
	
    //console.log(actor.getRect());
    
    //var thing = actor.getRect();
    //console.log(thing);
    /*
    context2.beginPath();
    context2.lineWidth="1";
    context2.strokeStyle="green"; // Green path
    context2.moveTo(thing.left, thing.top);
    context2.lineTo(thing.right,thing.top);
    context2.lineTo(thing.right, thing.bottom);
    context2.lineTo(thing.left, thing.bottom);
    context2.lineTo(thing.left, thing.top);
    //context2.lineTo(thing.right,thing.bottom);
*/
    if(actor.isLoaded == false)
    {
        actor.load();
    }
    if(actor.isLoaded == true)
    {
        game.context2.clearRect(actor.getx()-16, actor.gety()-16, 64, 64);
        game.context2.drawImage(actor.getCharSpriteLeft(),  24, 5, 17, 28, actor.getx(), actor.gety(), 32, 32);
    }	
}



//takes array of objects to animate (may change to a linked list of objects so that i can put
//multiple different types of objects in at the same time without caring about the order of the objects)
function animateActors(actors)
{
    for(var i = 0; i<actors.length; i++);
    {
            animate(actors[i]);
    }
}

function Animation()
{
}


//create the object for a character 
function Character(name, x , y, speed)
{		
        this.name = name;
        this.charClass;
        this.charStr;
        this.charAgi;
        this.charDex;
        this.charLuk;
        this.charInt;
        this.charVit;
        this.charLevel;
        this.x = x;
        this.y = y;
        this.Width;
        this.Height;
        this.num;
        this.charSpriteIconRight= "resources/lockeSpriteSheetInverse.png";
        this.charSpriteIconLeft = "resources/lockeSpriteSheet.png";
        this.rate = 15;
        this.yColumn;
        this.frameNumber;
        this.charSpriteRight;
        this.charSpriteLeft;
        this.xRow;
        this.isLoaded = false;
        this.rect = new rectangle();
        this.animations = [];
        var speed = speed;
    
    
    this.load = function()
    {
        var that = this;
        var counter1 = 0;
        var counter2=0;
        this.charSpriteRight = null;
        this.charSpriteLeft = null;
        this.charSpriteRight = new Image();
        this.charSpriteRight.src = this.charSpriteIconRight;
        this.charSpriteLeft = new Image();
        this.charSpriteLeft.src =	this.charSpriteIconLeft;
        
        if(this.charSpriteRight.complete && this.charSpriteLeft.complete)
        {
            console.log("loaded both sprites");	
            this.isLoaded = true;
        }
        else if(this.isLoaded == false)
        {
            this.charSpriteLeft.onload = function()
            {
                that.charSpriteRight.onload = function()
                {
                        console.log("loaded both sprites");
                        that.isLoaded = true;
                }
            }
        }
        
    }

    
    this.refreshRect = function()
    {
        this.rect.top = this.y;
        this.rect.left = this.x;
        this.rect.bottom = this.y+32;
        this.rect.right = this.x+32;			
    }
    
    this.getx = function()
    {
        return this.x;
    }
    this.gety = function()
    {
        return this.y;
    }
    this.setx = function(x)
    {
        this.x = x;
    }
    this.sety = function(y)
    {
        this.y = y;
    }
    this.getRect = function()
    {
            return this.rect;
    }
    this.getCharSpriteLeft = function()
    {
            return this.charSpriteLeft;
    }
    this.getSpeed = function()
    {
            return speed;
    }
}




function xmlParse(filename, callback)
{
        var xmlhttp = false;
        var parser = new DOMParser();
        var xmlString;
        
        if(window.XMLHttpRequest)
        {
                xmlhttp = new XMLHttpRequest();
        }
        else
        {
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        if(xmlhttp)
        {
            xmlhttp.open("GET", filename, "true");
            
            xmlhttp.onreadystatechange = function()
            {
                if(xmlhttp.readyState == 4)
                {
                    xmlhttp.overrideMimeType('text/xml');
                    xmlString  = xmlhttp.responseText;
                    var xmlDoc = parser.parseFromString(xmlString, "application/xml");
                    Parse(xmlDoc);
                }
            };
            xmlhttp.send(null);
            
        }

        function Parse(xmlDoc)
        {
                var tileSets = [];
                for(var i = 0; i<xmlDoc.getElementsByTagName("tileset").length; i++)
                {
                        tileSets[i] = new TileSet();
                        tileSets[i].mapWidth = xmlDoc.getElementsByTagName("map")[0].attributes[3].nodeValue;
                        tileSets[i].mapHeight = xmlDoc.getElementsByTagName("map")[0].attributes[4].nodeValue;
                        tileSets[i].tileHeight = xmlDoc.getElementsByTagName("tileset")[i].attributes[2].nodeValue;
                        tileSets[i].tileWidth = xmlDoc.getElementsByTagName("tileset")[i].attributes[3].nodeValue;
                        tileSets[i].firstGid =	xmlDoc.getElementsByTagName("tileset")[i].attributes[0].nodeValue;
                        tileSets[i].tilesetName = xmlDoc.getElementsByTagName("tileset")[i].attributes[1].nodeValue;
                        tileSets[i].imageWidth = xmlDoc.getElementsByTagName("image")[i].attributes[1].nodeValue;
                        tileSets[i].tileImagePath = xmlDoc.getElementsByTagName("image")[i].attributes[0].nodeValue;
                        tileSets[i].imageHeight = xmlDoc.getElementsByTagName("image")[i].attributes[2].nodeValue;

                }
                
                
                var tileSets = initTileSet(tileSets, xmlDoc);
                
                callback(tileSets);
        }
}

function TileSet()
{
    this.spriteSheet = null;
    this.mapWidth = null;
    this.firstGid = null;
    this.tilesetName = null;
    this.tileWidth = null;
    this.tileHeight = null;
    this.tileImagePath = null;
    this.imageWidth = null;
    this.imageHeight = null;
    this.isLoaded = false; 
    this.image = null;
    this.that = this;
    this.gidList = [],
    this.collisionList = [],
	this.animatedTiles = [];
	this.tileLocations = [];
	var that = this;
	
    this.newLocation = function(id, x, y)
	{
		var id = id;
		var x = x;
		var y = y;
		var flag = false;
		//console.log(this.tileLocations[0]);
		for(var i = 0; i<this.tileLocations.length; i++)
		{
			//console.log(this.tileLocations.length);
			if(this.tileLocations[i].id == id)
			{
				//console.log("true");
				var flag = true;
				this.tileLocations[i].tileXY.push(new tileLocation(x, y));
			}
		}
		if(flag == false)
		{
			this.tileLocations.push(new tileID(id, x, y));
		}
		function tileID(id, x, y)
		{
			this.id = id;
			this.tileXY = [];
			this.tileXY.push(new tileLocation(x, y));
		}
		function tileLocation(x, y)
		{
			this.x = x;
			this.y = y;
		}
	}
    this.init = function(path)
    {
        this.load();
    }
    this.load = function()
    {
        var that = this;
        this.image = new Image();
        this.image.src = this.tileImagePath;
        if(this.isLoaded == false)
        {
            //console.log(this.timeImagePath);
            if(this.image.complete == true)
            {
                console.log("finished loading sprite sheet");
                this.isLoaded = true;
            }
            else this.image.onload = function()
            {
                console.log("finished loading sprite sheet");
                that.isLoaded = true;
            }
        }
    }
};

function initTileSet(tileSets, xmlDoc)
{
        
    function getTag(tagname)
    {
        return xmlDoc.getElementsByTagName(tagname);
    }
    
    //create tileMaps and place in gidList
    for(var z = 0; z<tileSets.length; z++)
    {
        for(var i = 0; i<xmlDoc.getElementsByTagName("layer").length; i++)
        {
                tileSets[z].gidList[i] = new Map();
                var tile = 0;
                for(var j = 1; j<xmlDoc.getElementsByTagName("layer")[i].childNodes[1].childNodes.length;j+=2)
                {
                    if(xmlDoc.getElementsByTagName("layer")[i].childNodes[1].childNodes[j].attributes[0].nodeValue!=0)
                    {
                        tileSets[z].gidList[i].set(tile, (xmlDoc.getElementsByTagName("layer")[i].childNodes[1].childNodes[j].attributes[0].nodeValue));
                    }
                    tile++;					
                }
        }
    }	
    //create object map to handle objects 
        function TileObject()
        {
                this.name = null;
                this.id = null;
                this.x = null;
                this.y = null;
                this.width =  null;
                this.height = null;
        }
        var tileObjects = new Array();
        for(i = 0; i<xmlDoc.getElementsByTagName("objectgroup").length; i++)
        {
                for(j=1; j<xmlDoc.getElementsByTagName("objectgroup")[i].childNodes.length; j+=2)
                {
                        var tileObject = new TileObject();
                        for(var z=0; z<xmlDoc.getElementsByTagName("objectgroup")[i].childNodes[j].attributes.length;z++)
                        {
                                var attribute = xmlDoc.getElementsByTagName("objectgroup")[i].childNodes[j].attributes[z].nodeValue;
                                tileObject.name = xmlDoc.getElementsByTagName("objectgroup")[i].attributes[0].nodeValue;
                                if(z==0)
                                {
                                        tileObject.id = attribute;
                                }
                                else if(z==1)
                                {
                                        tileObject.x = attribute;
                                }
                                else if(z==2)
                                {
                                        tileObject.y = attribute;
                                }
                                else if(z==3)
                                {
                                        tileObject.width = attribute;
                                }
                                else if(z==4)
                                {
                                        tileObject.height = attribute;
                                }	
                        }	
                        tileSets[0].collisionList.push(tileObject);
                }
        }
		
	tileSets[0].animatedTiles
    for(i = 0; i<getTag("tileset").length; i++)
    {
        for(j = 3; j<getTag("tileset")[i].childNodes.length; j+=2)
        {
			for(z = 1; z<getTag("tileset")[i].childNodes[j].childNodes.length;z+=2)
			{
				var animatedTile = new AnimatedTile();
				animatedTile.id = parseInt(getTag("tileset")[i].childNodes[j].id);
				for(var h=1; h<getTag("tileset")[i].childNodes[j].childNodes[z].childNodes.length; h+=2)
				{
					animatedTile.attributes.push(getTag("tileset")[i].childNodes[j].childNodes[z].childNodes[h].attributes);
				}
				tileSets[0].animatedTiles.push(animatedTile);
			}
        }
    }
	
    
        //mapProperties.push(tileMap);
        //mapProperties.push(tileObjects);
        return tileSets;
}

function AnimatedTile() 
{
	this.id = null; 
	this.attributes = [];
};


function  twoArray(x, y, amount)
{
    var iMax = x;
    var jMax = y;
    var amount = amount;
    var f = new Array();
    if(amount != null)
    {
        for(var z = 0; z<amount; z++)
        {
            f[z] = new Array();
            for (var i=0;i<iMax;i++) 
            {
                f[z][i]=new Array();
                for (var j=0;j<jMax;j++) 
                {
                    f[z][i][j] = 0;
                }
            }
        }
    }
    else if(amount == null)
    {
        for (i=0;i<iMax;i++) 
        {
            f[i]=new Array();
            for (j=0;j<jMax;j++) 
            {
                f[i][j] = 0;
            }
        }
    }

    return f;
}


  