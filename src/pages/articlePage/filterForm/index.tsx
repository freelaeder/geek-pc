// src/pages/articlePage/filterForm/index.tsx
import React from "react";
import styles from "./index.module.css";
import SelectChannels from "@shared/channels/select";


export default class FilterForm extends React.Component {
    state = {
        values: ''
    }


    onChannelChanged = (event: any) => {
        this.setState({
            values: event
        })
    }

    render() {
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
                        <SelectChannels values={this.state.values} onChange={this.onChannelChanged}/>
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



