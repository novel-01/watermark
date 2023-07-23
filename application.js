const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const input = "./source/whatta.mp4";
const output = "./output.mp4";

const watermark = "./source/pokemon.png";
const size = "100:100";
const position = "10:10";

const command = ffmpeg(input)
  .input(watermark)
  
  .complexFilter(`[1]scale=${size}[wm];[0][wm]overlay=${position}`)
  
  .format("mp4")
  
  .save(output)
  
  .on("progress", (progress) => {
    console.log(`Processing: ${progress.percent}% done`);
  })
  
  .on("error", (err) => {
    console.error(`An error occurred: ${err.message}`);
  })
  
  .on("end", () => {
    console.log(`Watermarked video saved to ${output}`);
  });
