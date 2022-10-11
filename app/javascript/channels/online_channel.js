import consumer from "channels/consumer"

consumer.subscriptions.create("OnlineChannel", {
  connected() {
    console.log("online users")
  },

  disconnected() {
  },

  received(data) {
    console.log(data)

    let online = document.querySelector("#online-users")
    let el = online.querySelector(`[data-id='${data.id}']`)
    
    if (data.status == "online" && el == null) {
      online.insertAdjacentHTML('beforeend', data.html)
      
    } else if (data.status == "offline" && el != null) {
      el.remove()
    }

  }
});