export const API_ENTIY = '[API]';
export const REQUEST = `${API_ENTIY} REQUEST`;
export const SUCCESS = `${API_ENTIY} SUCCESS`;

export const apiRequest = (body, method, actionName) => ({
    type: `${actionName} - ${REQUEST}`,
    payload: {
        data: body,
        meta: { method, actionName },
    },
});

export const apiSuccess = (payload, actionName) => ({
    type: `${actionName} - ${SUCCESS}`,
    payload,
});
