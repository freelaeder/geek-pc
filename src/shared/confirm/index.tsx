// src/shared/confirm/index.tsx
import React, {ReactNode} from "react";


interface Props {
    // 控制弹框是否渲染
    isOpen: boolean;
    // 弹框标题
    title: string;
    // 弹框提示内容
    children: ReactNode;
    // 关闭弹框的方法
    close: () => void;
    // 点击取消按钮时执行的方法
    onCancelButtonClicked: () => void;
    // 点击确定按钮时执行的方法
    onSureButtonClicked: () => void;
}

export default class Confirm extends React.Component<Props> {
    // 默认值
    static defaultProps = {
        title: "温馨提示",
        onCancelButtonClicked: () => {
        },
        onSureButtonClicked: () => {
        },
    };

    render() {
        const {title, children, isOpen, close, onCancelButtonClicked, onSureButtonClicked} = this.props;
        return (
            <>
                {
                    isOpen && (
                        <div className="modal is-active">
                            <div className="modal-background" style={{backgroundColor: "rgba(0,0,0,0.5)"}}></div>
                            <div className="modal-card">
                                <header className="modal-card-head">
                                    <p className="modal-card-title">{title}</p>
                                    <button onClick={() => {
                                        close();
                                        onCancelButtonClicked();
                                    }} className="delete"></button>
                                </header>
                                <section className="modal-card-body">{children}</section>
                                <footer className="modal-card-foot" style={{display: 'flex', justifyContent: 'end'}}>
                                    <button onClick={() => {
                                        close();
                                        onSureButtonClicked()
                                    }} className="button is-success">确定
                                    </button>
                                    <button onClick={() => {
                                        close();
                                        onCancelButtonClicked()
                                    }} className="button is-info">取消
                                    </button>
                                </footer>
                            </div>
                        </div>
                    )
                }

            </>
        );
    }
}