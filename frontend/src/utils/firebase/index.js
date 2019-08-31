
import storage from './storage'

const firebase = {
    
    getVideoURL: file => new Promise(function (resolve, reject) {
        const id = Date.now()
        const storageRef = storage.ref(`videos/${id}`)
        const task = storageRef.put(file)

        // return resolve(`https://firebasestorage.googleapis.com/v0/b/laclave-salsa.appspot.com/o/videos%2F1567249612040?alt=media&token=ab39475c-484c-442c-b9d0-98010a010dc4`)

        return task.on('state_changed',
            undefined,
            (error) => reject('error uploading the image...'),
            () => task.snapshot.ref.getDownloadURL()
                    .then(downloadURL => resolve(downloadURL)))
        })
}

export default firebase
