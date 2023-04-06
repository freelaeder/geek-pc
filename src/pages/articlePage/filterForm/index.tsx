// src/pages/articlePage/filterForm/index.tsx
import React from "react";
import styles from "./index.module.css";
import {connect, MapDispatchToPropsParam, MapStateToProps} from "react-redux";
import {ChannelState} from "@reducers/channelReducer";
import {AppState, AppThunkDispatch} from "@src/store";
import {ChannelActions} from "@actions/channelActions";
import {ChannelCreators} from "@store/creators/channelCreators";


interface StateProps {
    channelReducer: ChannelState
}

interface OwnProps {

}


interface DispatchProps {
// 获取频道列表
    requestChannel: () => Promise<ChannelActions.Actions>;
}

type Props = StateProps & OwnProps & DispatchProps

class FilterForm extends React.Component<Props> {

    async componentDidMount() {
        await this.props.requestChannel()
    }

    render() {
        const {channelReducer: {channels: {result}}} = this.props
        return (
            <form className={styles.filterForm}>
                <div className="field is-horizontal mb-5">
                    <div className="field-label">
                        <label className="label">状态：</label>
                    </div>
                    <div className="field-body">
                        <label className="radio mr-3">
                            <input type="radio" name="status" className="mr-1"/>
                            全部
                        </label>
                        <label className="radio mr-3">
                            <input type="radio" name="status" className="mr-1"/>
                            草稿
                        </label>
                        <label className="radio mr-3">
                            <input type="radio" name="status" className="mr-1"/>
                            待审核
                        </label>
                        <label className="radio mr-3">
                            <input type="radio" name="status" className="mr-1"/>
                            审核通过
                        </label>
                        <label className="radio mr-3">
                            <input type="radio" name="status" className="mr-1"/>
                            审核失败
                        </label>
                    </div>
                </div>
                <div className="field is-horizontal mb-5">
                    <div className="field-label is-normal">
                        <label className="label">频道：</label>
                    </div>
                    <div className="field-body">
                        <div className="select">
                            <select>
                                <option disabled={true}>请选择文章频道</option>
                                {
                                    result && result.map(item => (
                                        <option key={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal mb-5">
                    <div className="field-label is-normal">
                        <label className="label">日期：</label>
                    </div>
                    <div className="field-body">
                        <input className="input" type="text" placeholder="请选择日期"/>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <button className="button is-link">筛选</button>
                    </div>
                    <div className="field-body"></div>
                </div>
            </form>
        );
    }
}


const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (state) => ({
    channelReducer: state.channelReducer
})

const mapDispatchToProps: MapDispatchToPropsParam<DispatchProps, OwnProps> = (dispatch: AppThunkDispatch) => ({
    requestChannel: () => dispatch(ChannelCreators.RequestChannels())
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm)