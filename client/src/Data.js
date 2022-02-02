import config from './config';

let id= [];

export default class Data {
  
  api(path, method= 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      body,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    
    // Check if auth is required
    if(requiresAuth){
      const encodedCredentials = btoa(`${credentials.emailAddress }:${credentials.password}`); // creates a base-64 encoded ASCII string
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  // retrieves user from API 
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, {emailAddress, password});
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
     
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  // posts new user
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  // retrieves courses from API 
  async getCourses () {
    const response = await this.api('/courses', 'GET', null)
    if(response.status === 200) {
        return response.json().then(data => data)
    } else if (response.status === 401 ) {
      
      return response.status
      
    } else {
        throw new Error();
    }
  }

  // retrieves individual course from API 
  async getCourse (id) {
    const response = await this.api(`/courses/${id}`, 'GET', null)
    if(response.status === 200) {
        return response.json().then(data => data)
    } else if (response.status === 404 ) {
        return response.status
    } else {
        throw new Error();
    }
  }

  // posts new course
  async createCourse (course, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'POST',course, true, { emailAddress, password })
    if(response.status === 201) {
        return [];
    } else if (response.status === 400) {
      return  response.json().then(data => {
            return data.errors;
        });
    } else {
          throw new Error();
    }
  }

  // updates course data to API 
  async updateCourse (course, id, emailAddress, password){
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, { emailAddress, password })
    if(response.status === 204){
        return [];
    } else if (response.status === 400){
      return  response.json().then(data => {
            return data.errors;
        });
    } else {
        throw new Error();
    }
  }

  // deletes course
  async deleteCourse ( id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { emailAddress, password })
    if(response.status === 204) {
        return [];
    } else if(response.status === 403) {
        response.json().then(data => {
            return data.errors;
        });
    } else {
        throw new Error(); 
    }
  }

}