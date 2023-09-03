import { Member, Profile, Server } from "@prisma/client"

export type serverWithMemberWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};