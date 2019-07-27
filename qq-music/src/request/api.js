/**   
 * api接口统一管理
 */
import {get, post } from './http'
const BASE_URL = 'http://localhost:3200'
    //接口说明: 调用此接口, 可获取MV标签
const getMvByTag = g => get(`${BASE_URL}/getMvByTag`, g);
export default {
    getMvByTag
}