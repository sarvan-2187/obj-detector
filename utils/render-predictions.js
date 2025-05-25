import { throttle } from "lodash";

export const renderPredictions = (predictions, ctx) => {
    ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);

    const font = "16px sans-serif"
    ctx.font = font
    ctx.textBaseline = "top"

    predictions.forEach((prediction) =>{
        const [x,y,width,height] = prediction["bbox"];

        const isPerson = prediction.class === "person";

        ctx.strokeStyle = isPerson? "#ff0000" : "#00ffff";
        ctx.lineWidth = 4;
        ctx.strokeRect(x,y,width,height);

        ctx.fillStyle = `rgba(255, 0, 0, ${isPerson ? 0.2 : 0})`;
        ctx.fillRect(x,y,width,height);

        ctx.fillStyle = isPerson? "#ff0000" : "#00ffff";
        const textWidth = ctx.measureText(prediction.class).width;
        const textHeight = parseInt(font,10);
        ctx.fillRect(x,y,textWidth +4, textHeight+4);

        ctx.fillStyle = "#000000";
        ctx.fillText(prediction.class,x,y);

        if(isPerson){
            playAudio();
        }
    });
}

const playAudio = throttle(() => {
    const audio = new Audio("/japan-eas-alarm-277877.mp3");
    audio.play();
},2000);
