;
var smile = function() {
    function likeFunction() {
        let user=localStorage.getItem("user");
        let elem = window.event.srcElement;
        let id = elem.parentNode.parentNode.id;
        let a = camRollFunction.getPhotoPost(id)['like'].indexOf(user);
        let numberOfPhoto = photoPostsModule.photoPosts.indexOf(camRollFunction.getPhotoPost(id));

        if (a == -1) {
            elem.className = "like_yes";
            photoPostsModule.photoPosts[numberOfPhoto]['like'].push(user);
        } else {
            elem.className = "like_no";
            photoPostsModule.photoPosts[numberOfPhoto]['like'].splice(user);
        }
    }
    return {
        likeFunction: likeFunction
    }
}();