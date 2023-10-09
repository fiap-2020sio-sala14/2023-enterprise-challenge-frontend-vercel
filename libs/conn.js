import mongoose from 'mongoose';
import { tokens } from "./tokens";

const connectMongo = async () => {
    try {
        const conn_creds = tokens.ITINERA_MONGODB_PUBLIC_CONN
        const conn_string = (
            conn_creds["STRING"].replace('${USER_ID}', conn_creds["USER_ID"])
                                .replace('${USER_PASSWORD}', conn_creds["USER_PASSWORD"])
                                .replace('${DB_NAME}', conn_creds["DB_NAME"])
        );
        const { connection } = await mongoose.connect(conn_string);

        if(connection.readyState == 1){
            return Promise.resolve(true)
        }
    } catch (error) {
        return Promise.reject(error)
    }
}

export default connectMongo;