async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("Content-Type");
        let data;

        /*
        if (contentType && contentType.includes("application/json")) {
            data = await response.json(); // Parse JSON data
        } else {
            data = await response.text(); // Treat as plain text if content type is not JSON
        }
        */
       const textContent = await response.text();
        if (textContent.includes("{") && textContent.includes("}")) {
            data = await response.json(); // Parse JSON data
        } else {
            data = await response.text(); // Treat as plain text if content type is not JSON
        }

        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const urls = {
    ITINERA_GOOGLE_CLIENT_CRED: "https://southamerica-east1-minecraft-server-339721.cloudfunctions.net/fiap-2020sio-3ano-itinera-ms-get-itinera-google-client-cred",
    ITINERA_MONGODB_PUBLIC_CONN: "https://southamerica-east1-minecraft-server-339721.cloudfunctions.net/fiap-2020sio-3ano-itinera-ms-get-itinera-mongodb-public-conn",
    ITINERA_NEXTAUTH_SECRET: "https://southamerica-east1-minecraft-server-339721.cloudfunctions.net/fiap-2020sio-3ano-itinera-ms-get-itinera-nextauth-secret",
    MAPBOX_PUBLIC_API_TOKEN: "https://southamerica-east1-minecraft-server-339721.cloudfunctions.net/fiap-2020sio-3ano-itinera-ms-get-mapbox-public-api-token",
};

const tokens = {};
for (const url in urls) {
    tokens[url] = async () => {
        return await fetchData(urls[url]);
    };
};

export { tokens };