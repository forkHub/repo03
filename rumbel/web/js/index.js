"use strict";
let backEl = document.body.querySelector("div#back").children;
let backElJml = backEl.length;
let backAr = [];
let maxBack = backElJml;
let max = window.document.body.scrollHeight - window.innerHeight;
let ratio = (window.scrollY) / max;
let ratioN = Math.floor(ratio * (maxBack));
let maxBack2 = 7;
let ctr = 0;
function update() {
    updateRatio();
    backAr.forEach((item, idx) => {
        if (idx != ratioN) {
            let o = parseFloat(item.style.opacity);
            if (o > 0) {
                o -= .005;
                item.style.opacity = o + '';
                // console.log("turun");
                // console.log(item);
            }
        }
        else if (idx == ratioN) {
            let o = parseFloat(item.style.opacity);
            if (o < 1) {
                o += .005;
                item.style.opacity = o + '';
                // console.log("naik");
                // console.log(item);
                // console.log(o);
            }
        }
        else {
            throw Error("");
        }
    });
    // ctr++;
    // console.log(wrapper.scrollTop);
    if (ctr < 10) {
        window.requestAnimationFrame(update);
    }
}
function debug(str) {
    document.body.querySelector("div.debug").innerHTML = str;
}
function updateRatio() {
    ratio = (window.scrollY) / max;
    ratioN = Math.floor(ratio * (maxBack));
    if (ratioN >= maxBack)
        ratioN--;
    // console.log("rationN " + ratioN + "/ratio " + ratio + "/max " + max);
}
updateRatio();
for (let i = 0; i < backElJml; i++) {
    let item = backEl.item(i);
    item.classList.add(item.getAttribute("back"));
    backAr.push(item);
    item.style.opacity = '0';
    item.style.left = '0px';
    item.style.top = '0px';
    item.style.right = '0px';
    item.style.bottom = '0px';
    if (i == 0) {
        item.style.opacity = '1';
    }
    console.log(i);
}
// backAr[0].style.opacity = '1';
// console.log(backAr[0]);
// console.log(backAr[0].style.opacity);
// console.log("ratio n " + ratioN);
// console.log(backAr);
function resize() {
    document.body.querySelector("div#back").style.height = window.outerHeight + 'px';
}
window.onscroll = () => {
    console.log('window on scroll');
    updateRatio();
    // update();
    // console.log(ratioN);
    // console.log(wrapper.scrollTop);
    // console.log(window.document.body.scrollHeight - window.innerHeight);
    // console.log(window.scrollY);
};
window.requestAnimationFrame(update);
window.onresize = () => {
    resize();
};
resize();
