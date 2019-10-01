
import storage from './storage'

// validation todo
// @jsdoc todo
const firebase = {
    

    getVideoURL: file => {
        return new Promise(function (resolve, reject) {
            const id = Date.now()
            const storageRef = storage.ref(`videos/${id}`)
            const task = storageRef.put(file)
            
            return task.on('state_changed',
                undefined,
                ({ message }) => reject(message),
                () => task.snapshot.ref.getDownloadURL()
                        .then(downloadURL => resolve(downloadURL)))
            })
    },

    uploadMultipleFiles(arrVideos) {
        const result = arrVideos.map(async videoFile => {
            const url = await this.getVideoURL(videoFile)
            return { url }
        })

        return Promise.all(result)
    }

}

export default firebase
