import { defineStore } from 'pinia'
import { deleteUser } from '../composable/deleteUser'
import type { User } from '../utils/User.interface'
import { updateUser } from '../../shared/composable/updateUser'
import { collection, addDoc, getDocs, } from 'firebase/firestore'
import { db } from '../composable/firebase'
import { ref } from 'vue'

export const userStore = defineStore('UserStore', {
    state: () => {
        return {
            users: [] as User[],
            isLoading: false,
            url: process.env.VUE_APP_URL,
            // searchValue: ''
        }
    },
    getters: {
        // usersCount(): number {
        // return this.users.length
        // getSearchUser(state){
        //     return this.users.filter((user) => {
        //         return (user.id.toLowerCase().indexOf(this.searchValue.toLowerCase()) != -1)
        //     })
        // }
    },
    actions: {
        // addUser(inputs: User) {
        //     const USER = {
        //         name: inputs.name,
        //         id: inputs.id,
        //         address: inputs.address,
        //         phone: inputs.phone
        //     }
        //     const requestOptions = {
        //         method: 'POST',
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify(USER)
        //     };
        //     fetch(this.url, requestOptions)
        //         .then(async response => {
        //             const data = await response.json();
        //             if (!response.ok) {
        //                 const error = (data && data.message) || response.status;
        //                 return Promise.reject(error);
        //             }
        //             this.users = data
        //         })
        //         .catch(error => {
        //             error.data.message = error;
        //             console.log('There was an error', error)
        //         });
        // },
        async addUser(inputs: User) {
            const colRef = collection(db, 'users')
            const USER = {
                name: inputs.name,
                address: inputs.address,
                phone: inputs.phone,
                id: inputs.id
            }
            const docRef = await addDoc(colRef, USER)
        },
        async getData() {
            this.isLoading = true
            // const res = await fetch(this.url).then(response => response.json())  db.collection("cities").doc("SF")
            // this.users = res
            const resUser: User[] = [];
            const querySnapshot = await getDocs(collection(db, "users",));
            querySnapshot.forEach((res: any) => {
                const tempUser = {
                    name: res.data().name,
                    address: res.data().address,
                    phone: res.data().phone,
                    id: res.data().id,
                    docId: res.id,
                };
                resUser.push(tempUser)
            });
            this.users = resUser
            this.isLoading = false
        },
        // async deleteUser(id:string){
        //     await deleteDoc(doc(db, 'users', id))
        //     this.getData()
        // },
        deleteUser,
        updateUser,
        //     async updateUser(id:string, newName:string){
        //         const userRef = doc(db, 'users', id);
        //         await updateDoc(userRef, {
        //             name: newName
        //     })
        // },
        sortBy(key: string) {
            if (key == 'id') {
                this.users.sort((a, b) => a.id < b.id ? -1 : 1)
            } else if (key == 'name') {
                this.users.sort((a, b) => a.name.localeCompare(b.name))
            }
        },
        // myAction({getters:{}}){
        //     return getters.getSearchUser()
        // }

        searchUsers(user: string) {
            const searchResult = this.users.filter(searchUser => {
                return searchUser.id.toLowerCase().match(user.toLowerCase())
            })
            this.users = searchResult

            if (user == '') {
                this.getData()
            }
        }
    }
})
