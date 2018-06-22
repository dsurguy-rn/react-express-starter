import apiConfig from './apiConfig'
import endpoints from './endpoints'

const updateHeaders = new Headers({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Accept-Charset' : 'utf-8'
})

const getHeaders = new Headers({
  'Accept': 'application/json',
  'Accept-Charset' : 'utf-8'
})

class APIService{
  constructor(){
    this.config = {
      mock: false
    };
    this.endpoints = endpoints;
  }

  _mergeHeaders(base, incoming){
    let headerObject = {};
    try{
      for (var pair of base.entries()) {
        headerObject[pair[0]] = pair[1];
      }
    }
    catch (e) {
      for( var prop in base ){
        headerObject[prop] = base[prop];
      }
    }
  
    try{
      for (var pair of incoming.entries()) {
        headerObject[pair[0]] = pair[1];
      }
    }
    catch (e) {
      for( var prop in incoming ){
        headerObject[prop] = incoming[prop];
      }
    }
  
    return new Headers(headerObject)
  }

  _transformEndpoint(endpoint){
    let parts = endpoint.split('.')
    let fullUrl = parts.reduce((state, part) => {
      if( state === undefined ) return undefined
      if( state.currentPath[part] === undefined ) return undefined
      if( typeof state.currentPath[part] == 'string' ){
        state.builtUrl += state.currentPath[part]
        state.currentPath = {} //no children if it's a string. If there are more parts, this is malformed and should fail
        return state
      }
      if( state.currentPath[part]._base ) state.builtUrl += state.currentPath[part]._base
      state.currentPath = state.currentPath[part]
      return state
    }, {
      builtUrl: '',
      currentPath: apiConfig,
      notFound: false
    })
  
    //return the URL we've built, or the original endpoint
    return fullUrl ? fullUrl.builtUrl : endpoint
  }

  _transformResponseBody(response) {
    let transformedBody;
    switch(response.headers.get('Content-Type')){
      case 'application/json':
      default: 
        transformedBody = response.json()
    }
    return transformedBody.then((tBody)=>{
      response.transformedBody = tBody
      return response
    })
  }

  _apiCall(request, fetchConfig){
    let actualRequest = request
    if( typeof actualRequest == 'string' ){
      actualRequest = this._transformEndpoint(actualRequest)
    }
    
    return fetch(actualRequest, fetchConfig)
    .then(this._transformResponseBody)
    .then((response) => {
      if( response.ok ){
        return response.transformedBody
      }
      return Promise.reject(response.transformedBody)
    })
  }

  rawApiCall(request, fetchConfig){
    return fetch(request, fetchConfig);
  }

  get (request, fetchConfig){
    fetchConfig = fetchConfig || {};
    fetchConfig.method = 'GET'
    fetchConfig.headers = this._mergeHeaders(getHeaders, fetchConfig.headers)
    fetchConfig.credentials = 'same-origin'
    return this._apiCall(request, fetchConfig)
  }
  post (request, fetchConfig){
    fetchConfig = fetchConfig || {};
    fetchConfig.method = 'POST'
    fetchConfig.headers = this._mergeHeaders(updateHeaders, fetchConfig.headers)
    fetchConfig.credentials = 'same-origin'
    return this._apiCall(request, fetchConfig)
  }
  put (request, fetchConfig){
    fetchConfig = fetchConfig || {};
    fetchConfig.method = 'PUT'
    fetchConfig.headers = this._mergeHeaders(updateHeaders, fetchConfig.headers)
    fetchConfig.credentials = 'same-origin'
    return this._apiCall(request, fetchConfig)
  }
  delete (request, fetchConfig){
    fetchConfig = fetchConfig || {};
    fetchConfig.method = 'DELETE'
    fetchConfig.headers = this._mergeHeaders(updateHeaders, fetchConfig.headers)
    fetchConfig.credentials = 'same-origin'
    return this._apiCall(request, fetchConfig)
  }
}

const apiServiceInstance = new APIService();
export default apiServiceInstance;