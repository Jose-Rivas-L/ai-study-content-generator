import { USER_TABLE } from "@/configs/schema";
import { inngest } from "./client";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const CreateNewUser = inngest.createFunction(
    {id:'create-user'},
    {event:'user.create'},
    async ({event, step}) =>{
        const {user} = event.data;
        //Get event data
        const result = await step.run('Check user and create a new one if does not exist in db', async()=>{
            //check is user already exist
            const result = await db.select().from(USER_TABLE)
                .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress))
            
                //if not, then add to db
            if(result?.length == 0)
            {
                const userResponse = await db.insert(USER_TABLE).values({
                    userName: user?.fullName,
                    email: user?.primaryEmailAddress?.emailAddress
                }).returning({id: USER_TABLE.id})

                return userResponse
            }
            return result    
        })
        
        return 'Success';
    }

    //Step: send welcome email notification

    //Step: Send email notification after 3 days once user joined
)