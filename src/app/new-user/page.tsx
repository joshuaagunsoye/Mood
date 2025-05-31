import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation"
import { prisma } from "../../../utils/db";

const createdNewUser = async () => {

    const user = await currentUser()
    console.log(user)
    if (!user) return null;

    const match = await prisma.user.findUnique({
        where:{
            clerkId: user.id as string,
        },
    })

    if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
        // name: user.fullName || null,
      },
    });
  }

    redirect('/journal')
}

const NewUser = async() => {
    await createdNewUser()
    return <div>...loading</div>
}

export default NewUser