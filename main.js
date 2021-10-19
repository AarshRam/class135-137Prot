video = "";
status = "";
bla1 = [];

function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();

}

function preload() {
    video = createVideo('scean.mp4');
    video.hide();
}

function draw() {
    image(video, 0, 0, 500, 400);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        
        for (i = 0; i < bla1.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
        document.getElementById("number_of_objects").innerHTML = "No. of objects detected are : " + bla1.length;
        fill("#FF0000");
        percent = floor(bla1[i].confidence * 100);
          text(bla1[i].label + " " + percent + "%", bla1[i].x + 15, bla1[i].y + 15);
        noFill();
        stroke("#FF0000");
        rect(bla1[i].x , bla1[i].y , bla1[i].width , bla1[i].height);
    }
}
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        bla1 = results;
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1.3);
    video.volume(1);
}