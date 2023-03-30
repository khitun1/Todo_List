import {createStore} from "vuex";
import jwtDecode from "jwt-decode";
import {firstHost, host} from "@/http";
import router from "@/router";
import type {UserLogin, UserType} from "@/types/userType";
import type {TodoType} from "@/types/todoType";
import type {StateType} from "@/types/stateType";



export default createStore<StateType>({
    state: () => ({
        user: {
            name: '',
            surname: '',
            login: '',
            password: '',
        },
        todos: [],
        errorMsg: '',
        errorName: '',
        errorSurname: '',
        errorLogin: '',
        errorPassword: '',
    }),

    mutations: {
        addTodo(state, todo: TodoType) {
            state.todos.push(todo);
        },
        setTodos(state, data) {
            state.todos = data;
        },
        setUser(state, user) {
            state.user = user;
        },
        exit(state) {
            state.user = {
                name: '',
                surname: '',
                login: '',
                password: '',
            };
            state.todos = [];
            localStorage.removeItem('token');
        },
        done(state, id: number) {
            const item: TodoType = (state.todos.find(p => p.id === id))!;
            state.todos.splice(state.todos.indexOf(item), 1);
        },
        setError(state, msg) {
            state.errorMsg = msg;
        },
        setLoginError(state, msg) {
            state.errorLogin = msg;
        },
        setPasswordError(state, msg) {
            state.errorPassword = msg;
        },
        setNameError(state, msg) {
            state.errorName = msg;
        },
        setSurnameError(state, msg) {
            state.errorSurname = msg;
        },
        clearAllError(state) {
            state.errorMsg = '';
            state.errorLogin = '';
            state.errorPassword = '';
            state.errorName = '';
            state.errorSurname = '';
        }
    },

    actions: {
         async login({commit}, form: UserLogin) {
            const {data} = await firstHost.post('user/login', form);
            if (data.token) {
                localStorage.setItem('token', data.token);
                const user: UserType = jwtDecode(data.token);
                commit('setUser', user);
                await router.push('/mine');
            }
            else {
                commit('setError', data);
            }
        },

        async signUp({commit}, form: UserType) {
            const {data} = await host.post('user/signUp', form);
            if (data.token) {
                localStorage.setItem('token', data.token);
                const user: UserType = jwtDecode(data.token);
                commit('setUser', user);
                await router.push('/mine');
            }
            else {
                commit('setError', data);
            }
        },

        async auth({commit}) {
            const {data} = await host.get('user/auth');
            if (data.token) {
                const user: UserType = jwtDecode(data.token);
                commit('setUser', user);
            }
        },

        async getTodos({commit}) {
             const {data} = await host.get<TodoType[]>('todo/get');
             commit('setTodos', data);
        },

        async createTodo({commit}, todo: TodoType) {
            await host.post('todo/create', todo);
            const {data} = await host.get<TodoType[]>('todo/get');
            commit('setTodos', data);
        },
        async done({commit}, id: number) {
             await host.post('todo/delete', {id});
             commit('done', id);
        },
        async changeLogin({commit}, login: string) {
            const {data} = await host.post('user/changeLogin', {login});
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            else {
                commit('setError', data);
            }
        },
        async changePassword({commit}, password: string) {
            const {data} = await host.post('user/changePaswword', {password});
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
        },
    }
})