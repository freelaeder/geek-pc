import {ChannelTypes} from "@store/types/channelTypes";
import {Channels} from "channels";

export namespace ChannelActions {
    export interface RequestChannel {
        type: ChannelTypes.REQUEST_CHANNEL
    }

    export interface RequestChannelSuccess {
        type: ChannelTypes.REQUEST_CHANNEL_SUCCESS,
        payload: {
            channels: Channels[]
        }
    }

    export interface RequestChannelError {
        type: ChannelTypes.REQUEST_CHANNEL_ERROR,
        error: string | null
    }

    export type Actions = RequestChannel | RequestChannelError | RequestChannelSuccess
}