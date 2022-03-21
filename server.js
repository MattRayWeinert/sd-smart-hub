const express = require("express");
const app = express();
const cors = require("cors");
Stream = require("node-rtsp-stream");

app.use(cors());
app.use(express.json());

app.listen(8080, () => console.log("Server is running"));

app.post("/create", (req, res) => {
  stream = new Stream({
    name: "admin",
    // streamUrl: "rtsp://YOUR_IP:PORT",
    streamUrl: req.body.rtsp_url,
    wsPort: 6789,
    ffmpegOptions: {
      // options ffmpeg flags
      "-f": "mpegts", // output file format.
      "-codec:v": "mpeg1video", // video codec
      "-b:v": "1000k", // video bit rate
      "-stats": "",
      "-r": 25, // frame rate
      "-s": "640x480", // video size
      "-bf": 0,
      // audio
      "-codec:a": "mp2", // audio codec
      "-ar": 44100, // sampling rate (in Hz)(in Hz)
      "-ac": 1, // number of audio channels
      "-b:a": "128k", // audio bit rate
    },
  });
});
