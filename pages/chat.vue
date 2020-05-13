<template>
    <div class="chat_wrapper">
        <div class="chat_content" ref="block">
            <Message
                v-for="m in messages" :key="messages[m+1]"
                :name="m.name"
                :text="m.text"
                :owner="m.id === user.id"
            />
        </div>
        <div class="chat_form">
            <ChatForm />
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Message from '@/components/Message'
    import ChatForm from '@/components/ChatForm'
    export default {
        middleware: ['chat'],
        head() {
            return {
                title: `Комната ${this.user.room}`,
                titleTemplate: ''
            }
        },
        components: { Message, ChatForm },
        computed: mapState(['user', 'messages']),
        watch: {
            messages() {
                this.$nextTick(() => {
                    if (undefined !== this.$refs.block) {
                        this.$refs.block.scrollTop = this.$refs.block.scrollHeight;
                    }
                })
            }
        }
    }
</script>

<style scoped>

    .chat_wrapper {
        height: 100%;
        overflow:hidden;
        position: relative;
    }

    .chat_form {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1rem;
        height: 90px;
        background: #212121;
    }

    .chat_content {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 90px;
        padding: 1rem;
        overflow-x: hidden;
        overflow-y: auto;
    }

</style>
