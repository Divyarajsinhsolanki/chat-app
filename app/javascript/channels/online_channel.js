import consumer from "channels/consumer"

consumer.subscriptions.create("OnlineChannel", {
  connected() {
    console.log("connected")

  },

  disconnected() {
    console.log("disconnected")
  },

  received(data) {
    console.log(data)
    document.getElementById(data.id).innerHTML = data.status
    if (data.status == "online"){
      document.getElementById(data.id).style.color = "green"
      document.getElementById("join-button").style.display = "inline";
    } else {
      document.getElementById("join-button").style.display = "none";
      document.getElementById(data.id).style.color = "red"
    }

    let online = document.querySelector("#online-users")
    
    let el = online.querySelector(`[data-id='${data.id}']`)

    if (data.status == "online" && el == null) {
      online.insertAdjacentHTML('beforeend', data.html)
      console.log(data.id)
      document.getElementById(data.id).innerHTML = "online"
    } else if (data.status == "offline" && el != null) {
      el.remove()
    }
  }
});