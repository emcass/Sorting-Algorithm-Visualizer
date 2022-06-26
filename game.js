import * as me from 'https://esm.run/melonjs';

$(document).ready(function () {
    console.log("jQuery is ready");

});

let nums = [];

let a = 0;
let b = 0;


function genArray(size, me) {
    for (let i = 0; i < size; i++) {
        let val = Math.floor(Math.random() * 800);
        nums.push(val);
    }

    a = 0;
    b = 0;
}

me.device.onReady(function () {
    // Initialize the video.
    if (!me.video.init(1200, 800, { parent: "screen", renderer: me.video.CANVAS })) {
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

            let rects = [];

            genArray(me.game.viewport.width / 25);

            // add a gray background layer
            me.game.world.addChild(new me.ColorLayer("background", "#202020"));

            for (let i = 0; i < nums.length; i++) {
                rects.push(new Rect(i, me.game.viewport.height / 2, 25, nums[i], "#F197FB"));
            }

            rects.forEach(rect => {
                me.game.world.addChild(rect);
            });


            let done = false;

            let sorting = false;

            document.getElementById("genArrayBtn").onclick = function () {
                for (let i = 0; i < me.game.viewport.width / 25; i++) {
                    let val = Math.floor(Math.random() * 800);
                    nums.push(val);
                    rects[i].height = val;
                }
            };

            // TYPES
            // 1. Bubble Sort
            // 2. Faster Sort

            let sortType = 1;

            document.getElementById("sortBtn").onclick = function () {
                sortType = 1;
                sorting = !sorting;
            }

            document.getElementById("fastSortBtn").onclick = function () {
                sortType = 2;
                sorting = !sorting;
            }

            // subscribe to the main game loop event
            me.event.on(me.event.GAME_UPDATE, () => {
                if (sorting) {

                    done = false;

                    if (sortType === 1) {



                        if (a < nums.length) {

                            if (b < nums.length) {


                                rects.forEach(rect => {
                                    rect.setColor("#FFFFFF");
                                })

                                rects[a].setColor("#F81414");
                                rects[b].setColor("#2DF814");

                                if (nums[a] < nums[b]) {

                                    var temp = nums[a];
                                    nums[a] = nums[b];
                                    nums[b] = temp;

                                    rects[a].height = nums[a];
                                    rects[b].height = nums[b];

                                    rects[a].update();
                                    rects[b].update();

                                    rects[b].setColor("#EA14F8");
                                }
                                b++;
                            } else {
                                b = 0;
                                a++;
                            }
                            // console.log("I: " + i);
                        } else if (!done) {
                            done = true;
                            sorting = false;

                            a = 0;
                            b = 0;

                            rects.forEach(rect => {
                                rect.setColor("#FFFFFF");
                            })
                        }
                    } else if (sortType === 2) {
                        if (a < nums.length) {

                            if (b < a) {


                                rects.forEach(rect => {
                                    rect.setColor("#FFFFFF");
                                })

                                rects[a].setColor("#F81414");
                                rects[b].setColor("#2DF814");

                                if (nums[a] < nums[b]) {

                                    var temp = nums[a];
                                    nums[a] = nums[b];
                                    nums[b] = temp;

                                    rects[a].height = nums[a];
                                    rects[b].height = nums[b];

                                    rects[a].update();
                                    rects[b].update();

                                    rects[b].setColor("#EA14F8");
                                }
                                b++;
                            } else {
                                b = 0;
                                a++;
                            }
                            // console.log("I: " + i);
                        } else if (!done) {
                            done = true;
                            sorting = false;

                            a = 0;
                            b = 0;

                            rects.forEach(rect => {
                                rect.setColor("#FFFFFF");
                            })
                        }
                    }
                }
            });
        }
    );
});

class Rect extends me.Renderable {

    constructor(x, y, width, height, color) {
        // x, y, width, height
        super(x, y, width, height);

        this.color = color;

        // set the depth of the renderable
        this.z = 100;
    }

    update() {
        return true;
    }

    setColor(color) {
        this.color = color;
    }

    draw(renderer) {
        renderer.setColor(this.color);
        renderer.fillRect(this.pos.x * this.width, this.pos.y, this.width, this.height);
    }
};
