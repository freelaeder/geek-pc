// src/shared/header/index.tsx
import React from "react";
import styles from "./index.module.css";
import {connect, MapDispatchToPropsParam, MapStateToProps} from "react-redux";
import {AppState, AppThunkDispatch} from "@src/store";
import {UserState} from "@reducers/userReducer";
import {UserActions} from "@actions/userActions";
import {UserCreators} from "@store/creators/userCreators";
import Confirm from "@shared/confirm";
import {history} from "@src/AppRouter";


interface StatusProps {
    userReducer: UserState
}

interface OwnProps {
}

interface DispatchProps {
    requestUserInfo: () => Promise<UserActions.Actions>;
    // 清空用户信息
    clearUserInfo: () => UserActions.ClearUser
}

// 组件 Props 对象的最终类型
type Props = StatusProps & OwnProps & DispatchProps


// 组件状态类型
interface States {
    // 控制退出登录弹窗是否渲染
    isOpen: boolean;
}


class Header extends React.Component<Props, States> {

    state = {
        // 控制退出登录弹窗是否渲染
        isOpen: false
    }

    async componentDidMount() {
        const {requestUserInfo} = this.props
        await requestUserInfo()
    }

    render() {
        const {name} = this.props.userReducer.user.result
        const {isOpen} = this.state
        return (
            <div className={styles.header}>
                <div className={styles.logo}>
                    <img src={require("@image/logo.png")} alt="极客园"/>
                </div>
                <div className={styles.user}>
                    <span>{name && name}</span>
                    <button onClick={() => this.setState({isOpen: true})}
                            className="button is-ghost has-text-white">退出
                    </button>
                    <Confirm onSureButtonClicked={() => {
                        this.props.clearUserInfo();
                        //转到登录页
                        history.replace("/login");
                    }} isOpen={isOpen}
                             close={() => this.setState({isOpen: false})}>
                        logout account </Confirm>
                </div>
            </div>
        );
    }
}


// 从store 映射对象
const mapStateToProps: MapStateToProps<StatusProps, OwnProps, AppState> = (state) => ({
    // 获取用户对象状态
    userReducer: state.userReducer
})

const mapDispatchToProps: MapDispatchToPropsParam<DispatchProps, OwnProps> = (dispatch: AppThunkDispatch) => ({
    requestUserInfo: () => dispatch(UserCreators.requestUserInfoCreator()),
    clearUserInfo: () => dispatch(UserCreators.clearUserInfo())

})
export default connect(mapStateToProps, mapDispatchToProps)(Header)