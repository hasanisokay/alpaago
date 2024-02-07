const formatDate = (date) => {
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true 
    };

    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    return formattedDate;
};

export default formatDate;