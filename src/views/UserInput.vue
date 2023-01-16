<template>
    <form name="f">
        <div class="mb-3">
            <div class="form-label1">{{ $t('message.Name') }}</div>
            <input type="text" class="input" required v-model="inputs.name">
        </div>
        <div class="mb-3">
            <div class="form-label2">{{ $t('message.Address') }}</div>
            <input type="text" class="input" required v-model="inputs.address">
        </div>
        <div class="mb-3">
            <div class="form-label3">{{ $t('message.Phone') }}</div>
            <input type="text" class="input" required v-model="inputs.phone">
        </div>
        <div class="mb-3">
            <div class="form-label4">{{ $t('message.ID') }}</div>
            <input type="text" class="input" required v-model="inputs.id">
        </div>
    </form>
    <button @click="submitForm()" class="btn">{{ $t('message.ADD') }}</button>
</template>
<script setup lang="ts">
import { userStore } from '../shared/store/UserStore'
import { reactive } from 'vue'
const UserStore = userStore()
const inputs = reactive({ name: '', id: '', address: '', phone: '', docId: '' })

const submitForm = () => {
    if (inputs.name && inputs.id != '') {
        UserStore.addUser(inputs)
    } else {
        alert('Please fill all informations')
    }
    inputs.name = ''
    inputs.address = ''
    inputs.phone = ''
    inputs.id = ''
}
</script>
<style>
.mb-3 {
    display: inline;
}

.form-label1 {
    margin-right: 460px;
    font-size: 20px;
    margin-top: 40px;
    margin-bottom: -25px;
}

.form-label2 {
    margin-right: 470px;
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: -25px;
}

.form-label3 {
    margin-right: 470px;
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: -25px;
}

.form-label4 {
    margin-right: 475px;
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: -25px;
}

.btn {
    margin: 20px;
    margin-right:-280px;
    font-size: 18px;
    border-radius: 5px;
}
.btn:hover{
    background: lightcyan;
}

.input {
    font-size: 20px;
    width: 350px;
}
</style>
