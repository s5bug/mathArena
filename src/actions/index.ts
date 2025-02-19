import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
    // remove this when we add real actions!
    serverTime: defineAction({
        handler: async () => {
            let now = new Date()
            return now.toISOString()
        }
    })
}
