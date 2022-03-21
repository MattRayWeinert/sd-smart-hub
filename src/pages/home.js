import { useState, useEffect, useRef } from "react";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import axios from "axios";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";

const Home = () => {
  // Used to simplify useEffect. Used for quick setup. Will change this.
  const [test, setTest] = useState(null);
  const streamData = {
    rtsp_url:
      "rtsp_url': 'rtsp://admin:123456@192.168.1.243:554//h264Preview_01_main",
  };

  var player = null;
  var model = null;

  useEffect(() => {
    // Establish connection to server
    axios.post("http://localhost:8080/create", streamData);

    // Load model and initialize camera
    tf.ready().then(() => {
      model = loadModel();
    });
    player = initializeCamera();

    setTimeout(function () {
      makePrediction(player);
    }, 20000);
  }, [test]);

  const initializeCamera = () => {
    const videoUrl = `ws://localhost:6789/`;
    const player = new JSMpeg.VideoElement(
      document.getElementById("video-canvas"),
      videoUrl,
      {
        autoplay: true,
      }
    );
    return player;
  };

  const loadModel = async () => {
    try {
      model = await cocoSsd.load();
      return model;
    } catch (err) {
      console.log(err);
      console.log("failed to load model");
    }
  };

  const makePrediction = async (player) => {
    if (model) {
      const predictions = await model.detect(player.els.canvas);
      console.log("Predictions:");
      console.log(predictions);
    }
  };

  return (
    <div className="App">
      <div>Player stream RTSP</div>
      <div id="video-canvas" style={{ height: "480px", width: "640px" }}></div>
    </div>
  );
};

export default Home;
