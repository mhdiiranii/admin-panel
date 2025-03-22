'use server'
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function ChangeLg(lg :string) {
    (await cookies()).set('locale',lg)
    revalidatePath('/') 
}