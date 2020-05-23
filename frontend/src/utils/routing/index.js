
import routes from './routes'

const routing = {
    __routes: routes,

    /**
     * get all routes in the App
     */
    getRoutes() {
        return this.__routes
    },

	/**
	 * get a path by route name
	 *
	 * @param {String} routeName
	 * @throws {TypeError} - if routeName is not a string
	 * @returns {String} - the routes path
	 */
    getPathByRouteName(routeName) {
        if (typeof routeName !== 'string') throw TypeError(`routeName is not a string`)

        console.log('this.__routes', this.__routes)
        const route = this.__routes.find(({ name }) => name === routeName)
        if (!route) throw Error(`${routeName} not exists`)
        return route.path
    },

    // /**
    //  * 
    //  * @param {*} routeKey 
    //  * @param {*} params  - { selectedEventId: '123' }
    //  */
    // buildPathWithParams(routeKey, params) {

    //     const { path } = this.getRouteByKey(routeKey)
    //     let newPath = path
    //     for (const paramField in params) {
    //         newPath = newPath.replace(`:${paramField}`, params[paramField])
    //     }

    //     return newPath
    // },

    // /**
    //  * get the routes corresponding each key inside childrens
    //  *
    //  * @param {Array} keysArray - array of strings/keys representing the direct children
    //  * @throws {TypeError} - if children is not an array
    //  * @return {Array} - array of routes/objects
    //  */
    // getRoutesByKeysArray(keysArray) {
    //     if (keysArray.constructor !== Array) throw TypeError(`keysArray is not an array`)

    //     return keysArray.map(childrenKey => this.getRouteByKey(childrenKey))
    // }
}

export default routing
