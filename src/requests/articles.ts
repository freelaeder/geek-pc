import {RequestManager} from "@utils/requestManager";
import {GeekResponse} from "response";
import {Channels} from "channels";


// 获取channels

export function getAllChannels() {
    return RequestManager.instance.request<GeekResponse<{ channels: Channels[] }>>({
        url: '/channels'
    })
}