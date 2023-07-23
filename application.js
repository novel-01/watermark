const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

// Define the input and output video files
const input = "./source/whatta.mp4";
const output = "./output.mp4";

// Define the watermark image file and its position
const watermark = "./source/pokemon.png";
const size = "100:100";
const position = "10:10";

// Create a fluent-ffmpeg command with the input video
const command = ffmpeg(input)
  // Add the watermark image as an input
  .input(watermark)
  // Apply the overlay filter with the position option
  .complexFilter(`[1]scale=${size}[wm];[0][wm]overlay=${position}`)
  // Set the output format to mp4
  .format("mp4")
  // Save the output video to a file
  .save(output)
  // Handle the progress event
  .on("progress", (progress) => {
    console.log(`Processing: ${progress.percent}% done`);
  })
  // Handle the error event
  .on("error", (err) => {
    console.error(`An error occurred: ${err.message}`);
  })
  // Handle the end event
  .on("end", () => {
    console.log(`Watermarked video saved to ${output}`);
  });
