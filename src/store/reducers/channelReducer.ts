import {Channels} from "channels";
import {Status} from "response";
import {ChannelActions} from "@actions/channelActions";
import {ChannelTypes} from "@store/types/channelTypes";

export interface ChannelState {
    channels: {
        result: Channels[],
        status: Status,
        error: string | null
    }
}

const initialState: ChannelState = {
    channels: {
        result: [],
        status: 'idle',
        error: null
    }
}


export function channelReducer(state = initialState, action: ChannelActions.Actions): ChannelState {


    switch (action.type) {
        case ChannelTypes.REQUEST_CHANNEL:
            return {
                ...state,
                channels: {
                    result: [],
                    status: 'loading',
                    error: null
                }
            }
        case ChannelTypes.REQUEST_CHANNEL_SUCCESS:
            return {
                ...state,
                channels: {
                    result: action.payload.channels,
                    status: 'success',
                    error: null
                }
            }
        case ChannelTypes.REQUEST_CHANNEL_ERROR:
            return {
                ...state,
                channels: {
                    result: [],
                    status: 'error',
                    error: action.error
                }
            }
        default :
            return state
    }
}