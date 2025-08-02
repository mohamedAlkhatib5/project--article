export const fetchBlogById = async(id, headers = {}) => {
    if (!id) throw new Error("ID is required");

    const response = await fetch(`https://tamkeen-dev.com/api/node/${id}?_format=json`, {
        headers,
    });

    if (!response.ok) {
        throw new Error('Failed to fetch article');
    }

    const data = await response.json(); 
    return  data;
};