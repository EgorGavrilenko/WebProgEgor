;
var workWithDOM = function() {

    let user = 'Гавриленко Егор';
    let count = 10;
    let last = 0;
    let filterConfig = {};

    function loadMorePhoto() {
        perentid.removeChild(morePhoto);
        creatingPost(last, count, filterConfig);
    }

    function creatingPost(skip, top, filterConfig) {

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
                            removePhoto()
                        };
                        div_processing.onclick = function() {
                            editPhotoPost()
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
                    if (arr_photo[i]['like'].indexOf(user) != -1)
                        div_like.className = "like_yes";
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
            div_more_photo.onclick = function() {
                loadMorePhoto()
            };
            div_more_photo.id = "morePhoto";
            perent.appendChild(div_more_photo);
            last += arr_photo.length;
        }
    };

    function removePhoto() {
        let div_delete_message = document.createElement('div');
        div_delete_message.className = "delete_message";
        div_delete_message.innerHTML = "delete photo?";
        let button_yes = document.createElement("button");
        let button_no = document.createElement("button");
        button_yes.className = "button_yes";
        button_no.className = "button_no";
        button_yes.innerHTML = "Yes";
        button_no.innerHTML = "No";
        let elem = window.event.srcElement;
        button_yes.onclick = function() {
            camRollFunction.removePhotoPost(elem.parentNode.id);
            elem.parentNode.parentNode.removeChild(elem.parentNode);
            last -= 1;
            document.body.removeChild(div_delete_message);
        };
        button_no.onclick = function() {
            document.body.removeChild(div_delete_message);
        };
        div_delete_message.appendChild(button_yes);
        div_delete_message.appendChild(button_no);
        document.body.appendChild(div_delete_message);
    };

    function filterSelected() {
        let perent = document.getElementById("perentid");
        while (perent.firstChild) {
            perent.removeChild(perent.firstChild);
        }
        delete filterConfig;
        last = 0;

        if (document.getElementById('checkbox_name').checked)
            filterConfig['author'] = document.getElementById('input_name').value;
        else
            delete filterConfig['author'];

        if (document.getElementById('checkbox_date').checked) {
            let e = document.getElementById("select_date");
            filterConfig['createdAt'] = e.options[e.selectedIndex].text;
        } else
            delete filterConfig['createdAt'];

        if (document.getElementById('checkbox_tag').checked) {
            let str = document.getElementById('input_tag').value.split(' ');
            filterConfig['tag'] = str;
        } else
            delete filterConfig['tag'];

        creatingPost(last, count, filterConfig);
    }

    function addPhotoPost() {
        let perent = document.getElementById("perentid");
        while (perent.firstChild) {
            perent.removeChild(perent.firstChild);
        }
        let div_addPhoto = document.createElement("div");
        div_addPhoto.className = "addphoto";
        perent.appendChild(div_addPhoto);


        let div = document.createElement('div');
        div.style.width = "100%";
        perent.appendChild(div);
        let p = document.createElement("p");
        p.innerHTML = "descriprion";
        div.appendChild(p);

        let input_descr = document.createElement("input");
        input_descr.type = "text";
        input_descr.className = "input_for_edit";
        p.appendChild(input_descr);

        let p1 = document.createElement("p");
        p1.innerHTML = "tags";
        div.appendChild(p1);

        let input_tag = document.createElement("input");
        input_tag.type = "text";
        input_tag.className = "input_for_edit";
        p1.appendChild(input_tag);


        let button_ok = document.createElement("button");
        let button_cancel = document.createElement("button");
        button_ok.className = "button_ok";
        button_cancel.className = "button_cancel";
        button_ok.innerHTML = "Add";
        button_cancel.innerHTML = "Cancel";

        perent.appendChild(button_ok);
        perent.appendChild(button_cancel);
        button_ok.onclick = function() {
            let perent = document.getElementById("perentid");
            while (perent.firstChild) {
                perent.removeChild(perent.firstChild);
            }
            let newpost = {};
            let str = input_tag.value.split(" #");
            newpost['tag'] = str;
            let str2 = input_descr.value;
            newpost['descriprion'] = str2;

            camRollFunction.addPhotoPost(p);
            creatingPost(0, 10)
        };
        button_cancel.onclick = function() {
            let perent = document.getElementById("perentid");
            while (perent.firstChild) {
                perent.removeChild(perent.firstChild);
            }
            creatingPost(0, 10)
        };
    };

    function editPhotoPost() {
        let perent = document.getElementById("perentid");
        while (perent.firstChild) {
            perent.removeChild(perent.firstChild);
        }

        let elem = window.event.srcElement;
        let postid = elem.parentNode.id;
        let post = camRollFunction.getPhotoPost(postid);

        let div_photo = document.createElement('div');
        div_photo.className = "photo";
        div_photo.style.backgroundImage = 'url(' + post['photoLink'] + ')';
        perent.appendChild(div_photo);

        let div = document.createElement('div');
        div.style.width = "100%";
        perent.appendChild(div);
        let p = document.createElement("p");
        p.innerHTML = "descriprion";
        div.appendChild(p);

        let input_descr = document.createElement("input");
        input_descr.type = "text";
        input_descr.value = post['descriprion'];
        input_descr.className = "input_for_edit";
        p.appendChild(input_descr);

        let p1 = document.createElement("p");
        p1.innerHTML = "tags";
        div.appendChild(p1);

        let str = '';
        for (let j = 0; j < post['tag'].length; j++) {
            str += " #" + post['tag'][j];
        }
        let input_tag = document.createElement("input");
        input_tag.type = "text";
        input_tag.value = str;
        input_tag.className = "input_for_edit";
        p1.appendChild(input_tag);


        let button_ok = document.createElement("button");
        let button_cancel = document.createElement("button");
        button_ok.className = "button_ok";
        button_cancel.className = "button_cancel";
        button_ok.innerHTML = "Ok";
        button_cancel.innerHTML = "Cancel";

        perent.appendChild(button_ok);
        perent.appendChild(button_cancel);
        button_ok.onclick = function() {

            let change = {};
            let str = input_tag.value.split(" #");
            change['tag'] = str;
            let str2 = input_descr.value;
            change['descriprion'] = str2;
            console.log(change);

            camRollFunction.editPhotoPost(postid, change);
            console.log(camRollFunction.editPhotoPost(postid, change));;
            let perent = document.getElementById("perentid");
            while (perent.firstChild) {
                perent.removeChild(perent.firstChild);
            }
            creatingPost(0, 10)
        };
        button_cancel.onclick = function() {
            let perent = document.getElementById("perentid");
            while (perent.firstChild) {
                perent.removeChild(perent.firstChild);
            }
            creatingPost(0, 10)
        };
    };

    function editPhotoPost2(id, change) {
        if (camRollFunction.editPhotoPost(id, change)) {
            let perent = document.getElementById("perentid");
            while (perent.firstChild) {
                perent.removeChild(perent.firstChild);
            }
            creatingPost(0, last + 1);
        }
    }

    function addPhotoPost2(param) {
        camRollFunction.addPhotoPost(param);
    }

    function removePhoto2(id) {
        let post = document.getElementById(id);
        if (post != null) {
            post.parentNode.removeChild(post);
            camRollFunction.removePhotoPost(id);
        }
    }

    function start() {
        creatingPost(0,10);
        alert("задание 5 с событиями по нажатию по некоторой облости(крестик над фото, шестерёнка, more photo и др.)");
    }

    return {
        start:start,
        editPhotoPost: editPhotoPost,
        loadMorePhoto: loadMorePhoto,
        creatingPost: creatingPost,
        removePhoto: removePhoto,
        filterSelected: filterSelected,
        addPhotoPost: addPhotoPost,
        removePhoto2: removePhoto2,
        addPhotoPost2: addPhotoPost2,
        editPhotoPost2: editPhotoPost2
    }
}();