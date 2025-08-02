export async function fetchBlogs(headers = {}) {
    const response = await fetch('https://tamkeen-dev.com/api/blogs-api?items_per_page=50', {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            cache: 'no-store',
        },
    });

    if (!response.ok) {
        throw new Error(Error `${response.status }: ${response.statusText }`);
    }

    const data = await response.json();
    return data.rows  ||  [];
}

//tamkeen-dev.com/api/blogs-api?items_per_page=5&search=evolution&page=0&category=6&tag=3&sort_by=created_date&sort_order=DESC