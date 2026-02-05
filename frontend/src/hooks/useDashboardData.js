import { useState, useEffect } from 'react';
import { topicAPI, resourceAPI } from '../services/api';
import toast from 'react-hot-toast';

export const useDashboardData = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [trendingTopics, setTrendingTopics] = useState([]);
    const [readingItems, setReadingItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch user's subscribed topics
            const subscriptionsRes = await topicAPI.getMyTopics();
            setSubscriptions(subscriptionsRes.data.subscriptions || []);

            // Fetch trending topics
            const trendingRes = await topicAPI.getTrendingTopics(10);
            setTrendingTopics(trendingRes.data.topics || []);

            // Fetch reading items from all subscribed topics
            await fetchReadingItems(subscriptionsRes.data.subscriptions);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setError('Failed to load dashboard data. Please try again.');
            setLoading(false);
        }
    };

    const fetchReadingItems = async (subs) => {
        try {
            if (!subs || subs.length === 0) {
                setReadingItems([]);
                return;
            }

            // Fetch resources from all subscribed topics
            const resourcePromises = subs.map(sub => 
                resourceAPI.getTopicResources(sub.topic._id, { page: 1, limit: 5 })
                    .catch(err => {
                        console.error(`Error fetching resources for topic ${sub.topic._id}:`, err);
                        return { data: { resources: [] } };
                    })
            );

            const resourceResponses = await Promise.all(resourcePromises);
            
            // Combine and sort all resources by date
            const allResources = resourceResponses
                .flatMap(res => res.data.resources || [])
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 20); // Limit to 20 most recent items

            setReadingItems(allResources);
        } catch (error) {
            console.error('Error fetching reading items:', error);
        }
    };

    const handleToggleReadStatus = async (resourceId) => {
        try {
            await resourceAPI.toggleReadStatus(resourceId);
            
            // Update the reading item in state
            setReadingItems(prev => prev.map(item => 
                item._id === resourceId 
                    ? { ...item, isRead: !item.isRead }
                    : item
            ));
            
            toast.success('Read status updated');
        } catch (error) {
            console.error('Error toggling read status:', error);
            toast.error('Failed to update read status');
        }
    };

    const refreshData = () => {
        fetchDashboardData();
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return {
        subscriptions,
        trendingTopics,
        readingItems,
        loading,
        error,
        handleToggleReadStatus,
        refreshData
    };
};