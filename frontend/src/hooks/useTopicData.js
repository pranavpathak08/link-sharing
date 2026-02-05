import { useState, useEffect } from 'react';
import { topicAPI, resourceAPI } from '../services/api';
import toast from 'react-hot-toast';

export const useTopicData = (topicId) => {
    const [topic, setTopic] = useState(null);
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [posting, setPosting] = useState(false);
    const [error, setError] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const fetchTopicData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch topic details
            const topicRes = await topicAPI.getTopicDetails(topicId);
            setTopic(topicRes.data.topic);
            setIsSubscribed(topicRes.data.isSubscribed);

            // Fetch resources for this topic
            const resourcesRes = await resourceAPI.getTopicResources(topicId, { 
                page: 1, 
                limit: 50 
            });
            setResources(resourcesRes.data.resources || []);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching topic data:', error);
            const errorMessage = error.response?.data?.message || 'Failed to load topic';
            setError(errorMessage);
            setLoading(false);
            
            if (error.response?.status === 404) {
                toast.error('Topic not found');
            } else if (error.response?.status === 403) {
                toast.error('You do not have access to this topic');
            }
        }
    };

    const handleCreatePost = async (formData) => {
        try {
            setPosting(true);
            await resourceAPI.addResource(topicId, formData);
            toast.success('Post created successfully!');
            await fetchTopicData(); // Refresh resources
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error(error.response?.data?.message || 'Failed to create post');
            throw error;
        } finally {
            setPosting(false);
        }
    };

    const handleToggleReadStatus = async (resourceId) => {
        try {
            await resourceAPI.toggleReadStatus(resourceId);
            
            // Update the resource in state
            setResources(prev => prev.map(resource => 
                resource._id === resourceId 
                    ? { ...resource, isRead: !resource.isRead }
                    : resource
            ));
            
            toast.success('Read status updated');
        } catch (error) {
            console.error('Error toggling read status:', error);
            toast.error('Failed to update read status');
        }
    };

    const handleDownloadDocument = async (resourceId) => {
        try {
            const response = await resourceAPI.downloadDocument(resourceId);
            
            // Create blob and download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `document-${resourceId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            
            toast.success('Download started');
        } catch (error) {
            console.error('Error downloading document:', error);
            toast.error('Failed to download document');
        }
    };

    useEffect(() => {
        if (topicId) {
            fetchTopicData();
        }
    }, [topicId]);

    return {
        topic,
        resources,
        loading,
        posting,
        error,
        isSubscribed,
        handleCreatePost,
        handleToggleReadStatus,
        handleDownloadDocument,
        refreshData: fetchTopicData
    };
};