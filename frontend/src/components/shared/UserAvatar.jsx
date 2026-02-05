const UserAvatar = ({ firstName, lastName, size = 'medium', className = '' }) => {
    const getInitials = (firstName, lastName) => {
        return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
    };

    const sizeClass = size === 'small' ? 'small' : '';

    return (
        <div className={`user-avatar ${className}`}>
            <div className={`avatar-circle ${sizeClass}`}>
                {getInitials(firstName, lastName)}
            </div>
        </div>
    );
};

export default UserAvatar;