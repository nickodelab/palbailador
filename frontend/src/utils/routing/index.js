
import routes from './routes'
import validate from '../validate'

const routing = { 
    routes, 

    /** 
     * 
     * @returns {Array} - routes 
    */ 
    getRoutes () {
        return this.routes 
    }

}

export default routing
