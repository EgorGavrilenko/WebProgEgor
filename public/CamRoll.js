const camRollFunction = (function () {
  /*
  function getSelectTimePeriod(time) {
    if (time === 'last 24 hour') {
      let d = new Date();
      d.setDate(d.getDate() - 1);
      return d;
    }
    if (time === 'last week') {
      let d = new Date();
      d.setDate(d.getDate() - 7);
      return d;
    }
    if (time === 'last month') {
      let d = new Date();
      d.setMonth(d.getMonth() - 1);
      return d;
    }
    if (time === 'last year') {
      let d = new Date();
      d.setMonth(d.getMonth() - 12);
      return d;
    }
  } */
  /*
  function getPhotoPosts(skip, top, filterConfig) {
    if (skip > photoPostsModule.photoPosts.length) return null;
    let arr = [],
      array = [];
    arr = photoPostsModule.photoPosts.filter(function(val) {
      if (typeof filterConfig === 'object') {
        if ('author' in filterConfig) {
          if (!(filterConfig['author'] === val['author'])) return false;
        }
        if ('createdAt' in filterConfig) {
          if (
            !(
              Date.parse(val['createdAt']) >
              Date.parse(getSelectTimePeriod(filterConfig['createdAt']))
            )
          )
            return false;
        }
        if ('tag' in filterConfig) {
          if (is_array(filterConfig['tag'])) {
            let bool = false;
            for (let i = 0; i < filterConfig['tag'].length; i++) {
              for (let j = 0; j < val['tag'].length; j++) {
                if (val['tag'][j] === filterConfig['tag'][i]) bool = true;
              }
            }
            if (!bool) return false;
          } else {
            let bool = false;
            for (let i = 0; i < val['tag'].length; i++) {
              if (val['tag'][i] === filterConfig['tag']) bool = true;
            }
            if (!bool) return false;
          }
        }
      }
      return true;
    });

    for (let i = skip, j = 0; i < arr.length && j < top; i++, j++) {
      array[j] = arr[i];
    }
    return array;
  } */

  function is_array(a) {
    return typeof a === "object" && a instanceof Array;
  }

  function validatePhotoPost(photoPost) {
    if (!(typeof photoPost === "object")) return false;
    if (!("id" in photoPost)) {
      return false;
    }
    if (!("descriprion" in photoPost)) {
      return false;
    }
    if (!("createdAt" in photoPost)) {
      return false;
    }
    if (!("author" in photoPost)) {
      return false;
    }
    if (!("photoLink" in photoPost)) {
      return false;
    }
    if (!("tag" in photoPost)) {
      return false;
    }
    if (!("like" in photoPost)) {
      return false;
    }
    if (!(typeof photoPost.id === "string")) return false;
    if (!(typeof photoPost.descriprion === "string")) return false;
    if (!(typeof photoPost.createdAt === typeof new Date())) return false;
    if (!(typeof photoPost.author === "string")) return false;
    if (!(typeof photoPost.photoLink === "string")) return false;
    if (!is_array(photoPost.tag)) return false;
    if (!is_array(photoPost.like)) return false;
    for (let i = 0; i < photoPost.tag.length; i++) {
      if (!(typeof photoPost.tag[i] === "string")) return false;
    }
    for (let i = 0; i < photoPost.like.length; i++) {
      if (!(typeof photoPost.like[i] === "string")) return false;
    }
    return true;
  }

  /*
  function addPhotoPost(p) {
    p.id = String(photoPostsModule.photoPosts.length + 1);
    p.createdAt = new Date();
    p.like = [];
    if (validatePhotoPost(p)) {
      photoPostsModule.photoPosts.push(p);
      photoPostsModule.updatelocalStorage();
      return true;
    } else return false;
  }
  */
  /*
  function getPhotoPost(index) {
    return photoPostsModule.photoPosts.find(x => x.id == index);
  }
  */
  /*
  function removePhotoPost(index) {
    let k = photoPostsModule.photoPosts.find(x => x.id == index);
    if (k === undefined) {
      return false;
    } else {
      photoPostsModule.photoPosts.splice(photoPostsModule.photoPosts.indexOf(k), 1);
      photoPostsModule.updatelocalStorage();
      return true;
    }
  }
  */
  /*
  function editPhotoPost(index, change) {
    let k = photoPostsModule.photoPosts.find(x => x.id == index);
    if (k === undefined) {
      return false;
    } else {
      if (!(typeof change === 'object')) return false;
      if ('descriprion' in change) {
        if (typeof change['descriprion'] === 'string')
          photoPostsModule.photoPosts[photoPostsModule.photoPosts.indexOf(k)]['descriprion'] =
            change['descriprion'];
      }
      if ('photoLink' in change) {
        if (typeof change['photoLink'] === 'string')
          photoPostsModule.photoPosts[photoPostsModule.photoPosts.indexOf(k)]['photoLink'] =
            change['photoLink'];
      }
      if ('tag' in change) {
        if (!change['tag'].isArray) {
          let t = true;
          for (let i = 0; i < change['tag'].length; i++)
            if (!(typeof change['tag'][i] === 'string')) t = false;
          if (t)
            photoPostsModule.photoPosts[photoPostsModule.photoPosts.indexOf(k)]['tag'] =
              change['tag'];
        }
      }
      if ('like' in change) {
        if (!change['like'].isArray) {
          let t = true;
          for (let i = 0; i < change['like'].length; i++)
            if (!(typeof change['like'][i] === 'string')) t = false;
          if (t)
            photoPostsModule.photoPosts[photoPostsModule.photoPosts.indexOf(k)]['like'] =
              change['like'];
        }
      }

      photoPostsModule.updatelocalStorage();
      return true;
    }
  }
*/
  return {
    validatePhotoPost,
  };
}());
