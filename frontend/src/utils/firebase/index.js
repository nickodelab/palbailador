

import storage from './storage'

const firebase = {
    
    getVideoURL: file => new Promise(function (resolve, reject) {
        const id = Date.now()
        const storageRef = storage.ref(`videos/${id}`)
        const task = storageRef.put(file)

        // resolve('https://www.youtube.com/watch?v=OygCyVjNo9I' + `${Math.random()}`)

        return task.on('state_changed',
            snapshot => {
            },
            (error) => { 
                reject('error uploading the image...')
            },

            () => {
                return task.snapshot.ref.getDownloadURL()
                    .then(downloadURL => {
                        resolve(downloadURL)
                    })
            })
        })
}

export default firebase
