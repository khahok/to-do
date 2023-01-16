<template>
    <div class="vue-modal">
        <div class="vue-modal-inner">
            <div class="vue-modal-content">
                <slot></slot>
                <label>{{ $t('message.NewName') }}</label>
                <input type="text" v-model="upUser.name" class="inputNew">
                <label>{{ $t('message.NewAddress') }}</label>
                <input type="text" v-model="upUser.address" class="inputNew">
                <label>{{ $t('message.NewPhone') }}</label>
                <input type="text" v-model="upUser.phone" class="inputNew">
                <button type="button" @click="updateUser(upUser)" class="submit"> {{ $t('message.Submit') }}</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { userStore } from '@/shared/store/UserStore';
import { User } from '@/shared/utils/User.interface'; 
import { ref, reactive } from 'vue';

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})
const emit = defineEmits(['close', 'submit'])
const UserStore = userStore()

const upUser = reactive({ name: '', address: '', phone: '', id: '', docId: '' })
const updateUser = (upUser: User) => {
    if (upUser.name && upUser.address && upUser.phone != '') {
        UserStore.updateUser(props.id, upUser)
        UserStore.getData()
        emit('submit')
        emit('close')
    } else {
        alert('This can not be upating' + ' . ' + 'Please fill all informations')
        emit('close')
    }
}
</script>

<style scoped>
::before::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.vue-modal {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 1;
    background-color: rgb(0, 0, 0, 0.4);
}

.vue-modal-inner {
    max-width: 500px;
    margin: 10rem auto;
    display: block;
}

.vue-modal-content {
    position: relative;
    background-color: rgb(126, 134, 151);
    border: 1px solide rgb(0, 0, 0, 0.3);
    padding: 7rem;
    background-clip: border-box;
    border-radius: 0.3rem;

}

.close {
    float: right;
    margin-top: 60px;
    border-radius: 3px;
    font-weight: bold;
}

.close:hover {
    background: red
}

.submit {
    float: right;
    margin-top: 60px;
    border-radius: 3px;
    font-weight: bold;
}

.submit:hover {
    background: yellow;
}

.inputNew {
    margin-left: 42px;
    width: 230px;
}

label {
    font-weight: bold;
    float: left;
    margin-top: 10px;
    margin-left: 43px;
}
</style>