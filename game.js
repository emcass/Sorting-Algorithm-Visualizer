import * as me from 'https://esm.run/melonjs';

    me.device.onReady(function () {
        // Initialize the video.
        if (!me.video.init(1200, 800, {parent : "screen", renderer : me.video.CANVAS})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        me.loader.preload([],

            // on load callback
            function () {

                // change to the default stage
                // Note: force change now since we are adding things straight away
                // outside of a proper stage object
                me.state.change(me.state.DEFAULT, true);

                let nums = [];
                let rects = [];

                for(let i = 0; i < me.game.viewport.width / 25; i++) {
                    let val = Math.floor(Math.random() * 800);
                    nums.push(val);
                }

                // add a gray background layer
                me.game.world.addChild(new me.ColorLayer("background", "#202020"));

                for(let i = 0; i < nums.length; i++) {
                    rects.push(new Rect(i, me.game.viewport.height / 2, 25, nums[i], "#F197FB"));
                }

                rects.forEach(rect => {
                    me.game.world.addChild(rect);
                });

                let i = 0;
                let j = 0;
                
                console.log(nums);

                let done = false;

                // subscribe to the main game loop event
                me.event.on(me.event.GAME_UPDATE, () => {

                    if(i < nums.length) {

                        if(j < nums.length) {
                            

                            rects.forEach(rect => {
                                rect.setColor("#FFFFFF");
                            })

                            rects[i].setColor("#F81414");
                            rects[j].setColor("#2DF814");

                            if(nums[i] < nums[j]) {

                                 console.log("SWAPPPPINGGGGGG")
                                var temp = nums[i];
                                nums[i] = nums[j];
                                nums[j] = temp;

                                rects[i].height = nums[i];
                                rects[j].height = nums[j];
                                
                                rects[i].update();
                                rects[j].update();

                                rects[j].setColor("#EA14F8");
                            }
                            console.log("I: " + i + " J: " + j);
                            j++;
                        } else {
                            j = 0;
                            i++;
                        }
                        // console.log("I: " + i);
                    } else if(!done) {
                        done = true;
                        console.log(nums);
                    }
                });
            }
        );
    });

    function sort(nums) {
        for (let i = 0; i < nums.length; i++) {
            for (let j = 0; j < nums.length; j++) {
                if (nums[i] < nums[j]) {
                    var temp = nums[i];
                    nums[i] = nums[j];
                    nums[j] = temp;
                }
            }
        }
    }

    class Rect extends me.Renderable {
        
        constructor(x, y, width, height, color) {
            // x, y, width, height
            super(x, y, width, height);

            this.color = color;

            // set the depth of the renderable
            this.z = 100;
        }

        update(){
            return true;
        }

        setColor(color){
            this.color = color;
        }

        draw(renderer) {
            renderer.setColor(this.color);
            renderer.fillRect(this.pos.x * this.width, this.pos.y, this.width, this.height);
        }
    };
