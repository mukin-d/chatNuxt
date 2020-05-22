<template>
    <v-col cols="11">
        <v-text-field label="Введите сообщение" outlined v-model.trim="text" @keydown.enter="sendMessage"></v-text-field>
    </v-col>
</template>

<script>
    export default {
        data: () => ({
            text: ''
        }),
        methods: {
            sendMessage() {
                if(new Date().getHours() < 10) {
                    var curHours = '0' + new Date().getHours();
                }
                if(new Date().getMinutes() < 10) {
                    var curMinutes = '0' + new Date().getMinutes();
                }
                var curTime = (curHours ? curHours : new Date().getHours()) + ':' + (curMinutes ? curMinutes : new Date().getMinutes());
                this.$socket.emit('createMessage', {
                    text: this.text,
                    id: this.$store.state.user.id,
                    sendTime: curTime
                }, data => {
                    if (typeof data === 'string') {
                        console.error(data);
                    }
                    else {
                        this.text = '';
                    }
                })
            }
        }
    }
</script>
