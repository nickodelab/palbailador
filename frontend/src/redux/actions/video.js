
export const VIDEO_ENTITY = '[video]'
export const VIDEO_UPLOAD = `${VIDEO_ENTITY} UPLOAD`
export const VIDEO_UPDATE = `${VIDEO_ENTITY} UPDATE`
export const SET_UPLOADED_VIDEOS = `${VIDEO_ENTITY} SET_UPLOADED_VIDEOS`

export const uploadVideos = (videos) => ({
    type: VIDEO_UPLOAD,
    payload: videos
})

export const updateVideo = (videoData) => ({
    type: VIDEO_UPDATE,
    payload: videoData
})

export const setUploadedVideos = (videos) => ({
    type: SET_UPLOADED_VIDEOS,
    payload: videos
})
