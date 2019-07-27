import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getMvListAndTag() {
    const url = '/api/getMvListAndTag'

    const data = Object.assign({}, commonParams, {
        // '-': 'mvlib013192842602261168',
        // g_tk: 1526796020,
        // platform: 'yqq.json',
        // hostUin: 0,
        // needNewCode: 0,
        // format: 'json',
        // ct: 24,
        // start: 0,
        // size: 20,
        // version_id: 7,
        // area_id: 15,
        // order: 1,
        ' -': 'mvlib013192842602261168',
        g_tk: 1526796020,
        loginUin: 714363971,
        hostUin: 0,
        format: 'json',
        notice: 0,
        platform: 'yqq.json',
        needNewCode: 0,
        data: { "comm": { "ct": 24 }, "mv_tag": { "module": "MvService.MvInfoProServer", "method": "GetAllocTag", "param": {} }, "mv_list": { "module": "MvService.MvInfoProServer", "method": "GetAllocMvInfo", "param": { "start": 0, "size": 20, "version_id": 7, "area_id": 15, "order": 1 } } }
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}