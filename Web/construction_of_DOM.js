;
var workWithDOM = function() {

    let count = 10;
    let last=0;
    let filterConfig = {};

    function loadMorePhoto() {
        let perent = document.getElementById("perentid");
        let morePhoto = document.getElementById("morePhoto");
        perent.removeChild(morePhoto);
        creatingPost(last, count, filterConfig);
    }

    function setLast(l) {
        last=l;
    }

    function getLast() {
        return last;
    }

    function creatingPost(skip, top, filterConfig) {

        let user = localStorage.getItem("user");
        let perent = document.getElementById("perentid");
        let arr_photo = camRollFunction.getPhotoPosts(skip, top, filterConfig);

        if (arr_photo.length != 0) {
            for (let i = 0; i < arr_photo.length; i++)
                if (camRollFunction.validatePhotoPost(arr_photo[i])) {
                    let div_post = document.createElement('div');
                    div_post.className = "post";
                    div_post.id = arr_photo[i]['id'];

                    if (user === arr_photo[i]['author']) {
                        let div_delete_photo = document.createElement('div');
                        div_delete_photo.className = "delete_photo";

                        let div_processing = document.createElement('div');
                        div_processing.className = "processing";

                        div_post.appendChild(div_delete_photo);
                        div_post.appendChild(div_processing);

                        div_delete_photo.onclick = function() {
                            removephotoDOM.removePhoto()
                        };
                        div_processing.onclick = function() {
                            editPhotoPostDOM.editPhotoPost();
                        };
                    }

                    let div_user = document.createElement('div');
                    div_user.innerHTML = arr_photo[i]['author'];

                    let div_post_1 = document.createElement('div');
                    div_post_1.className = "post_1";

                    let div_photo = document.createElement('div');
                    div_photo.className = "photo";
                    div_photo.style.backgroundImage = 'url(' + arr_photo[i]['photoLink'] + ')';

                    let div_upload_date = document.createElement('div');
                    div_upload_date.className = "upload_date";
                    div_upload_date.innerHTML = arr_photo[i]['createdAt'].toLocaleDateString();

                    let div_like = document.createElement('div');
                    if (user != null) {
                        if (arr_photo[i]['like'].indexOf(user) != -1) {
                            div_like.className = "like_yes";
                        } else {
                            div_like.className = "like_no";
                        }
                        div_like.onclick = function() {
                            smile.likeFunction();
                        }
                    } 
                    else
                        div_like.className = "like_no";
                    let div_tegs = document.createElement('div');
                    div_tegs.className = "tegs";
                    let str = "";
                    if (arr_photo[i]['tag'].length > 0) {
                        for (let j = 0; j < arr_photo[i]['tag'].length; j++) {
                            str += "#" + arr_photo[i]['tag'][j] + " ";
                        }
                        div_tegs.innerHTML = str;
                    }

                    let div_description = document.createElement('div');
                    div_description.innerHTML = arr_photo[i]['descriprion'];
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
            let div_more_photo = document.createElement('div');
            div_more_photo.innerHTML = "more photo";
            div_more_photo.className = "more_photo";
            div_more_photo.id="more_photo";
            div_more_photo.onclick = function() {
                loadMorePhoto()
            };
            div_more_photo.id = "morePhoto";
            perent.appendChild(div_more_photo);
            setLast( last + arr_photo.length);
        }
    };



    function filterSelected() {
        let perent = document.getElementById("perentid");
        while (perent.firstChild) {
            perent.removeChild(perent.firstChild);
        }
        last = 0;

        if (document.getElementById('checkbox_name').checked)
            this.filterConfig['author'] = document.getElementById('input_name').value;
        else
            delete this.filterConfig['author'];

        if (document.getElementById('checkbox_date').checked) {
            let e = document.getElementById("select_date");
            this.filterConfig['createdAt'] = e.options[e.selectedIndex].text;
        } else
            delete this.filterConfig['createdAt'];

        if (document.getElementById('checkbox_tag').checked) {
            let str = document.getElementById('input_tag').value.split(' ');
            this.filterConfig['tag'] = str;
        } else
            delete this.filterConfig['tag'];

        creatingPost(last, count, filterConfig);
    }




    function createheader() {
        let header = document.getElementById("idheader");
        let user = localStorage.getItem("user");
        if (user != null) {
            let div_account = document.createElement('div');
            let div_add_photo = document.createElement('div');
            let div_sign_in = document.createElement('div');

            div_add_photo.className = "add_photo";
            div_account.className = "account";
            div_sign_in.className = "sign_in";

            div_account.innerHTML = user;
            div_add_photo.innerHTML = "Add Photo";
            div_sign_in.innerHTML = "Exit";

            div_add_photo.onclick = function() {
                addphotoDOM.addPhotoPost()
            };
            div_sign_in.onclick = function() {
                messageYesOrNo("Exit?", exitfunction);
            };

            header.appendChild(div_account);
            header.appendChild(div_add_photo);
            header.appendChild(div_sign_in);
        } else {
            let div_sign_in = document.createElement('div');
            div_sign_in.className = "sign_in";
            div_sign_in.innerHTML = "Sign in";
            div_sign_in.onclick = function() {
                SignIn()
            };
            header.appendChild(div_sign_in);
        }
    }

    function SignIn() {
        bloсk();
        let acc = {};
        let div_sign_in = document.createElement('div');
        div_sign_in.className = "window_sign_in";
        div_sign_in.innerHTML = "CamRoll";
        let button_signIn = document.createElement("button");
        let button_cancel = document.createElement("button");
        button_signIn.className = "button_signIn";
        button_cancel.className = "button_cancel2";
        button_signIn.innerHTML = "Sign in";
        button_cancel.innerHTML = "Cancel";

        let p = document.createElement("p");
        p.innerHTML = "Your Login";
        div_sign_in.appendChild(p);
        let input_login = document.createElement("input");
        input_login.type = "text";
        input_login.className = "input_signin";
        p.appendChild(input_login);

        let p1 = document.createElement("p");
        p1.innerHTML = "Password";
        div_sign_in.appendChild(p1);
        let input_password = document.createElement("input");
        input_password.type = "text";
        input_password.className = "input_signin";
        p1.appendChild(input_password);


        button_signIn.onclick = function() {

            acc["login"] = input_login.value;
            acc["password"] = input_password.value;

            if (password.passwords.find(function(obj) {
                    return obj["login"] == acc["login"] && obj["password"] == acc["password"];
                }) != null) {

                localStorage.setItem("user", acc["login"]);
                cleanHeader();
                createheader();
                cleanTape();
                creatingPost(0, 10, filterConfig)
            }
            else{
                mistake.messageMistake("wrong password or login");
            }
            document.body.removeChild(div_sign_in);
            cleanBlock();
        };
        button_cancel.onclick = function() {
            document.body.removeChild(div_sign_in)
        };

        div_sign_in.appendChild(button_signIn);
        div_sign_in.appendChild(button_cancel);
        document.body.appendChild(div_sign_in);
    }

    function bloсk() {
        let div = document.createElement("div");
        div.id = "block";
        div.className = "overlay";
        document.body.appendChild(div);
    }

    function cleanBlock() {
        let div = document.getElementById("block");
        document.body.removeChild(div);
    }

    function exitfunction() {
        localStorage.removeItem("user");
        cleanHeader();
        cleanTape();
        createheader();
        creatingPost(0, 10, filterConfig);
    }

    function cleanTape() {
        let perent = document.getElementById("perentid");
        while (perent.firstChild) {
            perent.removeChild(perent.firstChild);
        }
    }

    function cleanHeader() {
        let perent = document.getElementById("idheader");
        while (perent.firstChild) {
            perent.removeChild(perent.firstChild);
        }
    }

    function messageYesOrNo(str, func) {
        bloсk();
        let div_delete_message = document.createElement('div');
        div_delete_message.className = "delete_message";
        div_delete_message.innerHTML = str;
        let button_yes = document.createElement("button");
        let button_no = document.createElement("button");
        button_yes.className = "button_yes";
        button_no.className = "button_no";
        button_yes.innerHTML = "Yes";
        button_no.innerHTML = "No";
        let elem = window.event.srcElement;
        button_yes.onclick = function() {
            document.body.removeChild(div_delete_message);
            cleanBlock();
            func();
        };
        button_no.onclick = function() {
            document.body.removeChild(div_delete_message);
            cleanBlock();
        };
        div_delete_message.appendChild(button_yes);
        div_delete_message.appendChild(button_no);
        document.body.appendChild(div_delete_message);
    }




    return {
        getLast: getLast,
        bloсk: bloсk,
        createheader: createheader,
        loadMorePhoto: loadMorePhoto,
        creatingPost: creatingPost,
        filterSelected: filterSelected,
        cleanBlock: cleanBlock,
        last: last,
        setLast: setLast,
        filterConfig: filterConfig
    }
}();