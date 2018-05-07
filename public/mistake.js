let mistake = (function() {
  function messageMistake(str) {
    workWithDOM.bloсk();
    let div_delete_message = document.createElement('div');
    div_delete_message.className = 'mistake';
    div_delete_message.innerHTML = str;
    let button_yes = document.createElement('button');
    button_yes.className = 'button_yes';
    button_yes.innerHTML = 'Ok';
    let elem = window.event.srcElement;
    button_yes.onclick = function() {
      document.body.removeChild(div_delete_message);
      workWithDOM.cleanBlock();
    };
    div_delete_message.appendChild(button_yes);
    document.body.appendChild(div_delete_message);
  }

  return {
    messageMistake: messageMistake,
  };
})();
