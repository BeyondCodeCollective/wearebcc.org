import { redirect } from "next/navigation";
import { routes } from "@/v01/content/site";

/**
 * Impact is hidden for now (Mica, 2026-11-23): this address and the links that
 * pointed at it go to the impact report. The page itself is kept in
 * src/v01/pages/Impact.tsx for when it comes back.
 */
export default function Page() {
  redirect(routes.impactReport);
}
