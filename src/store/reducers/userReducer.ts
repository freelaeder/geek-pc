// src/store/reducers/userReducer.ts

interface Credentials {
    token: string,
    refresh_token: string
}

interface UserState {
    credentials: Credentials
}

const initialState: UserState = {
    // 用于保存用户登录凭据
    credentials: {
        token: '',
        refresh_token: ''

    },
};

export default function userReducer(state = initialState, action: any) {
    switch (action.type) {
        default:
            return state;
    }
}