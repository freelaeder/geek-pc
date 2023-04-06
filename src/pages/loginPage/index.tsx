// src/pages/loginPage/index.tsx
import React, {FormEvent} from "react";
import styles from './index.module.css'
import {z, ZodError} from "zod";
import logo from '@image/logo.png'
import {loginRequest} from "@requests/auth";
import {toast} from "react-toastify";
import {AxiosError} from "axios";
import {UserActions} from "@actions/userActions";
import {Credentials} from "auth";
import {connect, MapDispatchToPropsParam} from "react-redux";
import {AppDispatch} from "@src/store";
import {UserCreators} from "@store/creators/userCreators";
import {RouteComponentProps} from "react-router-dom";

interface FormState {
    mobile: string;
    code: string;
    agree: boolean
}


interface FormErrors {
    agree?: string[];
    code?: string[];
    mobile?: string[]
}

interface Status {
    form: FormState,
    formError: FormErrors
}

// 用于发送actions指令的方法
interface DispatchProps {
    saveCredentials(credentials: Credentials): UserActions.SaveCredentials;
}

//组件状态的props
interface OwnProps {
}

// 从redux中映射的state
interface StateProps {

}

// 组件 Props 对象的类型
type Props = OwnProps & StateProps & DispatchProps & RouteComponentProps;

class LoginPage extends React.Component<Props, Status> {

    constructor(props: Props) {
        super(props)
        this.state = {
            form: {
                mobile: '13911111111',
                code: '246810',
                agree: true
            },
            // 记录表单验证错误
            formError: {
                mobile: undefined,
                code: undefined,
                agree: undefined,
            },
        }
        // 使以下方法中的 this 关键字指向当前类的实例
        this.onFieldValidate = this.onFieldValidate.bind(this);
        this.validateMobile = this.validateMobile.bind(this);
        this.validateCode = this.validateCode.bind(this);
        this.validateAgree = this.validateAgree.bind(this);
    }

    UserInfo = z.object({
        mobile: z.string().regex(/^1(\d{10})$/, {message: '请输入正确的手机号'}).min(1, "请输入手机号"),
        code: z.string().length(6, {message: '验证码必须为 6 位数字'}).min(1, "请输入验证码"),
        agree: z.boolean().refine(value => value === true, {message: '必须同意协议'})
    });

    // 更新表单状态
    updateFormData: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const {name, value, checked} = event.target
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [name]: name === 'agree' ? checked : value
            }
        })

    }

    // 表单提交
    submitFormData = async (event: FormEvent<HTMLFormElement>) => {
        // 阻止表单提交默认跳转的行为
        event.preventDefault()
        // 验证表单
        const result = this.UserInfo.safeParse(this.state.form)
        // const hasErrors = Object.keys(result?.error.formErrors.fieldErrors).length !== 0;
        // 不通过
        if (!result.success) {
            // console.log(result.error.issues.map(item => item.message))
            this.setState({
                formError: {...result.error.formErrors.fieldErrors as FormErrors}
            })
            return
        }
        // 发送请求
        try {
            const res = await loginRequest({mobile: this.state.form.mobile, code: this.state.form.code})
            // 登录成功提示
            toast.success("登录成功");
            // 保存redux
            this.props.saveCredentials(res.data)
            // 跳转到首页
            this.props.history.push("/admin/dashboard");
        } catch (e) {
            if (e instanceof AxiosError) {
                toast.error(e.response?.data.message);
            }
        }
    }

    // 表单字段验证
    onFieldValidate<K extends keyof FormErrors, V extends FormState[K]>(
        name: K,
        value: V
    ) {
        // 捕获错误
        try {
            // 验证名称为 [name] 的表单项
            this.UserInfo.shape[name].parse(value);
            // 验证通过, 设置该表单项的错误信息 undefined
            this.setState({
                formError: {...this.state.formError, [name]: undefined},
            });
        } catch (error) {
            // 为错误对象标注类型
            const zodError = error as ZodError<FormErrors>;
            // 未通过验证 获取错误信息
            const formErrors = zodError.formErrors.formErrors;
            // 更新组件状态
            this.setState({
                formError: {...this.state.formError, [name]: formErrors},
            });
        }
    }

    // 验证手机号
    validateMobile(event: FormEvent<HTMLInputElement>) {
        return this.onFieldValidate("mobile", event.currentTarget.value);
    }

    // 验证手机验证码
    validateCode(event: FormEvent<HTMLInputElement>) {
        return this.onFieldValidate("code", event.currentTarget.value);
    }

    // 验证是否同意协议
    validateAgree(event: FormEvent<HTMLInputElement>) {
        return this.onFieldValidate("agree", event.currentTarget.checked);
    }

    //抽离错误信息渲染
    // field: keyof FormErrors  === field = 'code' | 'mobile' | 'agree'
    renderErrorsInfo = (field: keyof FormErrors) => {
        return (
            this.state.formError[field] &&
            <p className="help is-danger">{this.state.formError[field]?.[0]}</p>
        )
    }


    render() {
        // 双重解构
        const {form: {mobile, code, agree}} = this.state
        return <div className={styles.loginPage}>
            <div className={styles.loginContainer}>
                <img className={styles.logo} src={logo} alt="极客园"/>
                <form onSubmit={this.submitFormData}>
                    <div className="field">
                        <input name={'mobile'} onInput={this.validateMobile} onBlur={this.validateMobile} value={mobile}
                               onChange={this.updateFormData} className="input"
                               type="text" placeholder="请输入手机号"/>
                        {/*{*/}
                        {/*    this.state.formError.mobile &&*/}
                        {/*    <p className="help is-danger">{this.state.formError.mobile}</p>*/}
                        {/*}*/}
                        {
                            this.renderErrorsInfo('mobile')
                        }

                    </div>
                    <div className="field">
                        <input name={'code'} value={code} onInput={this.validateCode} onBlur={this.validateCode}
                               onChange={this.updateFormData} className="input" type="text"
                               placeholder="请输入验证码"/>
                        {
                            this.renderErrorsInfo('code')
                        }
                    </div>
                    <div className="field">
                        <label className="checkbox">
                            <input name={'agree'} onInput={this.validateAgree} onBlur={this.validateAgree}
                                   checked={agree} onChange={this.updateFormData} type="checkbox"/>
                            <span className="is-size-7 ml-1">
                  我已阅读并同意「用户协议」和「隐私条款」
                </span>
                        </label>
                        {
                            this.renderErrorsInfo('agree')
                        }
                    </div>
                    <div className="field">
                        <button className="button is-info is-fullwidth">登录</button>
                    </div>
                </form>
            </div>
        </div>;
    }
}

const mapDispatchProps: MapDispatchToPropsParam<DispatchProps, OwnProps> = (dispatch: AppDispatch) => ({
    saveCredentials: (credentials: Credentials) => dispatch(UserCreators.saveUserInfoCreator(credentials))
})

export default connect(undefined, mapDispatchProps)(LoginPage)