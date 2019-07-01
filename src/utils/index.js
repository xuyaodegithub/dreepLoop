export const toRouter=(url)=>{
    let urls = window.location.href.split('#/')[0]
    let urlss = urls.substring(0,urls.lastIndexOf('/'))
    window.location.href=urlss+'/'+ url
}
