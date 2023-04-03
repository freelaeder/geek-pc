// src/pages/loginPage/index.tsx
import React, {FormEvent} from "react";
import styles from './index.module.css'
import {z, ZodError} from "zod";
import logo from '@image/logo.png'

interface FormState {
    mobile: string;
    code: string;
    agree: boolean
}

interface Props {

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

export default class LoginPage extends React.Component<Props, Status> {

    constructor(props: Props) {
        super(props)
        this.state = {
            form: {
                mobile: '',
                code: '',
                agree: false
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
            form: {
                ...this.state.form,
                [name]: name === 'agree' ? checked : value
            }
        })

    }

    // 表单提交
    submitFormData = (event: FormEvent<HTMLFormElement>) => {
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
                        {
                            this.state.formError.mobile &&
                            <p className="help is-danger">{this.state.formError.mobile}</p>
                        }

                    </div>
                    <div className="field">
                        <input name={'code'} value={code} onInput={this.validateCode} onBlur={this.validateCode}
                               onChange={this.updateFormData} className="input" type="text"
                               placeholder="请输入验证码"/>
                        {
                            this.state.formError.code &&
                            <p className="help is-danger">{this.state.formError.code}</p>
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
                            this.state.formError.agree &&
                            <p className="help is-danger">{this.state.formError.agree}</p>
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