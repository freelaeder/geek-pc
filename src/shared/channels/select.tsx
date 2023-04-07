import React, {Component} from 'react';
import {ChannelState} from "@reducers/channelReducer";
import {ChannelActions} from "@actions/channelActions";
import {connect, MapDispatchToPropsParam, MapStateToProps} from "react-redux";
import {AppState, AppThunkDispatch} from "@src/store";
import {ChannelCreators} from "@store/creators/channelCreators";


interface StateProps {
    channelReducer: ChannelState
}

interface OwnProps {
    values?: string;
    onChange: (value: string) => void;
}


interface DispatchProps {
// 获取频道列表
    requestChannel: () => Promise<ChannelActions.Actions>;
}

type Props = StateProps & OwnProps & DispatchProps

class SelectChannels extends Component<Props> {
    async componentDidMount() {
        await this.props.requestChannel()
    }

    render() {
        const {channelReducer: {channels: {result}}} = this.props

        return (
            <div className="select">
                <select value={this.props.values} onChange={(event) => this.props.onChange(event.target.value)}>
                    <option disabled={true}>请选择文章频道</option>
                    {
                        result && result.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))
                    }
                </select>
            </div>
        );
    }
}


const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (state) => ({
    channelReducer: state.channelReducer
})

const mapDispatchToProps: MapDispatchToPropsParam<DispatchProps, OwnProps> = (dispatch: AppThunkDispatch) => ({
    requestChannel: () => dispatch(ChannelCreators.RequestChannels())
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectChannels)