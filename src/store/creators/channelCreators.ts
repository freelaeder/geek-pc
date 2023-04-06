import {ThunkAction} from "redux-thunk";
import {AppState} from "@src/store";
import {ChannelActions} from "@actions/channelActions";
import {ChannelTypes} from "@store/types/channelTypes";
import {getAllChannels} from "@requests/articles";
import {AxiosError} from "axios";


export namespace ChannelCreators {
    export const RequestChannels = (): ThunkAction<Promise<ChannelActions.Actions>, AppState, any, ChannelActions.Actions> => async (dispatch) => {
        dispatch({type: ChannelTypes.REQUEST_CHANNEL})

        try {
            const res = await getAllChannels()
            return dispatch({type: ChannelTypes.REQUEST_CHANNEL_SUCCESS, payload: {channels: res.data.channels}})
        } catch (e) {
            if (e instanceof AxiosError) {
                return Promise.reject(dispatch({
                    type: ChannelTypes.REQUEST_CHANNEL_ERROR,
                    error: e.response?.data.message,
                }))
            }
            return Promise.reject(e);
        }
    }
}