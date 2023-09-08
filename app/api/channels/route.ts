import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);
    
    const serverId = searchParams.get("serverId")

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    };

    if (!serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    };

    if (name === "lounge") {
      return new NextResponse("Name cannot be 'lounge'", { status: 400 });
    };

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR]
            }
          }
        }
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type,
          }
        }
      }
    })

    return NextResponse.json(server);
  } catch (err) {
    console.log("CHANNEL_POST", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}