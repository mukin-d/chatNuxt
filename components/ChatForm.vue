<template>
    <v-col cols="11">
        <v-text-field label="Введите сообщение" outlined v-model="text" @keydown.enter="sendMessage"></v-text-field>
    </v-col>
</template>

<script>
    export default {
        data: () => ({
            text: ''
        }),
        methods: {
            sendMessage() {
                this.$socket.emit('createMessage', {
                    text: this.text,
                    id: this.$store.state.user.id
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
