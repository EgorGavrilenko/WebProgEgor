let addphotoDOM = (function() {
  let filename;
  let img_url;
  function addPhotoPost() {
    let perent = document.getElementById('perentid');
    while (perent.firstChild) {
      perent.removeChild(perent.firstChild);
    }

    let newpost = {};
    div_addPhoto = document.createElement('div');
    div_addPhoto.id = 'photo';
    div_addPhoto.className = 'file-upload';
    let label = document.createElement('label');
    div_addPhoto.appendChild(label);

    let input = document.createElement('input');
    input.type = 'file';
    label.appendChild(input);

    let span = document.createElement('span');
    span.innerHTML = 'Choose file';
    label.appendChild(span);

    perent.appendChild(div_addPhoto);

    let div = document.createElement('div');
    div.style.width = '100%';
    perent.appendChild(div);
    let p = document.createElement('p');
    p.innerHTML = 'descriprion';
    div.appendChild(p);

    let input_descr = document.createElement('input');
    input_descr.type = 'text';
    input_descr.className = 'input_for_edit';
    p.appendChild(input_descr);

    let p1 = document.createElement('p');
    p1.innerHTML = 'tags';
    div.appendChild(p1);

    let input_tag = document.createElement('input');
    input_tag.type = 'text';
    input_tag.className = 'input_for_edit';
    p1.appendChild(input_tag);

    let button_ok = document.createElement('button');
    let button_cancel = document.createElement('button');
    button_ok.className = 'button_ok';
    button_cancel.className = 'button_cancel';
    button_ok.innerHTML = 'Add';
    button_cancel.innerHTML = 'Cancel';

    perent.appendChild(button_ok);
    perent.appendChild(button_cancel);

    input.addEventListener('change', showFile, false);

    button_ok.onclick = function() {
      //if(!camRollFunction.addPhotoPost(newpost))
      //    mistake.messageMistake("error adding");
      if (document.getElementById('photo').className == 'photo') {
        newpost['photoLink'] = filename;
        let str = input_tag.value.split(' #');
        newpost['tag'] = str;
        let str2 = input_descr.value;
        newpost['descriprion'] = str2;
        let user = workWithDOM.getUser();
        if (user != null) newpost['author'] = user;
        events.addPhoto(img_url, newpost);
      }

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

  function showFile(e) {
    let files = e.target.files;
    for (let i = 0, f; (f = files[i]); i++) {
      if (!f.type.match('image.*')) continue;
      filename = f.name;
      img_url = f;
      let fr = new FileReader();
      fr.onload = (function(theFile) {
        return function(e) {
          div_addPhoto = document.getElementById('photo');
          div_addPhoto.className = 'photo';
          div_addPhoto.style.backgroundImage = 'url(' + e.target.result + ')';
          while (div_addPhoto.firstChild) {
            div_addPhoto.removeChild(div_addPhoto.firstChild);
          }
        };
      })(f);
      fr.readAsDataURL(f);
    }
  }

  return {
    addPhotoPost: addPhotoPost,
  };
})();
