import { getPlayUrl } from 'api/singer'
import { ERR_OK } from 'api/config'
export default function(mid) {

    let result = getPlayUrl(mid).then(res => {
        if (res.code === ERR_OK) {
            let vkey = res.data.items[0].vkey;
            let filename = res.data.items[0].filename;
            let url = `http://dl.stream.qqmusic.qq.com/${filename}?vkey=${vkey}&guid=3655047200&fromtag=66`;
            return url
        }
    })
    return result
}