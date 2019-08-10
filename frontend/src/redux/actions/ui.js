export const UI_ENTITY = '[ui]'

export const SET_LOADER = `SET_LOADER`
export const SET_MENU_OPEN = `${UI_ENTITY} SET_MENU_OPEN`

export const setLoader = (state) => ({
    type: SET_LOADER,
    payload: {
        data: state
    }
})

export const setMenuCollapse = collapse => ({
    type: SET_MENU_OPEN,
    payload: collapse
})