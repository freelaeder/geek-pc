// src/pages/articlePage/filterForm/index.tsx
import React, {ChangeEvent, FormEventHandler} from "react";
import styles from "./index.module.css";
import SelectChannels from "@shared/channels/select";
import {articlesRequestParams, ArticlesStatus} from "article";
import DatePicker from "react-datepicker";

type Props = {
    reqParams: Partial<articlesRequestParams>
    // 修改文章列表请求参数的方法
    updateReqParams: (reqParams: articlesRequestParams) => void
    // 获取列表
    getArticleByReq:() =>void
}

export default class FilterForm extends React.Component<Props> {



    // 频道列表选择
    onChannelChanged = (event: any) => {
        this.props.updateReqParams({
            channel_id: event === '请选择文章频道' ? undefined : event
        })
    }
    // 当日期发生变化时执行
    onDateChanged = (dates: (Date | null)[]) => {
        // 将用户选择的最新日期更新到组件状态中
        this.props.updateReqParams({
            begin_pubdate: dates[0],
            end_pubdate: dates[1],
        });
    }

    // 当文章状态发生变化时执行
    onStatusChanged =(event: ChangeEvent<HTMLInputElement>) => {
        // 获取状态值并转换为数值
        const value = parseInt(event.currentTarget.value) as ArticlesStatus;
        // 更新文章状态类型
        this.props.updateReqParams({
            status: value === -1 ? undefined : value,
        });
    }
    onSubmit:FormEventHandler = (event) => {
        event.preventDefault()
        this.props.getArticleByReq()
    }

    render() {
        const {reqParams} = this.props
        return (
            <form onSubmit={this.onSubmit} className={styles.filterForm}>
                <div className="field is-horizontal mb-5">
                    <div className="field-label">
                        <label className="label">状态：</label>
                    </div>
                    <div className="field-body">
                        <label className="radio mr-3">
                            <input type="radio" name="status" className="mr-1" checked={reqParams.status === undefined}
                                   value={-1} onChange={this.onStatusChanged}/> 全部
                        </label>
                        <label className="radio mr-3">
                            <input checked={reqParams.status === 0} value={0} onChange={this.onStatusChanged}
                                   type="radio" name="status" className="mr-1"/>
                            草稿
                        </label>
                        <label className="radio mr-3">
                            <input checked={reqParams.status === 1} value={1} onChange={this.onStatusChanged}
                                   type="radio" name="status" className="mr-1"/>
                            待审核
                        </label>
                        <label className="radio mr-3">
                            <input checked={reqParams.status === 2} value={2} onChange={this.onStatusChanged}
                                   type="radio" name="status" className="mr-1"/>
                            审核通过
                        </label>
                        <label className="radio mr-3">
                            <input checked={reqParams.status === 3} value={3} onChange={this.onStatusChanged}
                                   type="radio" name="status" className="mr-1"/>
                            审核失败
                        </label>
                    </div>
                </div>
                <div className="field is-horizontal mb-5">
                    <div className="field-label is-normal">
                        <label className="label">频道：</label>
                    </div>
                    <div className="field-body">
                        <SelectChannels values={reqParams.channel_id} onChange={this.onChannelChanged}/>
                    </div>
                </div>
                <div className="field is-horizontal mb-5">
                    <div className="field-label is-normal">
                        <label className="label">日期：</label>
                    </div>
                    <div className="field-body">
                        <DatePicker
                            className="input"
                            onChange={this.onDateChanged}
                            startDate={reqParams.begin_pubdate}
                            endDate={reqParams.end_pubdate}
                            placeholderText={"请选择日期"}
                            dateFormat={"yyyy-MM-dd"}
                            selectsRange
                            isClearable
                        />
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



