import { Component } from "react";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import Popup from 'reactjs-popup';
import axios from 'axios';

class home extends Component
{
    constructor(props) {
        super(props);
    }
    
    componentDidMount()
    {
        var videoUrl = `ws://localhost:6789/`;
        var stream = { 'rtsp_url': 'rtsp://admin:123456@192.168.1.243:554//h264Preview_01_main'};

        var player = new JSMpeg.VideoElement(document.getElementById("video-canvas"), videoUrl, {
            autoplay: true,
        });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React Hooks POST Request Example' })
        };

        axios.post('http://localhost:8080/create', stream).then(res => console.log(res.config.data));
    }
    
    render()
    {
      return (
        <div className="App">
        <div>Player stream RTSP</div>
        <Popup trigger={<button> Input: </button>} 
          position="right center">
          <form>
            <label> RTSP stream: </label>
            <input type="text" id="lname" name="lname"></input><br></br>
            <input type="submit" value="Submit"></input>
          </form>
        </Popup>
        <div id="video-canvas" style={{ height: "480px", width: "640px" }}></div>
      </div>
      )
    }
}

export default home;