<template>
    <div>
        <div v-if="name === 'admin'" class="system">
            <p class="text_system_message">{{text}}</p>
            <hr>
        </div>
        <div v-else class="msg_wrapper">
            <div class="msg_item" :class="{owner}">
                <small>
                    <strong>{{name}}</strong>
                </small>
                <p class="msg_item_text">{{text}}</p>
                <small :class="{owner}" class="msg_time">sendMessageTime</small>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            name: String,
            text: String,
            owner: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped>
    .system {
        margin-bottom: 1rem;
    }

    .text_system_message {
        text-align: center;
    }

    .msg_wrapper {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
    }

    .msg_item {
        padding: 0.5rem 1rem 0 1rem;
        max-width: 60%;
        min-width: 10%;
        margin: 0 1rem;
        box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
        border-radius: 4px;
        background: #1976d2;
        position: relative;
        word-break: break-all;
    }

    .msg_item_text {
        margin-bottom: 0;
    }

    .owner {
        background: #ffffff;
        color: #000000;
        align-self: flex-end;
    }

</style>
