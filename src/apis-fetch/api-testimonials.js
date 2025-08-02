export const getTestimonials = async() => {
    try {
        const res = await fetch('https://tamkeen-dev.com/api/testimonials', {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        return  [];  
    }
};