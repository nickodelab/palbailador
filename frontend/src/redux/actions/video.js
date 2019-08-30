
export const VIDEO_ENTITY = '[video]'

export const VIDEO_UPLOAD = `${VIDEO_ENTITY} UPLOAD`

export const uploadVideo = (video) => ({
    type: VIDEO_UPLOAD,
    payload: video
})
