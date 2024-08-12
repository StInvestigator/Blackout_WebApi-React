import {axiosClient} from "./axiosClient";


export const api = {

    auth: {
        /**
         *
         * @param {{
         *   "email":String,
         *   "password": String
         * }} data
         * @returns {Promise<{token: string}>}
         */
        async register(data) {
            return await axiosClient.post("/api/v1/auth/register", data)
                .then(response => {
                    return response.data.data
                }).catch(err => {
                    console.log(err.response)
                    throw err.response
                })
        },

        /**
         *
         * @param {{
         *   "email":String,
         *   "password": String
         * }} data
         * @returns {Promise<{token: string}>}
         */
        async login(data) {
            return await axiosClient.post("/api/v1/auth/login", data)
                .then(response => {
                    return response.data.data
                }).catch(err => {
                    console.log(err.response)
                    throw err.response
                })
        },


    },

    groups: {
        async schedule() {
            return await axiosClient.get("/api/v1/groups/list")
                .then(response => {
                    return response.data.data
                }).catch(err => {
                    console.log(err.response.data.message)
                    throw err.response
                })
        },
    }
}