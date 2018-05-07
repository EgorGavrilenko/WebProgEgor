let editPhotoPostDOM = (function() {
  function edit() {
    let elem = window.event.srcElement;
    let postid = elem.parentNode.id;
    events.getPost(postid).then(
      result => {
        editPhotoPost(
          JSON.parse(result, function(key, value) {
            if (key == 'createdAt') return new Date(value);
            return value;
          })
        );
      },
      error => {
        throw new Error('some description of :( ');
      }
    );
  }

  function editPhotoPost(post) {
    let perent = document.getElementById('perentid');
    while (perent.firstChild) {
      perent.removeChild(perent.firstChild);
    }
    let div_photo = document.createElement('div');
    div_photo.className = 'photo';
    div_photo.style.backgroundImage = 'url(' + post['photoLink'] + ')';
    perent.appendChild(div_photo);

    let div = document.createElement('div');
    div.style.width = '100%';
    perent.appendChild(div);
    let p = document.createElement('p');
    p.innerHTML = 'descriprion';
    div.appendChild(p);

    let input_descr = document.createElement('input');
    input_descr.type = 'text';
    input_descr.value = post['descriprion'];
    input_descr.className = 'input_for_edit';
    p.appendChild(input_descr);

    let p1 = document.createElement('p');
    p1.innerHTML = 'tags';
    div.appendChild(p1);

    let str = '';
    for (let j = 0; j < post['tag'].length; j++) {
      str += ' #' + post['tag'][j];
    }
    let input_tag = document.createElement('input');
    input_tag.type = 'text';
    input_tag.value = str;
    input_tag.className = 'input_for_edit';
    p1.appendChild(input_tag);

    let button_ok = document.createElement('button');
    let button_cancel = document.createElement('button');
    button_ok.className = 'button_ok';
    button_cancel.className = 'button_cancel';
    button_ok.innerHTML = 'Ok';
    button_cancel.innerHTML = 'Cancel';

    perent.appendChild(button_ok);
    perent.appendChild(button_cancel);
    button_ok.onclick = function() {
      let change = {};
      let str = input_tag.value.split(' #');
      change['tag'] = str;
      let str2 = input_descr.value;
      change['descriprion'] = str2;
      change['id'] = post.id;
      events.editPost(change).catch(err => console.log(err.message));

      let perent = document.getElementById('perentid');
      while (perent.firstChild) {
        perent.removeChild(perent.firstChild);
      }
      events.getPosts(0, 10, workWithDOM.filterConfig).then(
        result => {
          workWithDOM.creatingPost(
            JSON.parse(result, function(key, value) {
              if (key == 'createdAt') return new Date(value);
              return value;
            })
          );
        },
        error => {
          throw new Error('some description of :( ');
        }
      );
    };
    button_cancel.onclick = function() {
      let perent = document.getElementById('perentid');
      while (perent.firstChild) {
        perent.removeChild(perent.firstChild);
      }
      events.getPosts(0, 10, workWithDOM.filterConfig).then(
        result => {
          workWithDOM.creatingPost(
            JSON.parse(result, function(key, value) {
              if (key == 'createdAt') return new Date(value);
              return value;
            })
          );
        },
        error => {
          throw new Error('some description of :( ');
        }
      );
    };
  }
  return {
    edit: edit,
    editPhotoPost: editPhotoPost,
  };
})();
