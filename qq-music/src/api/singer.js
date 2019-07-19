import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getSingerList() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

    const data = Object.assign({}, commonParams, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 'all',
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        g_tk: 1664029744
    })

    return jsonp(url, data, options)
}

export function getSingerDetail(singerId) {

    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

    const data = Object.assign({}, commonParams, {
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        order: 'listen',
        begin: 0,
        num: 100,
        songstatus: 1,
        singermid: singerId
    })

    return jsonp(url, data, options)
}

export function getPlayUrl(singerMid) {
    const url = '/api/getPlayUrl'
    const data = Object.assign({}, commonParams, {
        g_tk: 1278911659,
        hostUin: 0,
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        cid: 205361747,
        uin: 0,
        songmid: singerMid,
        filename: `C400${singerMid}.m4a`,
        guid: 3655047200
    })
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}