import { getPayload } from "payload";
import config from "@/payload.config";

// Initializing Payload runs the seed hook configured in onInit.
const payload = await getPayload({ config });
await payload.destroy();
