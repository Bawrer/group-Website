// "window" here is signified as a self-invoking parameter. We used this to avoid polluting the global scope of the code. 
//Tried not to use too many lines of code. 
(function setup(window) {
    var document = window.document; //adds documented functioanlity to the window of the game. 
    //Easier access to the variable more 
    //later in the code.//
    Object.prototype.on = function(a, b) { //"on" method here we add event listeners to DOM (Document Object Model) elements
      this.addEventListener(a, b); //"on" method has helped us with callback functions, "callback" is just a function that executes when the event occurs.
      return this; // Usage of method chaining to help with calling multiple objects, with a single line of code. 
    };
    Object.prototype.off = function(a, b) { //"off" method can switch off event listeners to our DOM elemts.
      this.removeEventListener(a, b);
      return this;
    };
    Array.prototype.remove = function(x) {
      let a = []; // Here is an empty array to store the filtered elements that come from the above- function.
      for (let i in this)
        if (i != x) // Check if the current index 'i' is not equal to the value 'x'.
          a.push(this[i]); //pushed to the last part of the array if elements are NOT equal. 
      return a;
    };
    window.can = document.querySelector("canvas"); //Game area. 
    window.ctx = window.can.getContext("2d");
    window.can.width = window.innerWidth;
    window.can.height = window.innerHeight;
    window.randInt = function(a, b) {
      if (a === void 0) return Math.round(Math.random());
      else if (b === void 0) return Math.floor(Math.random() * a);
      else return Math.floor(Math.random() * (b - a + 1) + a);
    };
    window.randFloat = function(a, b) {
      if (a === void 0) return Math.random();
      else if (b === void 0) return Math.random() * a;
      else return Math.random() * (b - a) + a;
    };
    window.rand = function(a, b) {
      return Array.isArray(a) ? a[Math.floor(Math.random() 
* a.length)] : window.randInt(a, b);
    };
  }(window));
  
  (function play(gameover) {
    can.style.cursor = "none";
    var mouse = {
      x: can.width / 2,
      y: -can.height
    };
    var player = {
      x: can.width / 2,
      y: can.height / 2,
      s: 20,
      mx: 0,
      my: 0,
      a: 0,
      d: 1,
      speed: 3,
      speak: false,
      say: function(s) {
        this.message = s;
        if (!this.speak)
          this.speak = true;
      },
      softcore: [ //easy stage.
        "Revolver",
        "Shotgun",
        "Machine Gun",
        "Sniper Rifle"
      ],
      hardcore: [ //difficult stage.
        "Minigun",
        "Mega Shotgun",
        "Laser Gun",
        "Ring of Fire"
      ],
      weapon: "Revolver",
      applyWeaponProperties: function() { // are the stage levels. Guns change when you reacha higher, or more difficult stage.
        switch(this.weapon) {
          case "Revolver": // Easiest stage
            this.magSize = 6;
            this.barrelSize = 1.5;
            this.bulletSize = 1;
            this.girth = 1;
            this.hits = 2;
            this.spray = 1;
            this.reloadTime = 1000;
            this.velocity = 1;
            this.shade = 200;
            this.laser = false;
            this.fire = false;
            break;
          case "Shotgun":
            this.magSize = 9;
            this.barrelSize = 2;
            this.bulletSize = 0.75;
            this.girth = 1.2;
            this.spray = 3;
            this.hits = 1;
            this.reloadTime = 1000;
            this.velocity = 1;
            this.shade = 100;
            this.laser = false;
            this.fire = false;
            break;
          case "Machine Gun": 
            this.magSize = 30;
            this.barrelSize = 2;
            this.bulletSize = 1;
            this.girth = 1.2;
            this.hits = 1;
            this.spray = 1;
            this.reloadTime = 2000;
            this.velocity = 0.75;
            this.shade = 100;
            this.fireRate = 10;
            this.laser = false;
            break;
          case "Sniper Rifle":
            this.magSize = 5;
            this.barrelSize = 2.5;
            this.bulletSize = 1.5;
            this.girth = 1;
            this.spray = 1;
            this.hits = Infinity;
            this.reloadTime = 1000;
            this.velocity = 2;
            this.shade = 50;
            this.laser = false;
            this.fire = false;
            break;
          case "Mega Shotgun":
            this.magSize = 50;
            this.spray = 5;
            this.barrelSize = 2;
            this.bulletSize = 1;
            this.girth = 1.5;
            this.hits = 1;
            this.reloadTime = 500;
            this.velocity = 1.5;
            this.shade = 100;
            this.laser = false;
            this.fire = false;
            break;
          case "Minigun":
            this.magSize = 500;
            this.barrelSize = 2.5;
            this.bulletSize = 2;
            this.girth = 2;
            this.hits = 3;
            this.spray = 1;
            this.fireRate = 5;
            this.reloadTime = 2000;
            this.velocity = 3;
            this.shade = 0;
            this.laser = false;
            break;
          case "Laser Gun":
            this.magSize = Infinity;
            this.barrelSize = 2;
            this.bulletSize = 2;
            this.girth = 1.5;
            this.spray = 1;
            this.fireRate = 20;
            this.hits = Infinity;
            this.velocity = 3;
            this.shade = 0;
            this.laser = true;
            break;
          case "Ring of Fire": // Most difficult stage 
            this.magSize = 74;
            this.spray = 37;
            this.barrelSize = 0;
            this.bulletSize = 2;
            this.reloadTime = 2000;
            this.hits = 2;
            this.shade = 0;
            this.girth = 0;
            this.fireRate = 5;
            this.velocity = 2;
            this.laser = true;
            this.fire = false;
        }
      },
      out: false,
      fire: false,
      showGun: true,
      showMode: true,
      hardcoreMode: 30,
      lives: 3,
      zombiesKilled: 0,
      bullets: [],
      fireRound: function(n) {  // Default value for 'n' is 0 if not provided.
        if (n === void 0) n = 0;
        let a = Math.atan2(mouse.y - this.y, mouse.x - this.x); // Calculate the angle 'a' between the player's position and the mouse cursor.
        if (!this.out) //Check if player is NOT out of bullets. 
          this.bullets.push({// Push a new bullet object into the 'bullet" array, here we get new bullets for new guns.
            x: this.weapon == "Ring of Fire" ? this.x : this.x +  // Calculate the bullet's x-coordinate based on the weapon type.
 Math.cos(a) * 2 * this.s,
            y: this.weapon == "Ring of Fire" ? this.y : this.y +  // Calculate the bullet's y-coordinate based on the weapon type.
Math.sin(a) * 2 * this.s,
            // bullet properties
      hit: false,    // Indicates if the bullet has hit something
      hits: 0,       // Number of hits (initialized to 0)
      px: Math.cos(a + n),  // x-component of bullet direction with optional offset 'n'
      py: Math.sin(a + n)   // y-component of bullet direction with optional offset 'n'
          });
        if (this.showGun && this.bullets.length % this.magSize === 0) {  // Check if the player has a gun to show and if it's time to reload
          this.out = true; // Set 'out' to true, indicating the need to reload
          this.say("Reload!"); // Display a message indicating the need to reload.
        } else this.speak = false;
      }
    };
    player.applyWeaponProperties();
    var zombies = [];
    var Zombie = function() {
      let s = rand(20, 30);
      let a = rand(zombies.length < player.hardcoreMode ? 25 : 50) === 0;
      let sp = rand(zombies.length + 10) === 0;
      let speed = (sp ? 2 : 1) * randFloat(0.5, 1);
      speed += zombies.length / 20;
      let x = a ? rand(-s * rand(2, 10), can.width + s * rand(2, 10)) : 
rand([-s * rand(2, 10), can.width + s * rand(2, 10)]);
      let y = a ? rand([-s * rand(2, 10), can.height + s * rand(2, 10)]) : 
rand(-s * rand(2, 10), can.height + s * rand(2, 10));
      return {
        x: x,
        y: y,
        wx: x,
        wy: y,
        s: s,
        a: 0,
        d: 1,
        special: sp,
        color: [rand(50, 100), rand(100, 150), rand(50)],
        eyeColor: sp ? [255, 255, 255] : rand([
          [rand(200, 255), rand(20), rand(20)],
          [rand(20), rand(200, 255), rand(200, 255)],
          [rand(rand(200, 255)), rand(200, 255), rand(20)]
        ]),
        speed: speed < 2 * player.speed ? speed : player.speed * 1.5
      };
    };
    for (let i = 0; i < 7; i++)
      zombies.push(new Zombie());
    var shadow = {
      apply: function() {
        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = -10;
        ctx.shadowOffsetY = 10;
      },
      reset: function() {
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }
    };
    var Grass = function() {
      return {
        x: rand(can.width),
        y: rand(can.height),
        tx: rand(-3, 3),
        ty: rand(-5, -10),
        c: [0, rand(50, 100), 0]
      };
    };
    var grass = [];
    for (let i = 0; i < 100; i++)
      grass.push(new Grass());
    var frames = 0;
    (function update() {
      ctx.beginPath();
      ctx.clearRect(0, 0, can.width, can.height);
      ctx.shadowColor = "black";
      shadow.reset();
      for (let i in grass) {
        let p = grass[i];
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgb(" + p.c + ")";
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.tx, p.y - p.ty);
        ctx.stroke();
      }
      ctx.strokeStyle = "black";
      if (!gameover) {
      for (let i in player.bullets) {
        p = player.bullets[i];
        if (!p.laser) shadow.apply();
        if (!p.hit) {
          ctx.beginPath();
          if (player.laser) {
            ctx.lineWidth = player.s / 10 * player.bulletSize;
            ctx.strokeStyle = "red";
            ctx.moveTo(p.x - p.px * player.s, p.y - p.py * player.s / 2);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          } else {
            ctx.fillStyle = "black";
            ctx.arc(p.x, p.y, player.s / 10 * player.bulletSize, 0, 2 * Math.PI);
            ctx.fill();
          }
          p.x += p.px * 10 * player.velocity;
          p.y += p.py * 10 * player.velocity;
        }
        shadow.apply();
        for (let x in zombies) {
          let z = zombies[x];
          if (p.x > z.x - z.s &&
             p.x < z.x + z.s &&
             p.y > z.y - z.s &&
             p.y < z.y + z.s &&
             !(z.x + z.s < 0 ||
             z.x - z.s > can.width ||
             z.y + z.s < 0 ||
             z.y - z.s > can.height) &&
             !p.hit) {
            p.hits++;
            if (p.hits == player.hits)
              p.hit = true;
            player.zombiesKilled++;
            if (zombies.length == player.hardcoreMode &&
 player.showMode) {
              player.say("Hardcore Mode Entered!");
              player.mark = frames;
              player.showMode = false;
            }
            zombies[x] = new Zombie();
            if (player.zombiesKilled % 10 === 0) {
              zombies.push(new Zombie());
              if (zombies.length == player.hardcoreMode) {
                player.weapon = rand(player.hardcore);
                player.applyWeaponProperties();
              }
            }
            if (z.special) {
              player.weapon = function() {
                let a = [];
                let w = zombies.length < player.hardcoreMode ?
 player.softcore : player.hardcore;
                for (let n = 0; n < w.length; n++)
                  if (player.weapon != w[n])
                    a.push(w[n]);
                return rand(a);
              }();
              player.applyWeaponProperties();
              player.lives++;
              player.mark = frames;
              setTimeout(function() {
                player.out = false;
                player.bullets = [];
              });
              player.say("You found a " + player.weapon.
toLowerCase() + "!"); // Prompt to tell you when you have found a deadlier gun to use. 
            }
          }
        }
      }
      if (frames == player.mark + 500)
        player.speak = false;
      p = player;
      let a = Math.atan2(mouse.y - p.y, mouse.x - p.x);
      for (let x = -1; x <= 1; x += 2) {
        ctx.beginPath();
        ctx.lineWidth = p.s / 10;
        ctx.strokeStyle = p.weapon == "Ring of Fire" &&
 !p.out ? "red" : "black";
        ctx.fillStyle = "rgb(150, 100, 50)";
        ctx.arc(p.x + p.s * Math.cos(a + x * 30 * Math.PI / 180) 
+ x * p.a * 
Math.cos(a), p.y + p.s * Math.sin(a + x * 30 * Math.PI / 180) 
+ x * p.a * 
Math.sin(a), p.s / 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      }
      if (p.showGun) {
        ctx.beginPath();
        ctx.lineWidth = p.s / 2 * p.girth;
        ctx.strokeStyle = "rgb(" + [p.shade, p.shade, p.shade] + ")";
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + Math.cos(a) * p.barrelSize * p.s, p.y +
 Math.sin(a) * p.barrelSize * p.s);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.lineWidth = p.s / 10;
      ctx.strokeStyle = p.weapon == "Ring of Fire" && !p.out ? "red" : "black";
      ctx.fillStyle = "rgb(150, 100, 50)";
      ctx.arc(p.x, p.y, p.s, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      shadow.reset();
      for (let x = -1; x <= 1; x += 2) {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.arc(p.x + Math.cos(a + x * 35 * Math.PI / 180) * p.s / 2, p.y + 
Math.sin(a + x * 35 * Math.PI / 180) * p.s / 2, p.s / 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(p.x + Math.cos(a + x * 35 * Math.PI / 180) * p.s / 2 + 
Math.cos(a) * p.s / 8, p.y + Math.sin(a + x * 35 * Math.PI / 180) * p.s / 2 + 
Math.sin(a) * p.s / 8, p.s / 8, 0, 2 * Math.PI);
        ctx.fill();
      }
      if (p.speak) {
        ctx.beginPath();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = p.s + "px creepster";
        ctx.fillText(p.message, p.x, p.y - p.s * 2);
      }
      if (p.fire && frames % p.fireRate === 0)
        switch(p.weapon) {
          case "Laser Gun":
            for (let i = -45; i <= 45; i += 45)
              p.fireRound(i / 10);
            break;
          default:
            p.fireRound();
        }
        p.x += p.mx * p.speed;
        p.y += p.my * p.speed;
        p.a += (p.mx === 0 && p.my === 0 ? 0 : 1) * p.speed / 2 * p.d;
        if (p.a < -5) p.d = 1;
        else if (p.a > 5) p.d = -1;
      }
      for (let i in zombies) {
        p = zombies[i];
        if (gameover) {
          a = rand() === 0;
          a = Math.atan2(p.wy - p.y, p.wx - p.x);
        } else a = Math.atan2(player.y - p.y, player.x - p.x);
        ctx.beginPath();
        shadow.apply();
        ctx.lineWidth = p.s / 10;
        ctx.fillStyle = "rgb(" + p.color + ")";
        for (let x = -1; x <= 1; x += 2) {
          ctx.beginPath();
          ctx.arc(p.x + Math.cos(a + x * 30 * Math.PI / 180) * p.s +
 x * p.a *
 Math.cos(a), p.y + Math.sin(a + x * 30 * Math.PI / 180) * p.s +
 x * p.a *
 Math.sin(a), p.s / 3, 0, 2 * Math.PI);
          ctx.fill();
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        shadow.reset();
        for (let x = -1; x <= 1; x += 2) {
          ctx.beginPath();
          ctx.fillStyle = "rgb(" + p.eyeColor + ")";
          ctx.arc(p.x + Math.cos(a + x * 35 * Math.PI / 180) * p.s / 2, p.y + 
Math.sin(a + x * 35 * Math.PI / 180) * p.s / 2, p.s / 4, 0, 2 * Math.PI);
          ctx.fill();
          ctx.stroke();
        }
        p.x += Math.cos(a) * p.speed;
        p.y += Math.sin(a) * p.speed;
        p.a += p.speed / 2 * p.d;
        if (p.a < -5) p.d = 1;
        else if (p.a > 5) p.d = -1;
        if (player.x + player.s > p.x - p.s &&
           player.x - player.s < p.x + p.s &&
           player.y + player.s > p.y - p.s &&
           player.y - player.s < p.y + p.s) {
          player.lives--;
          if (player.lives < 0) {
            if (!gameover) {
              let zom = new Zombie();
              zom.x = player.x;
              zom.y = player.y;
              zom.s = player.s;
              zom.speed = player.speed;
              zom.eyeColor = [255, 255, 255];
              zombies.push(zom);
            }
            gameover = true;
          } else zombies[i] = new Zombie();
        }
      }
      if (gameover) { //Game Over method, to show that the game has ended. 
        can.style.cursor = "default";
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, can.width, can.height);
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.font = "100px creepster";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("YOU DIED, SORRY! " + (player.zombiesKilled < 1 ? "No" :
 player.zombiesKilled.toLocaleString()) + " Zombie" +
 (player.zombiesKilled == 1 ? "" : "s") + 
" Killed", can.width / 2, can.height / 2);
        ctx.font = "50px creepster";
        ctx.fillText("PRESS ENTER TO RESTART", can.width / 
2, 0.75 * can.height);
      } else {
        //This block of code executes when the condition (player is not reloading) is false.
  // It is responsible for rendering the player's remaining lives as red circles.
         // Loop through the player's remaining lives
        for (let i = 0; i < player.lives; i++) {
          // Begin a new path for drawing on the canvas
          ctx.beginPath();
          // Set the line width for the circle's border
          ctx.lineWidth = 2;
          //Fill colour is red. 
          ctx.fillStyle = "red";
          // Player life indictor (Red circle). 
          ctx.arc(i * 20 + 10, 10, 10, 0, 2 * Math.PI);
          //Circle is filled with a red colour. 
          ctx.fill();
          //Draw the circle's border.
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.font = "20px roboto mono";
        ctx.fillText("Weapon: " + player.weapon, 0, 20);
        ctx.fillText((player.magSize - player.bullets.length) / 
player.spray + "/" + player.magSize /
 player.spray, 0, 40);
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.fillStyle = "red";
        ctx.arc(mouse.x, mouse.y, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      }
      frames++;
      requestAnimationFrame(update);
    }());
    can.on("mousedown", function() {
      switch(player.weapon) {
        case "Machine Gun":
        case "Minigun":
        case "Laser Gun":
        player.fire = true;   
      }
    }).on("mouseup", function() {
      switch(player.weapon) {
        case "Revolver":
        case "Sniper Rifle":
        case "Laser Gun":
          player.fireRound();
          break;
        case "Shotgun":
          for (let i = -1; i <= 1; i++)
            player.fireRound(i / 10);
        break;
        case "Mega Shotgun":
          for (let i = -2; i <= 2; i++)
            player.fireRound(i / 10);
          break;
        case "Ring of Fire":
          for (let i = -90; i <= 90; i += 5)
            player.fireRound(i);
        }
      player.fire = false;
    }).on("mousemove", function(e) {
      mouse.x = e.offsetX;
      mouse.y = e.offsetY;
    });
    var move = function(e) {
      if (gameover)
        switch(e.which || e.keyCode) {
          case 32:
          case 13:
            play(false);
            this.off("keydown", move);
        }
      else switch(e.which || e.keyCode) {
          case 37:
          case 65:
            player.mx = -1;
            break;
          case 39:
          case 68:
            player.mx = 1;
            break;
          case 38:
          case 87:
            player.my = -1;
            break;
          case 40:
          case 83:
            player.my = 1;
        }
    };
    window
    .on("resize", function() {
      // Event listener for the "resize" event of the window
      // Adjust the canvas size to match the new window dimensions
      can.width = this.innerWidth;
      can.height = this.innerHeight;
      
      // Reset the grass objects by creating new instances
      for (let i in grass)
        grass[i] = new Grass();
    })
    .on("keydown", move) // Event listener for keydown events, invoking the 'move' function
    .on("keyup", function(e) {
      // Event listener for keyup events
      // Detect the key code of the released key using 'e.which' or 'e.keyCode'
      switch (e.which || e.keyCode) {
        case 37: // Left arrow key or 'A' key
        case 65:
        case 39: // Right arrow key or 'D' key
        case 68:
          // Reset the horizontal movement when the left or right key is released
          player.mx = 0;
          break;
        case 38: // Up arrow key or 'W' key
        case 87:
        case 40: // Down arrow key or 'S' key
        case 83:
          // Reset the vertical movement when the up or down key is released
          player.my = 0;
          break;
        case 82: // 'R' key
          // Handle the 'R' key press (reload or other functionality)
          if (player.bullets.length > 0) {
              player.showGun = false;
            if (player.speak)
              player.speak = false;
            setTimeout(function() {
              player.out = false;
                player.bullets = [];
              player.showGun = true;
            }, player.reloadTime);
          }
          break;
      }
    });
  }(false));