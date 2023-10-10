import mongoose from 'mongoose';
import tokens from './tokens';

const connectMongo = async () => {
    try {
        const conn_creds = tokens.ITINERA_MONGODB_PUBLIC_CONN;
        const conn_string = conn_creds.STRING
                                      .replace('${USER_ID}', conn_creds.USER_ID)
                                      .replace('${USER_PASSWORD}', conn_creds.USER_PASSWORD)
                                      .replace('${DB_NAME}', conn_creds.DB_NAME);
        const { connection } = await mongoose.connect(conn_string);
        console.log('DEBUG: MongoDB connection state:', connection.readyState);

        if (connection.readyState === 1) {
            console.log('MongoDB connected successfully.');
            return true;
        } else {
            console.error('MongoDB connection state is not 1.');
            return false;
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Rethrow the error for further handling, if needed.
    }
};

export default connectMongo;
