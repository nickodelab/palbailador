
import storage from './storage'

const firebase = {
    
    getVideoURL: file => new Promise(function (resolve, reject) {
        const id = Date.now()
        const storageRef = storage.ref(`videos/${id}`)
        const task = storageRef.put(file)
        
        return task.on('state_changed',
            undefined,
            (error) => reject('error uploading the image...'),
            () => task.snapshot.ref.getDownloadURL()
                    .then(downloadURL => resolve(downloadURL)))
        })
}

export default firebase
