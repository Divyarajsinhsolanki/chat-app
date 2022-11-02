// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
//= require jquery
//= require jquery_ujs

import "@hotwired/turbo-rails"
import "controllers"
import "channels"

import consumer from "./channels/consumer";

const JOIN_ROOM = "JOIN_ROOM";
const EXCHANGE = "EXCHANGE";
const REMOVE_USER = "REMOVE_USER";

// DOM Elements
let caller;
let calluser;
let localVideo;
let remoteVideoContainer;
let pcPeers = {};

window.onload = () => {
  caller = document.getElementById("calleruser").innerHTML;
  calluser = document.getElementById("currentuser").innerHTML;
  localVideo = document.getElementById("localvideo");
  remoteVideoContainer = document.getElementById("remote-video-container");
  console.log("caller " + caller)
  console.log("user " + calluser)
};

const ice = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

document.addEventListener("DOMContentLoaded", () => {
  const joinButton = document.getElementById("join-button");
  const leaveButton = document.getElementById("leave-button");
  joinButton.onclick = handleJoinSession;
  leaveButton.onclick = handleLeaveSession;
});


const handleJoinSession = async () => {

  console.log("join call ---")
  if (navigator.mediaDevices.getUserMedia !== null) {
    var options = { 
      video:true, 
      audio:true 
    };
    navigator.webkitGetUserMedia(options, function(stream) { 
      localvideo.srcObject = stream;
      localstream = stream;
      localvideo.play();
    }, function(e) { 
    }); 
  }

  consumer.subscriptions.create("SessionChannel", {
    connected: () => {
      broadcastData({
        type: JOIN_ROOM,
        from: caller,
        receiver: calluser,
      });
    },
    received: (data) => {
      if (data.from === caller) return;
      switch (data.type) {
        case JOIN_ROOM:
          return joinRoom(data);
        case EXCHANGE:
          if (data.to == data.from) return;
          if (data.to != data.receiver && data.from != data.receiver ) return;
          document.getElementById("join-button").style.display = "none";
          document.getElementById("leave-button").style.display = "inline";
          document.getElementById("onvideo").style.display = "inline";
          document.getElementById("offvideo").style.display = "inline";
          return exchange(data);
        case REMOVE_USER:
          return removeUser(data);
        default:
          return;
      }
    },
  });
};

const joinRoom = (data) => {
  createPC(data.from, data.receiver, true);
};

const createPC = (userId,receiveruser, isOffer) => {
  let pc = new RTCPeerConnection(ice);
  console.log("userId="+userId)
  console.log("caller="+caller)
  const element = document.createElement("video");
  element.id = `remoteVideoContainer+${userId}`;
  element.autoplay = "autoplay";
  remoteVideoContainer.appendChild(element);

  pcPeers[userId] = pc;

  for (const track of localstream.getTracks()) {
    pc.addTrack(track, localstream);
  }

  isOffer &&
  pc
  .createOffer()
  .then((offer) => {
    return pc.setLocalDescription(offer);
  })
  .then(() => {
    broadcastData({
      type: EXCHANGE,
      from: caller,
      to: userId,
      receiver: receiveruser,
      sdp: JSON.stringify(pc.localDescription),
    });
  })
  .catch(logError);

  pc.onicecandidate = (event) => {
    event.candidate &&
      broadcastData({
        type: EXCHANGE,
        from: caller,
        to: userId,
        receiver: receiveruser,
        candidate: JSON.stringify(event.candidate),
      });
    };

    pc.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        element.srcObject = event.streams[0];
      } else {
        let inboundStream = new MediaStream(event.track);
      element.srcObject = inboundStream;
    }
  };
  
  pc.oniceconnectionstatechange = () => {
    if (pc.iceConnectionState == "disconnected") {
      console.log("Disconnected:", userId);
      broadcastData({
        type: REMOVE_USER,
        from: userId,
        receiver: receiveruser,
      });
    }
  };
  return pc;
};

const handleLeaveSession = () => {
  location.reload();
  
  document.getElementById("join-button").style.display = "inline";
  document.getElementById("leave-button").style.display = "none";

  for (let user in pcPeers) {
    pcPeers[user].close();
  }
  pcPeers = {};

  remoteVideoContainer.innerHTML = "";
  
  broadcastData({
    type: REMOVE_USER,
    from: caller,
  });

};

const removeUser = (data) => {
  console.log("removing user", data.from);
  let video = document.getElementById(`remoteVideoContainer+${data.from}`);
  video && video.remove();
  delete pcPeers[data.from];
};

const exchange = (data) => {
  let pc;
  
  if (!pcPeers[data.from]) {
    pc = createPC(data.from, false);
  } else {
    pc = pcPeers[data.from];
  }

  if (data.candidate) {
    pc.addIceCandidate(new RTCIceCandidate(JSON.parse(data.candidate)))
    .then(() => console.log("Ice candidate added"))
    .catch(logError);
  }
  
  if (data.sdp) {
    const sdp = JSON.parse(data.sdp);
    pc.setRemoteDescription(new RTCSessionDescription(sdp))
    .then(() => {
        if (sdp.type === "offer") {
          pc.createAnswer()
          .then((answer) => {
            return pc.setLocalDescription(answer);
          })
          .then(() => {
            broadcastData({
              type: EXCHANGE,
              from: caller,
              to: data.from,
              receiver: calluser,
              sdp: JSON.stringify(pc.localDescription),
            });
          });
        }
      })
      .catch(logError);
  }
};

const broadcastData = (data) => {
  const csrfToken = document.querySelector("[name=csrf-token]").content;
  const headers = new Headers({
      "content-type": "application/json",
      "X-CSRF-TOKEN": csrfToken,
  });

  fetch("start", {
    method: "POST",
    body: JSON.stringify(data),
    headers,
  });
};

const logError = (error) => console.warn("Whoops! Error:", error);
