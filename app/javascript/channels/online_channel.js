import consumer from "channels/consumer"

consumer.subscriptions.create("OnlineChannel", {
  connected() {
  },

  disconnected() {
  },

  received(data) {
    document.getElementById(data.id).innerHTML = "online"

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