export const VIDEOS_ENTITY = '[VIDEOS]';

export const UPLOAD_VIDEOS = `${VIDEOS_ENTITY} UPLOAD_VIDEOS`;
export const SET_UPLOAD_VIDEOS = `${VIDEOS_ENTITY} SET_UPLOAD_VIDEOS`;
export const UPDATE_VIDEO = `${VIDEOS_ENTITY} UPDATE_VIDEO`;

export const uploadVideos = videos => ({
    type: UPLOAD_VIDEOS,
    payload: videos,
});

export const setUploadedVideos = videos => ({
    type: SET_UPLOAD_VIDEOS,
    payload: videos,
});

export const updateVideo = (videoUpdates) => ({
    type: UPDATE_VIDEO,
    payload: videoUpdates,
});
