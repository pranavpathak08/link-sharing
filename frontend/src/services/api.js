import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

//Interceptors to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

//Interceptors to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login'
        }
        return Promise.reject(error);
    }
)

//Auth APIs
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
    resetPassword: (token, password) => api.post(`/auth/reset-password/${ token }`, { password }),
    deactivateAccount: () => api.post('/auth/deactivate'),
    reactivateAccount: (data) => api.post('/auth/reactivate', data),
}


//Topic APIs
export const topicAPI = {
    //creating a topic
    createTopic: (data) => api.post('/topics', data),

    //subscribing to a topic
    subscribeToTopic: (topicId, data) => api.post(`/topics/${ topicId }/subscribe`, data),

    //Update seriousness level
    updateSeriousness: (topicId, data) => api.patch(`/topics/${ topicId }/seriousness`, data),

    //Send invite to a topic
    inviteToTopic: (topicId, data) => api.post(`/topics/${ topicId }/invite`, data),

    //Respond to invite
    respondToInvite: (inviteId, data) => api.post(`/topics/invites/${ inviteId }/respond`, data),

    //Browse all public topics
    browseAllPublicTopics: (params) => api.get('/topics/public', { params }),

    // Get user's subscribed topics
    getMyTopics: () => api.get('/topics/my-topics'),

    //Get user's subscribed topics
    getTrendingTopics: (limit = 5) => api.get('/topics/trending', { params: { limit } }),

    //Get topic details
    getTopicDetails: (topicId) => api.get(`/topics/${ topicId }`),
    
    //Get pending invites
    getMyInvites: () => api.get(`/topics/invites/pending`),

    //Delete a topic
    deleteTopic: (topicId) => api.delete(`/topics/${topicId}`)
    
}

export const resourceAPI = {
    addResource: (topicId, formData) => {
        return api.post(`/topics/${ topicId }/resources`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    //Get all resources for a topic
    getTopicResources: (topicId, params) => api.get(`/topics/${ topicId }/resources`, { params }),
    
    //Get a specific resource
    getResource: (resourceId) => api.get(`/resources/${ resourceId }`),
    
    downloadDocument: (resourceId) => api.get(`/resources/${ resourceId }/download`, {
        responseType: 'blob'
    }),

    //Update a resource
    updateResource: (resourceId, data) => api.patch(`/resources/${ resourceId }`, data),

    //Delete resource
    deleteResource: (resourceId) => api.delete(`/resources/${ resourceId }`),
    
    //Toggle read status
    toggleReadStatus: (resourceId) => api.post(`/resources/${ resourceId }/read`),
    
    //Rate a resource
    rateResource: (resourceId, data) => api.post(`/resources/${resourceId}/rate`, data)
}

export default api;