import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (identity === null) {
            throw new ConvexError("Not authenticated");
        }

        console.log(JSON.stringify(identity));

        const tasks = await ctx.db.query("tasks")
            .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
            .collect();
        return tasks
    },
});

export const create = mutation({
    args: {
        text: v.string(),
        isCompleted: v.boolean(),
    },
    handler: async (ctx, { text, isCompleted }) => {
        const identity = await ctx.auth.getUserIdentity();
        if (identity === null) {
            throw new ConvexError("Not authenticated");
        }

        const task = await ctx.db.insert("tasks", {
            text,
            isCompleted,
            userId: identity.subject,
        });
    },
});