// ****************fetchBlogs***************
const fetchUserBlogs = async(getBasicAuthHeader) => {
    const response = await fetch('https://tamkeen-dev.com/api/blogs-api-current-user', {
        method: 'GET',
        headers: {
            Authorization: getBasicAuthHeader(),
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) throw new Error(`${response.status }: ${response.statusText }`);
    return await response.json();
};
// ****************fetchtag***************
const fetchTags = async() => {
    const response = await fetch("https://tamkeen-dev.com/api/terms/tags", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) throw new Error("Failed to fetch tags");
    return await response.json();
};

// ****************fetch img***************
const uploadSingleImage = async(file, csrfToken, getBasicAuthHeader) => {
    if (!file || !file.name || file.size === 0) {
        throw new Error('Invalid file input');
    }

    const response = await fetch('https://tamkeen-dev.com/api/file/upload/node/blog/field_image?_format=json', {
        method: 'POST',
        headers: {
            'Authorization': getBasicAuthHeader(),
            'Content-Type': 'application/octet-stream',
            'X-CSRF-Token': csrfToken,
            'Content-Disposition': `file; filename="${file.name}"`
        },
        body: file,
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Upload failed:', errorText);
        throw new Error(`Failed to upload image: ${response.status }${response.statusText }`);
    }

    return await response.json();
};


const uploadGalleryImages = async(files, csrfToken, getBasicAuthHeader) => {
    const uploaded = [];

    for (const file of files) {
        const response = await fetch('https://tamkeen-dev.com/api/file/upload/node/blog/field_gallery?_format=json', {
            method: 'POST',
            headers: {
                'Authorization': getBasicAuthHeader(),
                'Content-Type': 'application/octet-stream',
                'X-CSRF-Token': csrfToken,
                'Content-Disposition': `file; filename="${file.name}"`
            },
            body: file,
        });

        if (!response.ok) throw new Error(`
                    Failed to upload image $ { file.name }
                    `);
        const result = await response.json();
        uploaded.push({ target_id: result.fid[0].value });
    }

    return uploaded;
};


// ****************Creatarticle***************
const createArticle = async(data, csrfToken, getBasicAuthHeader) => {
    const response = await fetch('https://tamkeen-dev.com/api/node?_format=json', {
        method: 'POST',
        headers: {
            'Authorization': getBasicAuthHeader(),
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Failed to create article');
    return await response.json();
};

const updateArticle = async(id, data, csrfToken, getBasicAuthHeader) => {
    const response = await fetch(`
                    https://tamkeen-dev.com/api/node/${id}?_format=json`, {
        method: 'PATCH',
        headers: {
            'Authorization': getBasicAuthHeader(),
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Failed to update article');
    return await response.json();
};


// ****************deleteArticle***************
const deleteArticle = async(id, csrfToken, getBasicAuthHeader) => {
    const response = await fetch(`https://tamkeen-dev.com/api/node/${id}?_format=json`, {
        method: 'DELETE',
        headers: {
            'Authorization': getBasicAuthHeader(),
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
        },
    });

    if (!response.ok) throw new Error('Failed to delete article');
    return true;
};
// *****************************************
export {
    fetchUserBlogs,
    fetchTags,
    uploadGalleryImages,
    uploadSingleImage,
    createArticle,
    updateArticle,
    deleteArticle,
};