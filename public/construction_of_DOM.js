const workWithDOM = (function () {
  const count = 10;
  let last = 0;
  const filterConfig = {};
  let user;

  function loadMorePhoto() {
    const perent = document.getElementById("perentid");
    const morePhoto = document.getElementById("morePhoto");
    perent.removeChild(morePhoto);
    events.getPosts(last, count, filterConfig).then(
      (result) => {
        creatingPost(JSON.parse(result, (key, value) => {
          if (key == "createdAt") return new Date(value);
          return value;
        }));
      },
      (error) => {
        throw new Error("some description of :( ");
      },
    );
  }

  function setLast(l) {
    last = l;
  }

  function getLast() {
    return last;
  }

  function creatingPost(arr_photo) {
    if (!(arr_photo instanceof Array)) return;
    const perent = document.getElementById("perentid");

    events.CheckUser().then(
      (result) => {
        if (arr_photo.length != 0) {
          for (let i = 0; i < arr_photo.length; i++) {
            if (camRollFunction.validatePhotoPost(arr_photo[i])) {
              const div_post = document.createElement("div");
              div_post.className = "post";
              div_post.id = arr_photo[i].id;

              if (result === arr_photo[i].author) {
                const div_delete_photo = document.createElement("div");
                div_delete_photo.className = "delete_photo";

                const div_processing = document.createElement("div");
                div_processing.className = "processing";

                div_post.appendChild(div_delete_photo);
                div_post.appendChild(div_processing);

                div_delete_photo.onclick = function () {
                  removephotoDOM.removePhoto();
                };
                div_processing.onclick = function () {
                  editPhotoPostDOM.edit();
                };
              }

              const div_user = document.createElement("div");
              div_user.innerHTML = arr_photo[i].author;

              const div_post_1 = document.createElement("div");
              div_post_1.className = "post_1";

              const div_photo = document.createElement("div");
              div_photo.className = "photo";
              div_photo.style.backgroundImage = `url(${arr_photo[i].photoLink})`;

              const div_upload_date = document.createElement("div");
              div_upload_date.className = "upload_date";
              div_upload_date.innerHTML = arr_photo[i].createdAt.toLocaleDateString();

              const div_like = document.createElement("div");
                if (arr_photo[i].like.indexOf(result) != -1) {
                  div_like.className = "like_yes";
                } else {
                  div_like.className = "like_no";
                }
                div_like.onclick = function () {
                  smile.like();
                };
              const div_tegs = document.createElement("div");
              div_tegs.className = "tegs";
              let str = "";
              if (arr_photo[i].tag.length > 0) {
                for (let j = 0; j < arr_photo[i].tag.length; j++) {
                  str += `#${arr_photo[i].tag[j]} `;
                }
                div_tegs.innerHTML = str;
              }

              const div_description = document.createElement("div");
              div_description.innerHTML = arr_photo[i].descriprion;
              div_description.className = "description";

              div_post.appendChild(div_user);
              div_post.appendChild(div_post_1);
              div_post_1.appendChild(div_photo);
              div_post_1.appendChild(div_upload_date);
              div_post_1.appendChild(div_like);
              div_post_1.appendChild(div_tegs);
              div_post_1.appendChild(div_description);

              perent.appendChild(div_post);
            }
          }
          const div_more_photo = document.createElement("div");
          div_more_photo.innerHTML = "more photo";
          div_more_photo.className = "more_photo";
          div_more_photo.onclick = function () {
            loadMorePhoto();
          };
          div_more_photo.id = "morePhoto";
          perent.appendChild(div_more_photo);
          setLast(getLast() + arr_photo.length);
        }
      },
      (error) => {
        if (arr_photo.length != 0) {
          for (let i = 0; i < arr_photo.length; i++) {
            if (camRollFunction.validatePhotoPost(arr_photo[i])) {
              const div_post = document.createElement("div");
              div_post.className = "post";
              div_post.id = arr_photo[i].id;

              const div_user = document.createElement("div");
              div_user.innerHTML = arr_photo[i].author;

              const div_post_1 = document.createElement("div");
              div_post_1.className = "post_1";

              const div_photo = document.createElement("div");
              div_photo.className = "photo";
              div_photo.style.backgroundImage = `url(${arr_photo[i].photoLink})`;

              const div_upload_date = document.createElement("div");
              div_upload_date.className = "upload_date";
              div_upload_date.innerHTML = arr_photo[i].createdAt.toLocaleDateString();

              const div_like = document.createElement("div");
                  div_like.className = "like_no";
                div_like.onclick = function () {
                  smile.like();
                };
              const div_tegs = document.createElement("div");
              div_tegs.className = "tegs";
              let str = "";
              if (arr_photo[i].tag.length > 0) {
                for (let j = 0; j < arr_photo[i].tag.length; j++) {
                  str += `#${arr_photo[i].tag[j]} `;
                }
                div_tegs.innerHTML = str;
              }

              const div_description = document.createElement("div");
              div_description.innerHTML = arr_photo[i].descriprion;
              div_description.className = "description";

              div_post.appendChild(div_user);
              div_post.appendChild(div_post_1);
              div_post_1.appendChild(div_photo);
              div_post_1.appendChild(div_upload_date);
              div_post_1.appendChild(div_like);
              div_post_1.appendChild(div_tegs);
              div_post_1.appendChild(div_description);

              perent.appendChild(div_post);
            }
          }
          const div_more_photo = document.createElement("div");
          div_more_photo.innerHTML = "more photo";
          div_more_photo.className = "more_photo";
          div_more_photo.onclick = function () {
            loadMorePhoto();
          };
          div_more_photo.id = "morePhoto";
          perent.appendChild(div_more_photo);
          setLast(getLast() + arr_photo.length);
        }
      },
    );
  }

  function filterSelected() {
    const perent = document.getElementById("perentid");
    while (perent.firstChild) {
      perent.removeChild(perent.firstChild);
    }
    last = 0;

    if (document.getElementById("checkbox_name").checked) {
      this.filterConfig.author = document.getElementById("input_name").value;
    } else delete this.filterConfig.author;

    if (document.getElementById("checkbox_date").checked) {
      const e = document.getElementById("select_date");
      this.filterConfig.createdAt = e.options[e.selectedIndex].text;
    } else delete this.filterConfig.createdAt;

    if (document.getElementById("checkbox_tag").checked) {
      const str = document.getElementById("input_tag").value.split(" ");
      this.filterConfig.tag = str;
    } else delete this.filterConfig.tag;

    events.getPosts(0, 10, filterConfig).then(
      (result) => {
        creatingPost(JSON.parse(result, (key, value) => {
          if (key == "createdAt") return new Date(value);
          return value;
        }));
      },
      (error) => {
        throw new Error("some description of :( ");
      },
    );
  }

  function createheader() {
    events.CheckUser().then(
      (result) => {
        const header = document.getElementById("idheader");
        const div_account = document.createElement("div");
        const div_add_photo = document.createElement("div");
        const div_sign_in = document.createElement("div");

        div_add_photo.className = "add_photo";
        div_account.className = "account";
        div_sign_in.className = "sign_in";

        div_account.innerHTML = result;
        div_add_photo.innerHTML = "Add Photo";
        div_sign_in.innerHTML = "Exit";

        div_add_photo.onclick = function () {
          addphotoDOM.addPhotoPost();
        };
        div_sign_in.onclick = function () {
          messageYesOrNo("Exit?", exitfunction);
        };

        header.appendChild(div_account);
        header.appendChild(div_add_photo);
        header.appendChild(div_sign_in);
      },
      (error) => {
        const header = document.getElementById("idheader");
        const div_sign_in = document.createElement("div");
        div_sign_in.className = "sign_in";
        div_sign_in.innerHTML = "Sign in";
        div_sign_in.onclick = function () {
          SignIn();
        };
        header.appendChild(div_sign_in);
      },
    );
  }

  function SignIn() {
    bloсk();
    const acc = {};
    const div_sign_in = document.createElement("div");
    div_sign_in.className = "window_sign_in";
    div_sign_in.innerHTML = "CamRoll";
    const button_signIn = document.createElement("button");
    const button_cancel = document.createElement("button");
    button_signIn.className = "button_signIn";
    button_cancel.className = "button_cancel2";
    button_signIn.innerHTML = "Sign in";
    button_cancel.innerHTML = "Cancel";

    const p = document.createElement("p");
    p.innerHTML = "Your Login";
    div_sign_in.appendChild(p);
    const input_login = document.createElement("input");
    input_login.type = "text";
    input_login.className = "input_signin";
    p.appendChild(input_login);

    const p1 = document.createElement("p");
    p1.innerHTML = "Password";
    div_sign_in.appendChild(p1);
    const input_password = document.createElement("input");
    input_password.type = "text";
    input_password.className = "input_signin";
    p1.appendChild(input_password);

    button_signIn.onclick = function () {
      acc.login = input_login.value;
      acc.password = input_password.value;
      events.logIn(acc.login, acc.password).then(
        (result) => {
          user = result;
          cleanHeader();
          createheader();
          cleanTape();

          events.getPosts(0, 10, filterConfig).then(
            (result) => {
              creatingPost(JSON.parse(result, (key, value) => {
                if (key == "createdAt") return new Date(value);
                return value;
              }));
            },
            (error) => {
              throw new Error("some description of :( ");
            },
          );
        },
        (error) => {
          throw new Error("some description of :( ");
          mistake.messageMistake("wrong password or login");
        },
      );

      document.body.removeChild(div_sign_in);
      cleanBlock();
    };
    button_cancel.onclick = function () {
      document.body.removeChild(div_sign_in);
      cleanBlock();
    };

    div_sign_in.appendChild(button_signIn);
    div_sign_in.appendChild(button_cancel);
    document.body.appendChild(div_sign_in);
  }

  function bloсk() {
    const div = document.createElement("div");
    div.id = "block";
    div.className = "overlay";
    document.body.appendChild(div);
  }

  function cleanBlock() {
    const div = document.getElementById("block");
    document.body.removeChild(div);
  }

  function exitfunction() {
    events.logOut().then(
      (result) => {
        user = null;
        cleanHeader();
        cleanTape();
        createheader();
        events.getPosts(0, 10, filterConfig).then(
          (result) => {
            creatingPost(JSON.parse(result, (key, value) => {
              if (key == "createdAt") return new Date(value);
              return value;
            }));
          },
          (error) => {
            throw new Error("some description of :( ");
          },
        );
      },
      (error) => {
        cleanHeader();
        cleanTape();
        createheader();
        events.getPosts(0, 10, filterConfig).then(
          (result) => {
            creatingPost(JSON.parse(result, (key, value) => {
              if (key == "createdAt") return new Date(value);
              return value;
            }));
          },
          (error) => {
            throw new Error("some description of :( ");
          },
        );
      },
    );
  }

  function cleanTape() {
    const perent = document.getElementById("perentid");
    while (perent.firstChild) {
      perent.removeChild(perent.firstChild);
    }
  }

  function cleanHeader() {
    const perent = document.getElementById("idheader");
    while (perent.firstChild) {
      perent.removeChild(perent.firstChild);
    }
  }

  function messageYesOrNo(str, func) {
    bloсk();
    const div_delete_message = document.createElement("div");
    div_delete_message.className = "delete_message";
    div_delete_message.innerHTML = str;
    const button_yes = document.createElement("button");
    const button_no = document.createElement("button");
    button_yes.className = "button_yes";
    button_no.className = "button_no";
    button_yes.innerHTML = "Yes";
    button_no.innerHTML = "No";
    const elem = window.event.srcElement;
    button_yes.onclick = function () {
      document.body.removeChild(div_delete_message);
      cleanBlock();
      func();
    };
    button_no.onclick = function () {
      document.body.removeChild(div_delete_message);
      cleanBlock();
    };
    div_delete_message.appendChild(button_yes);
    div_delete_message.appendChild(button_no);
    document.body.appendChild(div_delete_message);
  }

  return {
    getLast,
    bloсk,
    createheader,
    loadMorePhoto,
    creatingPost,
    filterSelected,
    cleanBlock,
    last,
    setLast,
    filterConfig,
  };
}());
