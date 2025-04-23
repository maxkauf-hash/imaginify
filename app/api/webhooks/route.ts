import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  try {
    const evt = await verifyWebhook(req, {
      signingSecret: WEBHOOK_SECRET,
    });

    const { id } = evt.data;
    const eventType = evt.type;

    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );

    if (eventType === "user.created") {
      await prisma.users.create({
        data: {
          clerkId: evt.data.id,
          email: evt.data.email_addresses[0].email_address,
          username: `${evt.data.first_name} ${evt.data.last_name}`,
          photo: evt.data.image_url,
        },
      });
    }

    if (eventType === "user.updated") {
      await prisma.users.update({
        where: { clerkId: evt.data.id },
        data: {
          email: evt.data.email_addresses[0].email_address,
          username: `${evt.data.first_name} ${evt.data.last_name}`,
          photo: evt.data.image_url,
        },
      });
    }

    if (eventType === "user.deleted") {
      await prisma.users.delete({
        where: { clerkId: evt.data.id },
      });
    }

    return new NextResponse("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new NextResponse("Error verifying webhook", { status: 400 });
  }
}
