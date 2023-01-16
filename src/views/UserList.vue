<template>
    <h1>{{ $t('message.UserList') }}</h1>
    <select @change="sortUser">
        <option value="id">Sorted by ID</option>
        <option value="name">Sorted by Name</option>
    </select>
    <div class="search">
        <input type="text" placeholder="Search id..." v-model="searchValue" v-on:keyup="searchUser(searchValue)">
    </div>
    <LoadingModal v-if="UserStore.isLoading == true" />
    <Suspense>
        <template #default>
            <TransitionGroup name="list" style="list-style-type: none" tag="ul">
                <li v-for="user in UserStore.users" :key="user.id">
                    <div class="col">
                        <div>
                            {{ $t('message.Name') }}:{{ user.name }} {{ $t('message.Address') }}:{{ user.address }}
                            {{ $t('message.Phone') }}:{{ user.phone }} {{ $t('message.ID') }}:{{ user.id }}
                        </div>
                        <div class="d-flex">
                            <button @click="() => { update = true; updateId = user.docId }"
                                class="button btn-blue">Update</button>
                            <button @click="deleteUser(user.docId)" class="button btn-red">Delete</button>
                        </div>
                    </div>
                </li>
            </TransitionGroup>
        </template>
        <template #fallback>
            <p>loading data....</p>
        </template>
    </Suspense>
    <br>
    <Popup :id="updateId" @close="update = !update" v-if="update" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { userStore } from '../shared/store/UserStore'
import Popup from '../views/Popup.vue'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent } from 'vue'
import { onMounted, computed } from 'vue'

const UserStore = userStore()
const LoadingModal = defineAsyncComponent(() => import('../views/Modal.vue'))

const isLoading = storeToRefs(UserStore)

UserStore.getData()

const deleteUser = (id: string) => {
    const result = confirm('Are you sure want to delete this user?')
    if (result == true) {
        // UserStore.users = UserStore.users.filter((user) => user.id !== id)
        UserStore.deleteUser(id)
        // UserStore.isLoading = true
        // setTimeout(() => (UserStore.isLoading = false), 1000);
    } else {
        UserStore.getData()
    }
}
const update = ref(false)
const updateId = ref()
const findUsers = ref(UserStore.users)

const sortUser = (event: Event) => {
    const target = event.target as HTMLInputElement;
    UserStore.sortBy(target.value)
}
const searchValue = ref('')
const searchUser = (user: string) => {
    UserStore.searchUsers(user)
}
</script>
<style>
.col {
    word-spacing: 14px;
    border: 2px solid;
    padding: 10px;
    border-left: -30px;
    border-right: -50px;
    padding-top: 5px;
    border-bottom: 3px solid;
    margin: 0 auto;
    display: flex;
    font-size: 15px;
    width: 700px;
    padding-bottom: 3px;
    justify-content: space-between;
    text-align: justify;
}

.button {
    min-width: 60px;
    margin-left: 5px;
    border: none;
    border-radius: 5px;
}

.btn-red {
    background-color: rgb(223, 4, 4);
    color: black;
    font-weight: bold;
}

.btn-blue {
    background-color: rgb(33, 111, 138);
    font-weight: bold;
    color: white;
}

.d-flex {
    display: flex;
}

.sorted {
    margin: 10px;
    padding: 3px;
    margin-top: 2px;
    background: yellow;
    font-style: italic;
}

.list-move,
.list-enter-active,
.list-leave-active {
    /* transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1); */
    transition: all 1s cubic-bezier(0.5, 0.1, 0.165, 1);
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(-2rem);
}

.list-leave-active {
    display: none;
}

.search {
    float: right;
    margin-top: -60px;
    margin-right: 20px;
}
</style>
<!-- margin-bottom: 15px;
margin-right: 92%;
padding: 5px; -->