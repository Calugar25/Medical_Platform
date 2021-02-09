import {HOST} from '../hosts';
import {debug} from '../defs'
import axios from 'axios'
const LOG_URL="http://localhost:8080/login";


class CrudApi{
    constructor(resourceUri) {
        this.baseApiUrl = HOST.backend_api + '/' + resourceUri
        this.client = axios.create({
            baseURL: this.baseApiUrl,
            //timeout: 1000,
            headers: {'Accept': 'application/hal+json'}
        })
        this.jwtToken = window.localStorage.getItem("jwtToken")
        if (!(this.jwtToken === undefined) && !(this.jwtToken === null)) {
            this.jwtToken = JSON.parse(this.jwtToken)
        }
        this.specialClient = axios.create({
            baseURL: HOST.backend_api,
            //timeout: 1000,
            headers: {
                'accept': 'application/hal+json',
                'authorization': this.jwtToken
            }
        })

    }     


    async checkLogin(username, password) {
        return await this.client({method: 'post', url:'/login', 
            data: {
                username: username,
                password: password
            }
        })
        .then(
            res => {
                if (debug) console.log('Checked login username, password, res: ', username, password,res.data)
                return res
            },
            err => {
                if (debug) console.log('Error checking login username, password, error:', username, password, err)
                return "wrong"
            }
        )
    }

    async checkLogin2(username, password) {
        return await this.specialClient({method: 'post', url:'/login', 
            data: {
                username: username,
                password: password
            }
        })
        .then(
            res => {
                if (debug) console.log('Checked login username, password, res: ', username, password,res)
                return res
            },
            err => {
                if (debug) console.log('Error checking login username, password, error:', username, password, err)
                return "wrong"
            }
        )
    }

    async readAll(pageSize) {
        return await this.client({params: {size: pageSize}})
        .then((res) => {
            if (debug) {
                console.log("Resp reading all objects: ", res)
            }
            return res.data._embedded[Object.keys(res.data._embedded)[0]]
        })
    }

    async read(object) {
        console.log("xcv"+object)
        return await this.client({method: 'get', url: object._links.self.href})
        .then((res) => {
            if (debug) {
                console.log("Resp reading object: ", object , res)
            }
            return res.data
        })
    }

    async readSubresources(object, subresourceName) {
        console.log("cc"+object._links.self.href, subresourceName)
        return await this.client({method: 'get', url: object._links[subresourceName].href})
        .then((res) => {
            if (debug) {
                console.log("Resp getting  subresources: ", object, subresourceName, res)
            }
            return res.data._embedded[Object.keys(res.data._embedded)[0]]
        })
    }
    

    async delete(object) {
        
        return await this.client({method: 'delete', url: object._links.self.href})
        .then((res) => {
            if (debug) {
                console.log("Resp  deleting object: ", object, res)
            }
            return res
        })
    }
    async getUser(authorization)
    {  // this.jwtToken=authorization
        this.specialClient=axios.create({
            baseURL: HOST.backend_api,
            //timeout: 1000,
            headers: {
                'accept': 'application/hal+json',
                'authorization': authorization
            }
        })
        console.log("asta e actualy token",authorization)
        return await this.specialClient({method:'get',url:'/getUser'
            
        })
        .then((res)=>{
            if(debug) console.log("asta e raspunsu ",res.data)
            return res
        })
    }

    async create(object) {
        return await this.client({
            method: 'post', 
            data: object
          })
        .then((res) => {
            if (debug) {
                console.log("Resp  creating object: ", object, res)
            }
            return res.data
        })
    }

    async update(object) { 
        return await this.client({method: 'put', 
            url: object._links.self.href,
            data: object
          })
        .then((res) => {
            if (debug) {
                console.log("Resp  updating object: ", object, res)
            }
            return res.data
        })
    }

    async readSubresources(object, subresourceName) {
        
        return await this.client({method: 'get', url: object._links[subresourceName].href})
        .then((res) => {
          
            if (debug) {
             
                console.log("Resp getting object subresources: ", object, subresourceName, res)
               
            }
            return res.data._embedded[Object.keys(res.data._embedded)[0]]
        })
    }

    async addSubresource(object, subresource) { 
        let srLink = subresource._links.self.href.split('/')
        let srName = srLink[srLink.length - 2]
        return await this.client({method: 'post', 
            url: object._links[srName].href,
            data:  {
                _links: {
                    self: {
                        href: subresource._links.self.href
                    }
                }
            }
          })
        .then((res) => {
            if (debug) {
                console.log("Response for adding subresource to object: ", subresource, object,res)
            }
            return res.data
        })
    }

    async addSubresourceMedPlan(object, subresource) { 
        console.log("this is the subresource and the object ",object,subresource)
        let srLink = subresource._links.self.href.split('/')
        let srName = srLink[srLink.length - 2]
        let str=object._links[srName.substring(0,srName.length-1)].href
        
        return await this.client({method: 'post', 
            url: str,
            data:  {
                _links: {
                    self: {
                        href: subresource._links.self.href
                    }
                }
            }
          })
        .then((res) => {
            if (debug) {
                console.log("Resp adding subresource to object: ", subresource, object,res)
            }
            return res.data
        })
    }

    async deleteSubresource(object, subresource) {
        let srLink = subresource._links.self.href.split('/')
        let srId = srLink[srLink.length - 1]
        let srName = srLink[srLink.length - 2]
        return await this.client({
            method: 'delete', 
            url: object._links.self.href + '/' + srName + '/' + srId
        })
        .then((res) => {
            if (debug) {
                console.log("Resp deleting subresource of object: ", subresource, object, res)
            }
            return res
        })
    }
}

export default CrudApi