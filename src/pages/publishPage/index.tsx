// src/pages/publishPage/index.tsx
import React, {ChangeEvent} from "react";
import {Link} from "react-router-dom";
import ReactQuill from "react-quill";
import styles from "./index.module.css";
import SelectChannels from "@shared/channels/select";
import {publishArticleRequest, uploadRequest} from "@requests/articles";
import {PublishArticleParams} from "article";
import {AxiosError, AxiosProgressEvent} from "axios";
import classNames from "classnames";
import {Status} from "response";
import {toast} from "react-toastify";
import {history} from "@src/AppRouter";

interface Props {
}

interface States {
    // 表单状态
    formState: PublishArticleParams;
    // 文件上传
    fileUpload: {
        // 文件上传进度
        percentage: number;
        // 上传失败信息
        error: string | null;
    };
    // 是否存为草稿
    draft: boolean;
    // 发布文章请求状态
    publishRequestStatus: Status;
    // 发布文章请求错误信息
    publishRequestError: string | null;
}

export default class PublishPage extends React.Component<Props, States> {
    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            formState: {
                title: '',
                cover: {
                    type: 0,
                    images: [],
                },
                content: '',
                channel_id: "",
            },
            fileUpload: {
                percentage: 0,
                error: ''
            },
            // 是否存储为草稿
            draft: true,
            // 发布文章请求状态
            publishRequestStatus: "idle",
            // 发布文章请求错误信息
            publishRequestError: null,
        }
    }

    // 更新表单状态
    updateFormDate = (name: keyof PublishArticleParams, value: PublishArticleParams[keyof PublishArticleParams]) => {
        this.setState({
            formState: {
                ...this.state.formState,
                [name]: value
            }
        })
    }

    updateCover = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // 限制次数
        if (this.state.formState.cover.images.length === 3) {
            return this.setState({
                fileUpload: {
                    ...this.state.fileUpload,
                    error: '同一篇文章最多只能传递三张封面图片'
                }
            })
        }
        // 用户选择的files列表
        const files = event.target.files
        if (files !== null && files.length > 0) {
            // 重置文件上传状态
            this.setState({fileUpload: {percentage: 0, error: null}})
            try {
                // 上传图片
                const res = await uploadRequest(files[0], this.onUploadProgress)
                // 存储图片地址
                this.setState({
                    formState: {
                        ...this.state.formState,
                        cover: {
                            type: this.state.formState.cover.type + 1 as 0 | 1 | 2 | 3,
                            images: [...this.state.formState.cover.images, res.data.url]
                        }
                    }
                })
            } catch (e) {
                if (e instanceof AxiosError) {
                    this.setState({
                        fileUpload: {
                            ...this.state.fileUpload,
                            error: e.response?.data.message
                        }
                    })
                }
                throw e
            }
        }

    }

    // 更新上传进度
    onUploadProgress = (progressEvent: AxiosProgressEvent) => {
        // loaded: 已上传大小
        // total: 总大小
        const {loaded, total} = progressEvent;
        // 如果总大小存在
        if (typeof total !== "undefined") {
            // 计算上传进度
            let percentage = Math.floor((loaded * 100) / total);
            // 如果没有上传完成
            if (percentage < 100)
                // 不断更新上传进度
                return this.setState({
                    fileUpload: {...this.state.fileUpload, percentage},
                });
            // 上传完成重置上传进度
            this.setState({
                fileUpload: {...this.state.fileUpload, percentage: 0},
            });
        }
    }
    onSubmitDate = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        const {draft, publishRequestStatus, formState} = this.state
        if (publishRequestStatus === 'loading') return
        this.setState({
            publishRequestStatus: 'loading',
            publishRequestError: null
        })
        try {
            const res = await publishArticleRequest(draft, formState)
            this.setState({
                publishRequestStatus: 'success',
                publishRequestError: null
            })
            // 消息提示
            toast.success("发布成功");
            // 跳转到内容管理页面
            history.push("/admin/article");
        } catch (e) {
            if (e instanceof AxiosError) {
                this.setState({
                    publishRequestStatus: 'error',
                    publishRequestError: e.response?.data.error
                })
                return toast.success(`发布失败: ${e.response?.data.message}`);
            }
            throw  e
        }

    }

    render() {
        // 获取表单状态
        const {formState, fileUpload, draft,} = this.state;
        return (
            <div className={`has-background-white ${styles.publishPage}`}>
                <nav className="breadcrumb p-4">
                    <ul>
                        <li>
                            <Link to="/">首页</Link>
                        </li>
                        <li>
                            <Link to="/admin/publish">发布文章</Link>
                        </li>
                    </ul>
                </nav>
                <form onSubmit={this.onSubmitDate}>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">
                                标题 <span className="has-text-danger">*</span>
                            </label>
                        </div>
                        <div className="field-body">
                            <input
                                className="input"
                                type="text"
                                placeholder="请输入文章标题(必填)"
                                value={formState.title}
                                onChange={(event) => {
                                    this.updateFormDate('title', event.currentTarget.value)
                                }}
                            />
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">
                                频道 <span className="has-text-danger">*</span>
                            </label>
                        </div>
                        <div className="field-body">
                            <SelectChannels values={formState.channel_id}
                                            onChange={(value) => this.updateFormDate("channel_id", value === '请选择文章频道' ? undefined : value)}/>

                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label">
                            <label className="label">封面</label>
                        </div>
                        <div className="field-body">
                            {
                                this.state.formState.cover.type !== 0 && this.state.formState.cover.images.map(item => (
                                    <figure key={item} className="image is-128x128 mr-2">
                                        <img
                                            src={item}
                                            alt=""
                                        />
                                    </figure>
                                ))
                            }

                            <div className="file is-medium is-boxed">
                                <label className="file-label">
                                    <input onChange={this.updateCover} className="file-input" type="file"
                                           name="resume"/>
                                    <span className="file-cta">
                    <span className="file-icon">
                      <i className="fas fa-upload"></i>
                    </span>
                    <span className="file-label">上传图片</span>
                  </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label"></div>
                        <div className="field-body" style={{'flexWrap': "wrap"}}>
                            <div
                                className={classNames({"mb-0": fileUpload.percentage === 0 && fileUpload.error == null})}>
                                {fileUpload.percentage > 0 && (
                                    <progress value={fileUpload.percentage} max="100"></progress>
                                )}
                                {fileUpload.error && (
                                    <p className="has-text-danger">
                                        文件上传失败, 失败原因: {fileUpload.error}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">
                                内容 <span className="has-text-danger">*</span>
                            </label>
                        </div>
                        <div className="field-body">
                            <ReactQuill value={formState.content} onChange={(event) => {
                                this.updateFormDate('content', event)
                            }
                            } theme="snow"/>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label"></div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <button onClick={() => this.setState({draft: false})}
                                            className="button is-primary mr-3">发布文章
                                    </button>
                                    <button onClick={() => this.setState({draft: true})}
                                            className="button is-info">存入草稿
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}