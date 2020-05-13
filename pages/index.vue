<template>
    <v-layout column justify-center align-center>
        <v-flex xs12 sm8>
            <v-card min-width="400">
                <v-snackbar v-model="snackbar" :timeout="5000" top>
                    {{ message }}
                    <v-btn dark text @click="snackbar = false">Закрыть</v-btn>
                </v-snackbar>
                <v-card-title>
                    Вход в чат
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                        <v-text-field v-model="name" :counter="20" :rules="nameRules" label="Ваше имя" required></v-text-field>
                        <v-text-field v-model="room" :rules="roomRules" label="Номер комнаты" required></v-text-field>
                        <v-btn :disabled="!valid" color="primary" class="mr-4" @click="submit">
                        Войти
                        </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import {mapMutations} from 'vuex'
    export default {
        layout: 'empty',
        head: {
            title: 'Добро пожаловать',
            titleTemplate: ''
        },
        sockets: {
            connect: function() {
                console.log('socket connected')
            }
        },
        data: () => ({
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Введите имя',
                v => (v && v.length <= 20) || 'Имя не должно состоять из более чем 20 символов',
            ],
            room: '',
            roomRules: [
                v => !!v || 'Введите номер комнаты'
                // ,
                // v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            lazy: false,
            snackbar: false,
            message: ''
        }),
        mounted() {
            const {message} = this.$route.query;
            if (message === 'noUser') {
                this.message = 'Введите данные';
            }
            else if (message === 'leftChatRoom') {
                this.message = 'Вы вышли из чата';
            }

            this.snackbar = !!this.message;
        },
        methods: {
            ...mapMutations(['setUser']),
            submit() {
                if (this.$refs.form.validate()) {
                    const user = {
                        name: this.name,
                        room: this.room
                    };

                    this.$socket.emit('userJoined', user, data => {
                        if (typeof data === 'string') {
                            console.error(data);
                        }
                        else {
                            user.id = data.userId;
                            this.setUser(user);
                            this.$router.push('/chat');
                        }
                    });
                }
            }
        },
    }
</script>
