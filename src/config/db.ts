import mongoose from "mongoose";

export const connectToDatabase = async () : Promise < void > => {
        try {
            const mongodb_uri = process.env.MONGODB_URI;
            if(!mongodb_uri) {
                throw new Error("mongodb_uri are not available in .env file");
            }

            await mongoose.connect(mongodb_uri).then(() => console.log(`database connected successfully.`)
            )

            process.on("SIGINT", async () => {
               await mongoose.connection.close(); 
            })

            process.exit(0); 

        } catch (error) {
            throw new Error(`database connection failed: ${error}`);
            
        }
}


// export const disconnectToDatabase = async () : Promise < void > => {
//    try {
//        await mongoose.connection.close()

//    } catch (error) {

//    }
// }